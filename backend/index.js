const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.io
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ["http://localhost:5173", "http://localhost:3000", "https://resonant-torrone-89599e.netlify.app/", "http://localhost:8080", "http://127.0.0.1:5173", "http://127.0.0.1:8080"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ["http://localhost:5173", "https://resonant-torrone-89599e.netlify.app/", "http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:5173", "http://127.0.0.1:8080"],
  credentials: true
}));
app.use(express.json());

// In-memory storage (in production, use a database)
let polls = [];
let students = [];
let chatMessages = [];
let currentPoll = null;

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle role selection
  socket.on('select-role', (data) => {
    socket.role = data.role;
    socket.join(data.role);

    if (data.role === 'teacher') {
      socket.emit('teacher-connected', { polls, students, currentPoll, chatMessages });
    } else if (data.role === 'student') {
      socket.emit('student-connected', { currentPoll, students });
    }
  });

  // Handle student name entry
  socket.on('student-name', (data) => {
    const { name } = data;

    // Check if name already exists
    const existingStudent = students.find(s => s.name === name);
    if (existingStudent) {
      socket.emit('name-exists', { message: 'Name already taken' });
      return;
    }

    const student = {
      id: socket.id,
      name: name,
      hasAnswered: false,
      answer: null,
      joinedAt: new Date()
    };

    students.push(student);
    socket.studentName = name;
    socket.studentId = student.id;

    // Notify all clients about new student
    io.emit('student-joined', student);

    // Send current poll to new student if exists
    if (currentPoll && currentPoll.isActive) {
      socket.emit('poll-started', currentPoll);
    }
  });

  // Handle poll creation
  socket.on('create-poll', (data) => {
    if (socket.role !== 'teacher') return;

    const { question, options, timeLimit } = data;

    // End current poll if exists
    if (currentPoll && currentPoll.isActive) {
      currentPoll.isActive = false;
      polls.push({ ...currentPoll });
    }

    // Create new poll
    const newPoll = {
      id: uuidv4(),
      question,
      options: options.map((opt, index) => ({
        id: `option-${index}`,
        text: opt,
        votes: 0
      })),
      timeLimit,
      isActive: true,
      createdAt: new Date()
    };

    currentPoll = newPoll;

    // Reset student answers
    students = students.map(student => ({
      ...student,
      hasAnswered: false,
      answer: null
    }));

    // Broadcast new poll to all clients
    console.log('Broadcasting new poll to all clients:', newPoll.id);
    io.emit('poll-started', newPoll);

    // Also broadcast updated student list to reset their states
    console.log('Broadcasting updated students list:', students.length, 'students');
    io.emit('students-updated', students);

    // Start timer
    setTimeout(() => {
      if (currentPoll && currentPoll.id === newPoll.id && currentPoll.isActive) {
        endPoll();
      }
    }, timeLimit * 1000);
  });

  // Handle answer submission
  socket.on('submit-answer', (data) => {
    if (socket.role !== 'student' || !currentPoll || !currentPoll.isActive) return;

    const { optionId } = data;
    const student = students.find(s => s.id === socket.id);

    if (!student || student.hasAnswered) return;

    // Update student answer
    student.hasAnswered = true;
    student.answer = optionId;

    // Update poll votes
    const option = currentPoll.options.find(opt => opt.id === optionId);
    if (option) {
      option.votes += 1;
    }

    // Broadcast updated poll results
    io.emit('poll-updated', currentPoll);
    io.emit('student-answered', { studentId: socket.id, studentName: student.name });

    // Check if all students have answered
    const allAnswered = students.every(s => s.hasAnswered);
    if (allAnswered && students.length > 0) {
      setTimeout(() => {
        if (currentPoll && currentPoll.id === currentPoll.id && currentPoll.isActive) {
          endPoll();
        }
      }, 2000); // Wait 2 seconds before ending
    }
  });

  // Handle poll ending
  socket.on('end-poll', () => {
    if (socket.role !== 'teacher') return;
    endPoll();
  });

  // Handle student removal
  socket.on('remove-student', (data) => {
    if (socket.role !== 'teacher') return;

    const { studentId } = data;
    const student = students.find(s => s.id === studentId);

    if (student) {
      students = students.filter(s => s.id !== studentId);

      // If student had answered, update poll votes
      if (student.hasAnswered && currentPoll && currentPoll.isActive) {
        const option = currentPoll.options.find(opt => opt.id === student.answer);
        if (option && option.votes > 0) {
          option.votes -= 1;
        }
      }

      // Notify the removed student
      io.to(studentId).emit('kicked-out');

      // Broadcast updated student list and poll
      io.emit('student-removed', { studentId });
      if (currentPoll && currentPoll.isActive) {
        io.emit('poll-updated', currentPoll);
      }
    }
  });

  // Handle chat messages
  socket.on('chat-message', (data) => {
    const { message } = data;
    const sender = socket.role === 'teacher' ? 'Teacher' : socket.studentName;

    if (!sender) return;

    const chatMessage = {
      id: uuidv4(),
      sender,
      message,
      timestamp: new Date(),
      isTeacher: socket.role === 'teacher'
    };

    chatMessages.push(chatMessage);
    io.emit('chat-message', chatMessage);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    if (socket.role === 'student' && socket.studentId) {
      const student = students.find(s => s.id === socket.studentId);

      if (student) {
        // If student had answered, update poll votes
        if (student.hasAnswered && currentPoll && currentPoll.isActive) {
          const option = currentPoll.options.find(opt => opt.id === student.answer);
          if (option && option.votes > 0) {
            option.votes -= 1;
          }
        }

        students = students.filter(s => s.id !== socket.studentId);
        io.emit('student-left', { studentId: socket.studentId, studentName: student.name });

        if (currentPoll && currentPoll.isActive) {
          io.emit('poll-updated', currentPoll);
        }
      }
    }
  });
});

// Helper function to end current poll
function endPoll() {
  if (currentPoll && currentPoll.isActive) {
    currentPoll.isActive = false;
    polls.push({ ...currentPoll });

    // Broadcast poll ended
    io.emit('poll-ended', currentPoll);

    // Reset current poll
    currentPoll = null;
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Live Polling System Backend' });
});

app.get('/api/polls', (req, res) => {
  res.json({ polls, currentPoll, students });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io server ready for connections`);
});

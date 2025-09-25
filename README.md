# Live Polling System

A real-time polling system with Teacher and Student personas, built with React, Express.js, and Socket.io.

## Features

### Teacher Features
- Create new polls with customizable time limits (30-120 seconds)
- View live polling results in real-time
- Ask new questions only when no question is active or all students have answered
- Remove students from the session
- View poll history
- Chat with students

### Student Features
- Enter unique name on first visit
- Submit answers to active polls
- View live polling results after submission
- 60-second time limit per question (configurable by teacher)
- Chat with teacher and other students

### Technical Features
- Real-time communication using Socket.io
- Responsive UI with modern design
- Automatic poll ending when time expires or all students answer
- Live vote counting and percentage display
- Chat system for interaction
- Poll history tracking

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Socket.io Client
- **Backend**: Express.js, Socket.io, Node.js
- **UI Components**: Radix UI, Lucide React Icons
- **Deployment**: Docker, Docker Compose, Nginx

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (for deployment)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snap-vote-live
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm run dev
   ```
   The backend will run on http://localhost:3001

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173

6. **Open your browser**
   - Navigate to http://localhost:5173
   - Select "I'm a Teacher" to create polls
   - Open another tab and select "I'm a Student" to participate

## Deployment

### Using Docker Compose (Recommended)

1. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:3001

### Manual Deployment

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the backend**
   ```bash
   cd backend
   npm start
   ```

3. **Serve the frontend**
   Use any static file server (nginx, apache, etc.) to serve the `frontend/dist` directory.

## Usage Guide

### For Teachers

1. **Start a Session**
   - Select "I'm a Teacher" on the home page
   - You'll see the teacher dashboard

2. **Create a Poll**
   - Enter your question (max 100 characters)
   - Add 2-6 answer options
   - Set time limit (30-120 seconds)
   - Click "Start Poll"

3. **Monitor Results**
   - View live results as students answer
   - See participant count and who has answered
   - Poll automatically ends when time expires or all students answer

4. **Manage Students**
   - View all connected students
   - Remove students if needed using "Kick out" button
   - Chat with students using the chat button

5. **View History**
   - Click "View Poll History" to see past polls
   - Review results and participation rates

### For Students

1. **Join a Session**
   - Select "I'm a Student" on the home page
   - Enter your name (must be unique)
   - Wait for teacher to start a poll

2. **Answer Questions**
   - Select your answer from the options
   - Click "Submit" to submit your response
   - View live results after submission

3. **Interact**
   - Use the chat feature to communicate with teacher
   - View real-time poll results

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/polls` - Get current polls and students

## Socket.io Events

### Client to Server
- `select-role` - Select teacher or student role
- `student-name` - Submit student name
- `create-poll` - Create a new poll
- `submit-answer` - Submit poll answer
- `end-poll` - End current poll
- `remove-student` - Remove a student
- `chat-message` - Send chat message

### Server to Client
- `teacher-connected` - Teacher connection established
- `student-connected` - Student connection established
- `poll-started` - New poll started
- `poll-updated` - Poll results updated
- `poll-ended` - Poll ended
- `student-joined` - New student joined
- `student-left` - Student disconnected
- `student-removed` - Student was removed
- `student-answered` - Student submitted answer
- `chat-message` - New chat message
- `kicked-out` - Student was kicked out
- `name-exists` - Student name already taken

## Configuration

### Environment Variables

**Backend**
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

**Frontend**
- `VITE_API_URL` - Backend API URL (default: http://localhost:3001)

### Customization

- **Colors**: Modify CSS variables in `frontend/src/index.css`
- **Time Limits**: Adjust in `frontend/src/components/TeacherDashboard.tsx`
- **Poll Options**: Change min/max options in the teacher dashboard
- **UI Components**: All components use Radix UI and can be customized

## Troubleshooting

### Common Issues

1. **Socket.io Connection Failed**
   - Ensure backend is running on port 3001
   - Check CORS settings in backend
   - Verify firewall settings

2. **Student Name Already Taken**
   - Each student name must be unique per session
   - Try a different name or refresh the page

3. **Poll Not Starting**
   - Ensure all poll options are filled
   - Check that question is not empty
   - Verify time limit is set

4. **Real-time Updates Not Working**
   - Check browser console for errors
   - Verify Socket.io connection status
   - Ensure both frontend and backend are running

### Development Tips

- Use browser developer tools to monitor Socket.io events
- Check network tab for API calls
- Use multiple browser tabs to test teacher/student interaction
- Monitor backend console for connection logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the console logs
3. Create an issue with detailed description
4. Include browser and Node.js versions

import express, { Request, Response, NextFunction} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { checkAuth } from './middleware'
dotenv.config()

// Create server
const app = express()

// Middleware
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true
}))
app.use(express.json())

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to the server')
})
app.get('/api/test', (req: Request, res: Response) => {
  res.cookie('authToken', true, {
    httpOnly: true,
    maxAge: 3 * 60 * 1000,
    signed: true
  })
  res.status(200).json({
    connected: true
  })
})
app.get('/api/protected', checkAuth, (req: Request, res: Response) => {
  res.json({ username: 'john' })
})

// Start server
const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
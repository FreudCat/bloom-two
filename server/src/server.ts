import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'I\'m alive' })
})

export default app
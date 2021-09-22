const express = require('express')
let cors = require('cors')

const app = express()

const Port = process.env.PORT || 4500
let userRoute = require('./Components/Users/Users.route')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(userRoute)

app.use('/', (req, res, next) => {
  res.send('landing check!!!')
})

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// catch server errors and respond with 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// server
app.listen(Port, () => {
  console.log(`running on port:${Port}`)
})

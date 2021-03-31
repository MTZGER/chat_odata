const express = require('express')
const path = require("path")
const firebase = require("./firebase")
const app = express()

const port = 3000

const GET_CHAT_BY_ID = "GET_CHAT_BY_ID"
const GET_CHATS_BY_USER = "GET_CHATS_BY_USER"

const authUser = firebase().authUser

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

app.post('/', async (req, res) => {
  if (req.body.type == GET_CHATS_BY_USER) {
    const chats = firebase().chats.filter(chat => chat.users.includes(authUser.username))
    res.send(chats)
  } else if (req.body.type == GET_CHAT_BY_ID) {
    const chat = firebase().chats.filter(chat => chat.id === req.body.payload)
    res.send(chat)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

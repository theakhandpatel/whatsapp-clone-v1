import React, { useState, useEffect } from "react"
import { Avatar } from "@material-ui/core"
import "./Chat.css"
import { useParams } from "react-router-dom"
import db from "./firebase"
import firebase from "firebase"
import { useStateValue } from "./StateProvider"

function Chat() {
  const [input, setInput] = useState("")
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState("")
  const [messages, setMessages] = useState([])
  const [{ user }] = useStateValue()

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name)
        })

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()))
        })
    }
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput("")
  }

  return roomId ? (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
        <div className="chat_headerInfo">
          <h3 className="chat-room-name">{roomName}</h3>
          <p className="chat-room-last-seen">
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight"></div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestemp">
              {new Date(message.timestamp?.toDate()).getUTCHours()}:
              {new Date(message.timestamp?.toDate()).getUTCMinutes()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            {" "}
            Send a Message
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="chat-none">
      <h2>Join a room</h2>
    </div>
  )
}

export default Chat

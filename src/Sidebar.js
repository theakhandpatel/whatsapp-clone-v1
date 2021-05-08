import React, { useState, useEffect } from "react"
import "./Sidebar.css"
import { Avatar } from "@material-ui/core"

import SidebarChat from "./SidebarChat"
import db from "./firebase"
import { useStateValue } from "./StateProvider"

function Sidebar(props) {
  const [rooms, setRooms] = useState([])
  const [{ user }] = useStateValue()

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <h3>{user.displayName}</h3>
        <div className="sidebar_headerRight"></div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar

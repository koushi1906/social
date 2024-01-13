import { Avatar, Grid, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {uploadToCloudinary} from "../../utils/uploadCloudinary"
import SockJS from "sockjs-client";
import Stom from 'stompjs'


const Message = () => {
  const dispatch = useDispatch();
  const {message, auth} = useSelector(store => store);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages])

  useState(() => {
    const sock = new SockJS("http://localhost:5454/ws");
    const stomp = Stom.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onErr)
  }, [])

  const onConnect = () => {
    console.log("connected");
  }

  const onErr = (err) => {
    console.log('error', err);
  }

  const onMessageRecieved = (payload) => {
    const recievedMessage = JSON.parse(payload.body)
    console.log('message recieved', recievedMessage)
    // setMessages([...messages, recievedMessage])
  }

  const sendMessageToServer = (newMessage) => {
    if(stompClient && newMessage){
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(message))
      JSON.stringify(newMessage)
    }
  }
  useEffect(() => {
    if(stompClient && auth.user && currentChat){
      const subscription = stompClient.subscribe(`/user/${currentChat.id}/private`, onMessageRecieved)
    }
  })

  useEffect(() => {
    dispatch(getAllChats())
  }, [])
  const handleSelectImage = async(e) => {
    setLoading(true)
    console.log("handle select image");
    const imgUrl =  await uploadToCloudinary(e.target.files[0], "image")
    selectedImage(imgUrl)
    setLoading(false)
  }

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content:value,
      image:selectedImage
    };
    dispatch(createMessage({message, sendMessageToServer}))
  }

  useEffect(() => {
    setMessages([...messages, message.message])
  }, [message.message])
  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>

              <div className="h-[83vh]">
                <div className=""><SearchUser /></div>

                <div className="h-full space-y-4 mt-5 border-r-2 overflow-y-scroll hideScrollbar">
                  {
                    message.chats && message.chats.map((item) => {
                      return <div className="" onClick={() => {
                        setCurrentChat(item)
                        setMessages(item.messages)
                      }}>
                        <UserChatCard chat={item}/>
                      </div>
                    })
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={9} className="h-full">
          {currentChat ? <div className="">
            <div className="flex justify-between items-center border-1 p-5">
              <div className="flex items-center space-x-3">
                <Avatar src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600" />
                <p>{auth.user.id === currentChat.users[0].id?currentChat.users[1].firstName + " " + currentChat.users[1].lastName:currentChat.users[0].firstName + " " + currentChat.users[0].lastName}</p>
              </div>

              <div className="flex space-x-3">
                <IconButton>
                  <AddIcCallIcon />
                </IconButton>
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </div>
            </div>
            <div ref={chatContainerRef} className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
              {messages.map((item) => <ChatMessage message={item}/>)}
            </div>
            <div className="sticky bottom-0 border-1">
              {selectedImage && <img src={selectedImage} alt="" className="w-[5rem] h-[5rem] object-cover px-2"/>}
            <div className="py-5 flex items-center justify-center space-x-5">
              <input
                onKeyPress={(e) => {
                  if(e.key === 'Enter' && e.target.value){
                    handleCreateMessage(e.target.value)
                    setSelectedImage("")
                  } 
                }}
                type="text"
                className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                placeholder="Type message..."
              />
              <div className="">
                <input type="file" accept="image/*" onChange={handleSelectImage} className="hidden" id="image-input"/>
                <label htmlFor="image-input">
                  <AddPhotoAlternateIcon/>
                </label>
              </div>
            </div>
          </div>
          </div> : <div className="h-full space-y-5 flex flex-col justify-center items-center">
            <ChatBubbleOutlineIcon sx={{fontSize:"15rem"}} />
                  <p className="text-xl font-semibold">No Chat Selected</p>
            </div>}

          
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;

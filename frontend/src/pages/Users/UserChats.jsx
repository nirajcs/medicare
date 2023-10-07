import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usersApi } from '../../axiosApi/axiosInstance'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000';
var socket,selectedChatCompare;

const UserChats = () => {
    const { userInfo } = useSelector((state) => state.auth);
    
    const [rooms, setRooms] = useState([]);
    const [chatId, setChatId] = useState('');
    const [chats,setChats] = useState([]);
    const [doctor,setDoctor] = useState('');
    const [content,setContent] = useState('');
    const [messageSent,setMessageSent] = useState(false)
    const [socketConnected,setSocketConnected] = useState(false)

    const { chatid } = useParams();

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup",userInfo)
        socket.on('connection',()=>setSocketConnected(true))
    },[])


    const sendHandler = async()=>{
        if(content===''){
            toast.error("Message cannot be empty")
            return
        }
        try {
            let res = await usersApi.post(`/sendchat/${chatId}/${userInfo._id}/User`,{content})
            if(res){
                console.log(res.data)
                setContent('')
                setMessageSent(true)
                socket.emit('new message',res.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (chatid !== 'allchats') {
            setChatId(chatid);
        }
    }, [chatid]);

    useEffect(() => {
        let fetchMessages = async () => {
            let res = await usersApi.get(`/get-room-messages/${chatId}`);
            if (res) {
                setChats(res.data)
                setMessageSent(false)
                socket.emit("join chat",chatId)
            }
        };
        fetchMessages();
        selectedChatCompare = chats;
    }, [chatId,messageSent]);

    useEffect(() => {
        socket.on('message received',(newMessageReceived)=>{
            if(!selectedChatCompare || chatId!==newMessageReceived.room._id){

            }else{
                setChats([...chats,newMessageReceived])
            }
        })
    })
    

    useEffect(() => {
        if (userInfo._id) {
            let fetchRooms = async () => {
                let res = await usersApi.get(`/getrooms/${userInfo._id}`);
                setRooms(res.data);
            };
            fetchRooms();
        }
    }, [userInfo]);

  return (
    <section className="container h-screen flex-col h-5/6">
        <div className='flex h-4/5 w-full bg-blue-200 border-r-2 rounded-lg'>
            <div className='w-1/2 p-4 overflow-y-auto'> 
                {
                    rooms.length > 0 ?(
                        rooms.map((chat,index)=>(
                            <div key={index} onClick={()=>{setChatId(chat._id);setDoctor(chat.doctor.name)}} className='flex justify-between my-2 mx-5 items-center bg-blue-600 p-3 rounded-lg'>
                                <h3 className='font-bold text-white'>{chat.doctor.name}</h3>
                                <span className="h-fit inline-flex items-center rounded-md bg-blue-50 px-2 py-2 text-xs font-bold text-blue-600 ring-1 ring-inset ring-blue-600/10">
                                    {chat.doctor.specialization}
                                </span>
                            </div>
                        ))
                    ):(
                        <div className='flex h-full justify-center items-center'>
                            <p className='text-blue-600 font-bold'>No Chats</p>
                        </div>
                    )
                }
            </div>
            <div className='w-1/2 h-full border-l-2 p-3'>
                {
                    chatId ? (  
                        <div className='h-full w-full'>
                            <div className='bg-blue-600 w-full p-4 my-3 rounded-lg'><h3 className='font-medium text-white'>{doctor}</h3></div>
                            <div className='bg-white h-4/6 w-full overflow-y-auto p-5'>
                                {chats && chats.length > 0 ? (
                                    chats.map((chat, index) => (
                                        chat.senderType === 'User' ? (
                                            <div key={index} className='w-full flex my-2 justify-end'>
                                                <div className='bg-blue-600 max-w-1/2 w-fit text-white p-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg'>
                                                    {chat.content}
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={index} className='w-full my-2'>
                                                <div className='bg-blue-200 max-w-1/2 w-fit p-2 rounded-tl-lg rounded-tr-lg rounded-br-lg'>
                                                    {chat.content}
                                                </div>
                                            </div>
                                        )
                                    ))
                                ) : (
                                    <div className='w-full h-full flex items-center justify-center'>
                                        No Chats
                                    </div>
                                )}
                            </div>
                            <div className='flex my-4'>
                                <div className='w-11/12'>
                                    <input value={content} onChange={(e)=>setContent(e.target.value)} className='h-full w-full p-3' type="text" />
                                </div>
                                <div className='w-1/12'>
                                    <button type="button" onClick={sendHandler} className="h-full w-full text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800">Send</button>
                                </div>
                            </div>
                        </div>                      
                    ):null
                }
            </div>
        </div>
    </section>
  )
}

export default UserChats
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { doctorApi } from '../../axiosApi/axiosInstance';
import { toast } from 'react-toastify'

import io from 'socket.io-client'

const ENDPOINT = 'http://medicarez.online';
var socket,selectedChatCompare;

const DoctorChat = () => {
    const { doctorInfo } = useSelector((state) => state.docAuth);
    
    const [rooms, setRooms] = useState([]);
    const [chatId, setChatId] = useState('');
    const [chats,setChats] = useState([]);
    const [patient,setPatient] = useState('');
    const [content,setContent] = useState('');
    const [messageSent,setMessageSent] = useState(false)
    const [socketConnected,setSocketConnected] = useState(false)

    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup",doctorInfo)
        socket.on('connection',()=>setSocketConnected(true))
    },[])

    const sendHandler = async()=>{
        if(content===''){
            toast.error("Message cannot be empty")
            return
        }
        try {
            let res = await doctorApi.post(`/sendchat/${chatId}/${doctorInfo._id}/Doctor`,{content})
            if(res){
                setContent('')
                setMessageSent(true)
                socket.emit('new message',res.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        let fetchMessages = async () => {
            let res = await doctorApi.get(`/get-room-messages/${chatId}`);
            if (res) {
                console.log(res.data);
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
        if (doctorInfo._id) {
            let fetchRooms = async () => {
                let res = await doctorApi.get(`/get-doctor-rooms/${doctorInfo._id}`);
                setRooms(res.data);
            };
            fetchRooms();
        }
    }, [doctorInfo]);

  return (
    <section className="container h-screen flex-col h-5/6">
        <div className='flex h-4/5 w-full bg-blue-200 border-r-2 rounded-lg'>
            <div className='w-1/2 p-5 overflow-y-auto'>
                {
                    rooms.length > 0 ?(
                        rooms.map((chat,index)=>(
                            <div key={index} onClick={()=>{setChatId(chat._id);setPatient(chat.user.name)}} className='flex justify-between my-2 items-center bg-blue-600 p-3 rounded-lg'>
                                <h3 className='font-bold text-white'>{chat.user.name}</h3>
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
                        <div className='h-full'>
                            <div className='bg-blue-600 w-full p-4 my-3 rounded-lg'><h3 className='font-medium text-white'>{patient}</h3></div>
                            <div className='bg-white h-4/6 w-full overflow-y-auto p-5'>
                                {chats && chats.length > 0 ? (
                                    chats.map((chat, index) => (
                                        chat.senderType === 'Doctor' ? (
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

export default DoctorChat
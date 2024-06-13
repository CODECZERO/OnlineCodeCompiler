import React, { useState, useId, useEffect } from 'react'
import OutputCode from './output';

import ControllerCode from '../codeEditore/controller';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../store/data.store';

function HomePage() {
    const [loading, setLoding] = useState(useSelector((state) => state.Data.status));
    const disp = useDispatch();
    const id = useId();

    const [socket, setSocket] = useState(null);
    const socketS = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    useEffect(() => {
        socketS.onopen = () => {
            console.log("connect");
            setSocket(socketS);
        }
        socketS.onmessage=(message)=>{
            disp(addData({UserData:message.data}));
        }
    }, [])

    const FormHandle = (event) => {
        event.preventDefault();
        const value = event.target[1].value;
        const ConvertToString=JSON.stringify({ code:value, userID:id,language:"python" });
        console.log(ConvertToString);
        socket.send(ConvertToString);

    }


    if (!socket) {
        return (
            <>
                Loading....
            </>
        )
    }
    else {
        return (
            <div>

                <div className='flex flex-wrap flex-row'>
                    <div className=' ml-10 mb-10'>
                        <form onSubmit={FormHandle}>
                            <button className='bg-cyan-500 mb-2 ml-10' onClick={() => { setLoding(false) }}>Submit</button>
                            <ControllerCode />
                        </form>
                    </div>
                    {
                        !loading ? (<div className='  bg-slate-800 w-[900px] h-[800px] text-black mt-[50px]'>
                            <OutputCode />
                        </div>) :
                            (<div className=' bg-slate-800 w-[900px] h-[800px] mt-[50px]'>
                                <div className=' text-lime-600'>
                                    <div className='w-10 h-10 pl-12 pt-12'>
                                        Output
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        )
    }
}

export default HomePage
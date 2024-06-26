import React, { useState, useId } from 'react';
import OutputCode from './output';
import ControllerCode from '../codeEditore/controller';
import { useDispatch, useSelector } from 'react-redux';
import { addData, addError } from '../store/data.store';
import useWebSocket from './useWebsocket';
import { nanoid } from '@reduxjs/toolkit';

function HomePage() {
    const dispatch = useDispatch();
    const [loading, setLoding] = useState(useSelector((state) => state.Data.status));
    const id = nanoid(8);
    const lang = useSelector((state) => state.Data.language);

    setTimeout(() => { return }, 2000);
    const socket = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL);

    const FormHandle = (event) => {
        event.preventDefault();
        if (!lang) {
            dispatch(addError({ error: "Please Select Language" }));
        } else {
            const value = event.target[1].value;
            const ConvertToString = JSON.stringify({ code: value, userID: id, language: lang });
            socket.send(ConvertToString);
        }
    };

    if (!socket) {
        return <div className='h-screen  w-screen'><div className='flex justify-center items-center bg-white h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
        </div></div>;
    }

    return (
        <div>
            <div className='bg-slate-100 text-slate-950 w-44 ml-56'>{`Current Language: ${lang || "None"}`}</div>
            <div className='flex flex-wrap flex-row'>
                <div className='ml-10'>
                    <form onSubmit={FormHandle}>
                        <button className='bg-cyan-500 mb-2 ml-10' onClick={() => { setLoding(false) }}>Submit</button>
                        <ControllerCode />
                    </form>
                </div>
                <div className={`bg-slate-800 w-[900px] h-[800px] mt-[50px] ${loading ? 'text-lime-600' : 'text-black'}`}>
                    {loading ? (
                        <div className='w-10 h-10 pl-12 pt-12'>Output</div>
                    ) : (
                        <OutputCode />
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;

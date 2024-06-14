import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScren';
import { useSelector } from 'react-redux';

function OutputCode() {
    const [data, setData] = useState(false);
    const userData = useSelector((state) => state.Data.UserData);
    const lang=useSelector((state)=>{state.Data.language});
    let datafx="";
    useEffect(() => {
        setData(datafx);
        if(!userData){
            setData(null);
        }
    })

    const getData=()=>{
        datafx= useSelector((state) => state.Data.UserData);
        
    }
    return (
        <>
            <div className=' bg-slate-800 w-[800px] h-[800px]'>
                <div className='text-black'>
                    {getData()}
                    {  
                        !data ? (
                            <LoadingScreen/>
                        ) : (
                            <div className='text-lime-600 pl-12 pt-12'>
                                {JSON.parse(data)}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default OutputCode;

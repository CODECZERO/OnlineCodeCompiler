import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
function OutputCode(props) {
    const [data, setData] = useState("");
    const Usercode=useSelector((state)=>state.Data.UserData);
    useEffect(()=>{
        if(Usercode){
            
        }
        else{
            
        }
    })
    return (
        <>
            <div className=' bg-slate-300 w-[800px] h-[800px]'>
                <div className='text-black '>
                    {
                        !data ? (
                            <div>
                                output
                            </div>
                        ) : (
                            <div>
                                {props.data}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default OutputCode
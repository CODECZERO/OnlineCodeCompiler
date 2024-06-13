import React, { useState,useId } from 'react'
import OutputCode from './output';
import LoadingScren from './LoadingScren';
import ControllerCode from '../codeEditore/controller';
import {useDispatch,useSelector} from 'react-redux';
import { addData } from '../store/data.store';

function HomePage() {
    const [loading, setLoding] = useState(useSelector((state)=>state.Data.status));
    const disp=useDispatch();
    const id=useId();
    const FormHandle = (event) => {
        event.preventDefault()
        const value=event.target[1].value;
        disp(addData({value,id}));
    }
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
                    !loading ? (<div className=' bg-slate-300 w-[900px] h-[800px] mt-[50px]'>
                        <div className='flex items-center justify-center'>
                            <div className='w-10 h-10'>
                                <LoadingScren />
                            </div>
                        </div>
                    </div>) :
                        (<div className=' bg-slate-300 w-[900px] h-[800px] text-black mt-[50px]'>
                            <OutputCode />
                        </div>)
                }
            </div>
        </div>
    )
}

export default HomePage
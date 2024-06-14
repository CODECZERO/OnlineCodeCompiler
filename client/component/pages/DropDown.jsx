import React from 'react'
import { useSelector,useDispatch} from 'react-redux';
import { removeError } from '../store/data.store';

function DropDown() {
    const disp=useDispatch();
    const error= useSelector((state) => state.Data.error);
    const removeErrors = (e) => {
        e.preventDefault();
        disp(removeError());
      };
    return error ? (
        <>
                <div className="max-w-sm mx-auto mt-8 mb-0 p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-indigo-500 hover:text-white">
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={removeErrors}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold mb-2">Select language</h2>
                    <p className="text-gray-700 hover:text-white">
                        {error}
                    </p>
                </div>
        </>
    )
        : (null)
}

export default DropDown
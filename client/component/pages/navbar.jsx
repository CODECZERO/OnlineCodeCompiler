import React from 'react';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addlanguage } from '../store/data.store';
import pythonIcon from '../../src/assets/images.jpeg'; 
import javascriptIcon from '../../src/assets/js.png'; 
import cIcon from '../../src/assets/c.png'; 
import cppIcon from '../../src/assets/cpp.png';


function Navbar() {
  const dispatch = useDispatch();
  const sock = useSelector((state) => state.Data.sock);

  const updateData = (language) => {
    dispatch(addlanguage({ language }));
  };

  return (
    sock ? (
      <div className='flex items-center justify-center'>
        <Button type='button' className='bg-white h-12 w-auto ml-6 text-center mt-3 mb-3' value='python' onClick={() => updateData('python')} image={pythonIcon} />
        <Button type='button' className='bg-white h-12 w-auto ml-10 text-center mt-3 mb-3' value='node' onClick={() => updateData('node')}  image={javascriptIcon} />
        <Button type='button' className='bg-white h-12 w-auto ml-10 text-center mt-3 mb-3' value='c' onClick={() => updateData('c')} image={cIcon} />
        <Button type='button' className='bg-white h-12 w-auto ml-10 text-center mt-3 mb-3' value='cpp' onClick={() => updateData('cpp')}  image={cppIcon} />
      </div>
    ) : null
  );
}

export default Navbar;


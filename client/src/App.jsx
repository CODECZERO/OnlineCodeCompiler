import React from 'react';
import Navbar from '../component/pages/navbar';
import HomePage from '../component/pages/HomePage';

function App() {
  return(
    <>
      <div>
        <Navbar/>
        <div>
          <HomePage/>
        </div>
      </div>
    </>
  )
}

export default App
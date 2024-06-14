import React from 'react';
import Navbar from '../component/pages/navbar';
import HomePage from '../component/pages/HomePage';
import DropDown from '../component/pages/DropDown';

function App() {
    return (
      <>
        <div>
          <Navbar />
          <div>
            <div>
              <DropDown/>
            </div>
            <HomePage />
          </div>
        </div>
      </>
    )
  }

export default App
import React from 'react';
import '../../styles/MainContent.css';
import DisplayStats from './DisplayStats';
import DisplayData from './DisplayData';

function MainContent() {
  return (
    <div className="main-container">
        <DisplayStats />
        <DisplayData/>
    </div>
  )
}

export default MainContent;
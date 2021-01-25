import React, { useState } from 'react';
import logo from '../assets/logo.png';

import { FiSave } from "react-icons/fi";
import { FiCornerUpLeft } from "react-icons/fi";
import { FiTool } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";

function Toolbar() {
  return (
    <div>
      <header>
        <h2><img className='logo' src={logo} /> SAMPLETON</h2>
        <button><FiPlusSquare /></button>
        <button><FiSave /></button>
        <button><FiTool /></button>
        <button><FiHelpCircle /></button>
        <button disabled><FiCornerUpLeft /></button>
      </header>
    </div>
  );
}

export default Toolbar;
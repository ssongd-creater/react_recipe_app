import React, { useState } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(true);
  const toggler = () => {
    setToggle(!toggle);
    //toggler가 실행이되면 setToggle이 실행이되면서 toggle이 false로 바뀜 false대신 toggle을 넣으면 트루가 !로인해 반대가 실행됨
    console.log(toggle); //console에 true false가 실행됨
  };
  return (
    <header>
      <div className='center'>
        <h2 className='logo'>CIY</h2>
        <span className='menu' onClick={toggler}>
          {toggle ? <i className='fa fa-bars'></i> : <i className='fa fa-times'></i>}
          {/* toggle ? (true조건):(false조건) */}
        </span>
      </div>
    </header>
  );
};

export default Header;

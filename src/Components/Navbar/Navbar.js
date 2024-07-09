/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from "react";
import logo from "../../assets/logo.png";
import { BsFillAwardFill } from "react-icons/bs";
import { MdLightbulbOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import ConnectToPhantom from "./ConnectToPhantom";
import { WalletConnect } from "./wallet";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { initialize } from "../../contexts/helpers";

const Navbar = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const onInit = async () => {
    await initialize(wallet, connection, false);
  }

  return (
    <div className="bg-color navigation header-box-shadow"> 
      <div className="nav-header">
        <a href='/' className='logo-link'>
          <img src={logo} alt="site-logo"></img>
        </a>
        {/* <button onClick={onInit}>
          Init
        </button> */}
        <WalletConnect />
      </div>
    </div>
    // <div className="navbar">
    //   <div className="container nav">
    //     <div className="logo">
    //       <img src={logo} alt="" />
    //       <div className="menu">
    //         <li>
    //         <p><span style={{fontSize: "10px"}}> Developed By</span> <a href="https://2xsolution.com" target={"_blank"} style={{color: "#551a8b"}}>2X Solution</a></p>
    //         </li>
    //         {/* <li>
    //           <a href="#">Boxes</a>
    //         </li> */}
    //         {/* <li><a href="#"><BsFillAwardFill/>Award winning platform</a></li> */}
    //       </div>
    //     </div>

    //     <div className="connect_metamsk11">
    //       {/* <div className="light"><MdLightbulbOutline /></div> */}
    //       <WalletConnect />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;

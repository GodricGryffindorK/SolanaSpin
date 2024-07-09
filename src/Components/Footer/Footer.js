
// import { useWallet } from "@solana/wallet-adapter-react";
import { spinWheel } from "../../contexts/helpers";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import Twitter from '../../assets/twitter.png';
import Discord from '../../assets/discord.png';

const Footer = () => {

  return (
    <>
    <div className="footer-container bg-[#D88331CC] py-6 mt-16 text-white rounded-tl-[18px] rounded-tr-[18px] header-box-shadow flex items-center justify-center">
    <div className="footer-socials flex flex-row gap-[0.75rem]">
        <a href="/" title="No discord MFERS"><img src={Discord} alt="l"></img></a>
        <a 
            className="icons"
            href="https://twitter.com/fronkspin"
            target={"_blank"} rel="noreferrer"> <img src={Twitter} alt="l"></img> </a>
      </div>
      <div className="footer-socials flex flex-row gap-[0.75rem]">
       <p>*This game is in beta phase please play at your own risk with contract</p>
      </div>
    </div>
    </>
    // <div className="container footer">
    //   <hr></hr>
    //   <div className="box-container">
    //     <img src={logo} alt="" className="" width={250}/>
    //   </div>
    //   <div className="detail">
    //    <div><a href="https://2xsolution.com" target={"_blank"} style={{color: "white"}}><h3>Join 2X Solution Now</h3></a></div>
    //   </div>
    //   <div className="detail" style={{marginBottom: "0"}}>
    //   <p>
    //       <a
    //         className="icons"
    //         href="https://discord.gg/VZKfDphYfu"
    //         target={"_blank"} rel="noreferrer"
    //       >
    //         <BsDiscord />
    //       </a>{" "}
    //       <a
    //         className="icons"
    //         href="https://twitter.com/2xSolution"
    //         target={"_blank"} rel="noreferrer"
    //       >
    //         <BsTwitter />
    //       </a>{" "}
    //       <a
    //         className="icons"
    //         href="https://www.linkedin.com/company/2x-solution"
    //         target={"_blank"} rel="noreferrer"
    //       >
    //         <BsLinkedin />
    //       </a>{" "}
    //   </p></div>
    //   <div className="detail" style={{margin: "0"}}>
    //    <p>2X Solution helps you develop all crypto applications with fast delivery and 100% Quality</p>
    //   </div>
    //   <div className="detail">
    //     <p>
    //       Design with{" "}
    //       <span className="icons">
    //         <BsHeartFill />
    //       </span>{" "}
    //       by 2X Solution
    //     </p>
    //     {/* <button onClick={OnClickSpin}>Open Box</button> */}
    //   </div>
    // </div>
  );
};

export default Footer;

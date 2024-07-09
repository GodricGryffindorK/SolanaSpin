import React from "react";
// import { AiTwotoneFire } from "react-icons/ai";
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import BannerImg from "../Image/Rectangle 59.png";
// import { BsDiscord, BsTwitter, BsLinkedin } from "react-icons/bs";
// import Check from '../../assets/check.png';
// import Twitter from '../../assets/twitter.png';
// import Linkedin from '../../assets/linkedin.png';
// import Discord from '../../assets/discord.png';

const Banner = () => {
  return (
    <>
    <div style={{padding: "0.5rem"}}>
      <div className="banner-container bg-banner section-box-shadow">
        <h2>Spin and win with your $FRONK</h2>
        <h2>Post your win on twitter and get a chance to win 100 Million $FRONK</h2>
        <h2>We burn 13.33% $FRONK for the community</h2>
        {/* <div className="banner-socials">
          <img src={Check} alt="l" className="check"></img>
          <p>Audited by Experts</p>
          <div className="banner-social-link">
            <a href="/"><img src={Discord} alt="l"></img></a>
            <a href="/"><img src={Twitter} alt="l"></img></a>
            <a href="/"><img src={Linkedin} alt="l"></img></a>
          </div>
        </div> */}
      </div>
    </div>
    </>
    // <div className="container ">
    //   <div className="banner mt-40">
    //     <div className="banner_content">
    //       <div className="adranaline_box"> 
    //         <div className="adranaline_box_content">
    //           <p className="top">
    //           Spin and Win with your luck ! <span className="new">New</span>
    //             <span className="hot">
    //               <AiTwotoneFire />
    //             </span>
    //           </p>
    //           <p className="fee">Post your Wins and stand to win Extra NFTS Prizes !</p>
    //           <p className="fee">
    //           Our Game have a 94% Return To Player Payout
    //           </p>
    //         </div>
    //       </div>
    //       <div className="go_back">
    //         <p>
    //           <p style={{color: "#45f345",marginRight: "10px", fontSize: "26px"}}>
    //             <IoIosCheckmarkCircle />
    //           </p>{" "}
    //           Audited by experts
    //         </p>
    //         <p>
    //         <a className="icons" href="https://discord.gg/VZKfDphYfu" target={"_blank"}><BsDiscord /></a> {" "}
    //         <a className="icons" href="https://twitter.com/2xSolution" target={"_blank"}><BsTwitter /></a> {" "}
    //         <a className="icons" href="https://www.linkedin.com/company/2x-solution" target={"_blank"}><BsLinkedin /></a> {" "}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Banner;

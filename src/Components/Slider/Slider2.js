/* eslint-disable no-dupe-keys */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import SliderData from "./SliderData";
import SliderJS from "react-slick";
import { GetIndex, ReturnRepeatedData } from "../../utils/Util";
import {
  withdrawAllPaidTokens,
  spinWheel,
  claimWinningItem,
  getClaimStatus,
  getPoolInfo,
  getItemInfos,
  initialize,
  getNFTs,
  getLastUsers,
} from "../../contexts/helpers";

import {
  REWARD_TOKEN_DECIMAL,
  PERCENTAGE_DECIMALS,
  REWARD_TYPE_NFT,
  REWARD_TYPE_TOKEN,
  REWARD_TYPE_SOL,
  FRONK_DECIMAL,
  FRONK_MINT,
  network
} from "../../contexts/constants";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { AiOutlineConsoleSql } from "react-icons/ai";

import Confetti from "react-confetti";
import Modal from "react-modal";
import { setTokenSourceMapRange } from "typescript";
import Loader from "../Loader/Loader";
import { NotificationManager } from "react-notifications";
import * as anchor from "@project-serum/anchor";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
// import Running from "../../assets/running.mpeg";
import FronkAudio from "../../assets/fronk.mp3";
import imgSolana from "../Image/Image/sol.png";
import boxImg from "../Image/Image/box1.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
// import Sol from '../../assets/sol.png';
// import Euk from '../../assets/EuK.png';
import ChevronLeft from '../../assets/arrow 1.png';
import ChevronRight from '../../assets/arrow 2.png';
import Line from '../../assets/Line.png';
import Graph from '../../assets/graph.png';
import 'swiper/swiper-bundle.css';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "transparent",
  },
};

Modal.setAppElement("#root");

let stopIndex = -1; //10;
let isInitialized = false;

const Slider = (props) => {
  const sliderRef = useRef();
  var audioPlayerRef = useRef();

  const config = {
    className: "center",
    infinite: true,
    centerMode: true,
    // rtl: true,
    // autoplaySpeed: 400,
    arrows: false,
    slidesToShow: 3,
    // : "cubic-bezier(0, 0.1, 0.2, 1)",
    cssEase: "ease-out",
    afterChange: (e) => {
      setCurrentIndex(e);
      setTimeout(() => {
        if (stopIndex != -1) {
          openModal2();
          stopIndex = -1;
        }
      }, 100);
    },
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    // slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let slider;

  // useEffect(() => {

  //   this.slider.slickGoTo(props.jumpItem);

  // }, [props.jumpItem]);

  const { connection } = useConnection();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();

  const [arraytoLoop, setarraytoLoop] = useState(SliderData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [winnerItem, setWinnerItem] = useState(arraytoLoop[stopIndex]);
  const [adminInitFlag, setAdminInitFlag] = useState(true);
  const [claimEnabled, setClaimEnabled] = useState(false);
  const [dustAmount, setDustAmount] = useState(0);
  const [forgeAmount, setForgeAmount] = useState(0);
  const [paySolAmount, setPaySolAmount] = useState(0);
  const [payFronkAmount, setPayFronkAmount] = useState(0);
  const [lastUsers, setLastUsers] = useState([]);

  const tokenSymbolImage = async (tokenMint, tokenType) => {
    if (tokenType == REWARD_TYPE_NFT) {
      try {
        let metaData = await getNFTs(
          connection,
          tokenMint // new PublicKey("DBnoYYwj42y3tVYJfSsnFjtn97qv81CVxxdcexGumZrT")
        );
        let res = await axios.get(metaData.uri);
        if (res.data && res.data.image) {
          return { symbol: res.data.symbol, image: res.data.image };
        }
      } catch (error) {
      }

      return null;
    } else if (tokenType == REWARD_TYPE_TOKEN) {
      try {
        let addrStr = tokenMint.toBase58(); //"BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW"; // tokenMint.toBase58();
        let apiurl =
          "https://api.solscan.io/account?address=" + addrStr + `?cluster=${network}`;
        let res = await axios.get(apiurl);
        if (res?.data?.data?.metadata?.data?.uri) {
          const { data }= await axios.get(res?.data?.data?.metadata?.data?.uri);
          return { symbol: data.symbol, image: data.image };
        }
      }
      catch (error) {
      }
    } else {
      return { symbol: "SOL", image: imgSolana };
    }
  };

  useEffect(() => {
    const func = async () => {
      if (
        wallet &&
        isInitialized == false &&
        isLoading == false
      ) {
        setIsLoading(true);
        if ((await initialize(wallet, connection, true)) == false) {
          setIsLoading(false);
          NotificationManager.error("Admin is not initialized")
          return;
        }

        let sData = await getItemInfos(connection);
        console.log('sData', sData);
        var repeatedData = null;
        if (sData) {
          let tmpData = arraytoLoop.slice(0, sData.count);// [...arraytoLoop];
          for (let i = 0; i < sData.count; i++) {
            let symbolImage = await tokenSymbolImage(
              sData.rewardMintList[i].itemMintList[0],
              sData.tokenTypeList[i]
            );
            if (symbolImage) {
              tmpData[i].symbol = symbolImage.symbol;
              if (symbolImage.image) {
                tmpData[i].image = symbolImage.image;
              }
            }
            tmpData[i].percent =
              Number(sData.ratioList[i]) / 10 ** PERCENTAGE_DECIMALS + "%";
            tmpData[i].price =
              "" + sData.amountList[i].toNumber() / 10 ** REWARD_TOKEN_DECIMAL;
            tmpData[i].desc = getDesc(Number(sData.ratioList[i]) / 10 ** PERCENTAGE_DECIMALS, tmpData[i].desc);
          }
          repeatedData = ReturnRepeatedData(tmpData);
        } else {
          repeatedData = []; //ReturnRepeatedData(arraytoLoop);
        }
        setarraytoLoop(repeatedData);

        isInitialized = true;
        setIsLoading(false);
      }
    };
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  useEffect(() => {
    updateClaimButton();
    updateSettingInfo();
    updateLastUsersInfo();
  }, [wallet]);

  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function openModal2() {
    setIsOpen2(true);
    OnClickClaim(false)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000000";
  }

  const closeModal = async () => {
    setIsOpen(false);
    openModal2();
  };
  const closeModal2 = async () => {
    setIsOpen2(false);
    spinTheWheel();
  };

  const GetIndex = () => {
    var times = 0;
    var i = currentIndex;
    while (times < 6) {
      if (arraytoLoop[i].id && arraytoLoop[i].id == stopIndex) {
        times++;
      }
      i++;
      if (i === 120) {
        i = 0;
      }
    }
    return i - 1;
  };

  const spinTheWheel = async () => {
    var pauseIndex = GetIndex();
    setCurrentIndex(pauseIndex);
    sliderRef.current?.slickGoTo(pauseIndex, false);
    try {
      console.log('pause');
      audioPlayerRef.audioEl.current.pause();
    } catch (error) {
      console.log('audio pause error : ', error);
    }
  };

  const OnClickSpin = async () => {
    if (!wallet || !wallet.connected) {
      setVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      audioPlayerRef.audioEl.current.play();
      console.log('play', audioPlayerRef.audioEl)
    } catch (error) {
      console.log('audio playing error : ', error);
    }
    const itemIndex = await spinWheel(wallet, connection);
    setIsLoading(false);
    if (itemIndex >= 0) {

      // setStopIndex(itemIndex + 1);
      stopIndex = itemIndex + 1;
      setWinnerItem(arraytoLoop[itemIndex]);
      setIsLoading(false);

      openModal2();
      updateLastUsersInfo();
    }
    else {
      console.log('pause');
      audioPlayerRef.audioEl.current.pause();
    }
  }

  const updateLastUsersInfo = async () => {
    let data = await getLastUsers(connection);
    let tmpRes = [];
    for (let i = 0; i < data.count; i++) {
      if (!data.userList[i]) continue;
      let user1 = data.userList[i].toBase58();
      let payAmount = data.payAmount[i].toNumber() / (10 ** REWARD_TOKEN_DECIMAL);
      let rAmount = data.rewardAmount[i].toNumber() / (10 ** REWARD_TOKEN_DECIMAL);
      let rMint = data.rewardMint[i];
      let rTokenName = data.rewardType[i] == REWARD_TYPE_SOL ? "$SOL" : "$TOKEN";

      if (data.rewardType[i] != REWARD_TYPE_SOL) {
        let addrStr = rMint.toBase58();
        try {
          let apiurl = "https://public-api.solscan.io/token/meta?tokenAddress=" + addrStr;
          let res = await axios.get(apiurl);
          if (res.data && res.data.symbol) {
            rTokenName = "$" + res.data.symbol;
          }
        } catch (e) {
        }
      }

      let rUser = user1.slice(0, 3) + "..." + user1.slice(-4);
      let rText = rUser + " Spin for " + payAmount + " $FRONK and win " + rAmount + " " + rTokenName;

      tmpRes.push({
        user: user1,
        sUser: rUser,
        pay: payAmount,
        reward: rAmount,
        tokenName: rTokenName
      });
    }
    setLastUsers([...tmpRes]);
  }

  const updateSettingInfo = async () => {
    let pool = await getPoolInfo(connection);
    // setDustAmount(pool.dustPrice.toNumber() / (10 ** REWARD_TOKEN_DECIMAL));
    // setForgeAmount(pool.forgePrice.toNumber() / (10 ** REWARD_TOKEN_DECIMAL));
    // setPaySolAmount(pool.solPrice.toNumber() / LAMPORTS_PER_SOL);
    setPayFronkAmount(pool.price.toNumber() / FRONK_DECIMAL);
  }

  const updateClaimButton = async () => {
    let claimStatus = await getClaimStatus(wallet, connection);
    setClaimEnabled(claimStatus);
  };

  const OnClickClaim = async (needLoading) => {
    if (needLoading) setIsLoading(true);
    try {
      await claimWinningItem(wallet, connection);
    } catch (error) {
    }
    setIsLoading(false);

    updateClaimButton();
    updateLastUsersInfo();
  };

  const getDesc = (percentage, defaultDesc) => {
    let desc = defaultDesc;
    if (percentage < 0.01) {
      desc = "FRONKISH";
    } else if (percentage < 1) {
      desc = "RARE";
    } else if (percentage < 11) {
      desc = "LUCKY";
    } else {
      desc = "UNLUCKY";
    }

    return desc;
  }

  const swiperRef = useRef();
   const swiperRefTwo = useRef();

   const sliderSettings = {
      240: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      540: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      680: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      {!adminInitFlag && (
        <div>
          <Modal
            isOpen={true}
            style={customStyles}
            contentLabel="Admin Init Confirm"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              Admin didn't initialize.
            </h2>
          </Modal>
        </div>
      )}
      {isLoading && <Loader />}
      <div>
        {/* <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You've won</h2>
          <h3>{winnerItem && winnerItem.price} </h3>
          <img src={OpenBox} alt="" />
        </Modal> */}
        
        {modalIsOpen2 && <Confetti />}
        <Modal
          isOpen={modalIsOpen2}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal2}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="openbox-container">
        <div className="openbox-wrap section-box-shadow" style={{display: "block", margin: "0px", padding: "25px"}}>
          <button onClick={closeModal2} style={{background: "transparent",top: "9px",right: "18px",fontSize: "38px",position: "absolute"}}>X</button>
          <h2 className="price-text-center mb-6" ref={(_subtitle) => (subtitle = _subtitle)}>{winnerItem?.price > 0 ? `You've won` : `You've burned`}</h2>
          <img src={winnerItem && winnerItem.image} style={{ maxWidth: "300px" }} alt="FRONK_IMG" />
          <h3  className="price-text-center mt-6">{winnerItem?.price > 0 ? winnerItem.price : 444333} $FRONK</h3>
          </div>
          </div>
        </Modal>
      </div>
      {/* <SliderJS {...config} ref={sliderRef}>
        {arraytoLoop &&
          arraytoLoop.map((val, ind) => {
            return (
              <div className="slider" key={ind}>
                <div className="slider_box_content">
                  <div className="slider_box_container">
                    <div className="percent_and_desc_box">
                      <div className="percent">{val?.percent}</div>
                      <div className="desc">{val?.desc}</div>
                    </div>
                    <img className="slider_img" src={val?.image} alt="" />
                    <div className="price">
                      <p>
                        {val?.price} <small>{val?.symbol}</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </SliderJS> */}
      <div className="nft-slider-container">
        <div>
          <Swiper
            grabCursor={true}
            slidesPerView={4}
            breakpoints={sliderSettings}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            speed={1200}
            spaceBetween={15}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
          >
            {arraytoLoop && arraytoLoop.map((val,ind)=>{
              return(
                <SwiperSlide key={ind}>
                  <div className="nft-card card-box-shadow">
                    <div className="nft-card-flex">
                      <p>{val?.percent}</p>
                      <p>{val?.desc}</p>
                    </div>
                    <div className="nft-img-wrap">
                      <img src={val?.image} alt="l" className="max-w-[180px]"></img>
                    </div>
                    <p className="price-text-center">{val?.price} {val?.symbol}</p>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className="slider-navigation-btns">
            <button onClick={() => swiperRef.current?.slidePrev()}>
              <img src={ChevronLeft} alt="LeftChevron" />
            </button>
            <button onClick={() => swiperRef.current?.slideNext()}>
              <img src={ChevronRight} alt="RightChevron" />
            </button>
          </div>
        </div>
      </div>

      <ReactAudioPlayer
        ref={(el) => {
          if (el) audioPlayerRef = el;
        }}
        src={FronkAudio}
        loop={isLoading}
      />
      {/* <div className="box-container">
        <img src={boxImg} alt="" className="" width={250}/>
      </div> */}
      {/* <div className="detail"> 
        <div onClick={() => OnClickSpin(false)}>Open Box({dustAmount} Token)</div>
        <div onClick={() => OnClickSpin()} style={{ marginLeft: "16px" }}>Open Box({payFronkAmount} $BONK)</div>
        {
          claimEnabled && (
            <div onClick={() => OnClickClaim()} style={{ marginLeft: "16px" }}>Claim</div>
          )
        }
      </div> */}
      <div className="openbox-container">
        <div className="openbox-wrap section-box-shadow">
          <button type="button" 
          onClick={() => OnClickSpin()} 
          className='openbox-btn btn-gradient'
          // style={{cursor: "not-allowed", }}
          title="Upgrade Mode">Spin({payFronkAmount} $FRONK)</button>
          {/* <div className="line-img">
            <img src={Line} alt="l"></img>
          </div> */}
          {claimEnabled ? (
            <button type="button" onClick={() => OnClickClaim()} className='openbox-btn btn-gradient'>Claim</button>
          ): (
            <></>
            // <button type="button" onClick={() => OnClickSpin()} className='openbox-btn btn-gradient'>Open Box({payFronkAmount} $BONK)</button>
          )}
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "40px", marginTop: "40px" }} className="banner-container bg-banner section-box-shadow">
        {
          lastUsers.map(item => <div className="p-2" style={{padding: "10px", fontSize: "20px"}}>
            <a href={`https://solscan.io/account/${item.user}`} target="_blank">{item.sUser}</a>
            {
              item.reward >= 1000 ? 
                ` Spin for ${item.pay} $FRONK and won ${item.reward} ${item.tokenName};` :
                ` Spin for ${item.pay} $FRONK and burned 444333 ${item.tokenName};`
            }
            </div>)
        }
      </div>
      <div className="graph-img">
        <img src={Graph} alt="g"/>
      </div>
    </div>
  );
};

export default Slider;

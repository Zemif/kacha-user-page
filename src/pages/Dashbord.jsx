import React from "react";
import "./dashbord.scss";

import KachaSystem from "./../assets/KachaSystem.png";
import welcome from "./../assets/welcome.png";
import KachaOnline from "./../assets/kachaOnline.png";
import kachaDescription from "./../assets/kachaDescription.png";
import mobile_app from "./../assets/mobile_app.png";
import app_store_one from "./../assets/app_store_one.png";
import app_store_two from "./../assets/app_store_two.png";

import SimpleImageSlider from "react-simple-image-slider";
import SteperNumber from "./Home/SteperNumber";
import Footer from "./Home/Footer";
import MenuLList from "./MenuLList";
const images = [
  { url: `${welcome}` },
  { url: `${KachaOnline}` },
  { url: `${KachaSystem}` },
];

const Dashbord = () => {
  return (
    <div>
      <div>
        <MenuLList />
      </div>
      <div className="imageSliderView">
        <SimpleImageSlider
          width={1345}
          height={504}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </div>
      <div className="bodyContainer">
        <div className="bodyOne">
          <h1>Take Control of your Bills</h1>
          <div className="paragraphList">
            <p>Renew your DSTV, Internet, Electricity and also</p>
            <p>much more with Kacha's smooth bill payment </p>
            <p>service</p>
          </div>
          <form>
            <div className="bodyButton">
              <button>Get Started Now</button>
            </div>
          </form>
          <div className="payementStatus">Make those payments with ease</div>
          <div className="setperNumber">
            <SteperNumber />
          </div>
        </div>
        <div className="bodyTwo">
          <div>
            <h1>With Kacha, Consider your bills paid</h1>
          </div>
          <h4>Enable recurent payments so you never miss a payment</h4>
          <img
            src={kachaDescription}
            style={{ width: "1345px", height: "304px" }}
          />
        </div>
        <img src={mobile_app} style={{ width: "1345px", height: "504px" }} />
        <div className="bodyThree">
          <h1> Kacha is wherever you are !</h1>
          <p>
            Download the app, visit the mobile site or dial *242# to transact
          </p>
          <img src={app_store_one} style={{ width: "200px", height: "50px" }} />
          <img src={app_store_two} style={{ width: "200px", height: "50px" }} />
        </div>
      </div>
      <div className="bodyFooter">
        <div className="leftSide">
          <h1>Send money anytime,anywhere.</h1>
          <p>
            Download the app, visit the mobile site or dial *242# to transact
          </p>
          <img src={app_store_one} style={{ width: "200px", height: "50px" }} />
          <img src={app_store_two} style={{ width: "200px", height: "50px" }} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Dashbord;

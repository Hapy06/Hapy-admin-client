import React, { useState } from "react";
import Hapy2ButtonSwitching from "../../components/Hapy2ButtonSwitching";
import HapyButtonWithIcon_Little from "../../components/HapyButtonWithIcon_Little";
import IconSomeoneDelete from "../../globals/icons-components/IconSomeoneDelete";
import HapyButtonOnlyIcon from "../../components/HapyButtonOnlyIcon";
import { getAdminProcessValues } from "../../globals/GlobalVariables";

type PropsType = {
  classAdditional?: string;
  showLeftBtn?: boolean;
  leftBtnComponent?: any;
  handleSwitchListToShow: any;
  numberOfCloseTable: number | string;
};
export const screenWidth: number = window.screen.width;
export const screenHeight: number = window.screen.height;
export const screenWidthPourcent: any = (pourcent: number) => {
  return (pourcent * screenWidth) / 100;
};
export const screenHeightPourcent: any = (pourcent: number) => {
  return (pourcent * screenHeight) / 100;
};

function Hote_Top(props: PropsType) {
  const [activeBtn, setActiveBtn] = useState<"btn1" | "btn2">("btn1");
  const handleSwitchBtnActive = (btnToActive) => {
    console.log("hote top handle = " + btnToActive);
    if (btnToActive == "btn1") {
      setActiveBtn("btn1");
      props.handleSwitchListToShow("Tables");
    } else {
      setActiveBtn("btn2");
      props.handleSwitchListToShow("Reservations");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedin");
    setTimeout(() => {
      location.reload();
    }, 500);
  };
  return (
    <div
      className={
        props.classAdditional
          ? "preparation-top-container text-white " + props.classAdditional
          : "preparation-top-container text-white"
      }
      /*style={{width:screenWidth+5}}*/
    >
      <div className="preparation-container-wrapper">
        <div className="text-center welcome-word" style={{ fontSize:'8px', fontWeight: 300 }}>
          Welcome to Hâpy
        </div>
        <div className="row" style={{marginRight: '12px', marginLeft: '12px'}}>
          <div
            className="col-2 d-flex flex-column justify-content-center"
            style={{ maxWidth: 305 }}
          >
            <h3>{getAdminProcessValues("userLogged").position}</h3>
            <span>
              <span className="text-green">
                {getAdminProcessValues("userLogged").firstName}
              </span>
              <span> {getAdminProcessValues("userLogged").lastName}</span>
            </span>
          </div>
          <div className="col-4 mt-3">
            {props.showLeftBtn ? (
              props.leftBtnComponent
            ) : screenWidth > 1100 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginLeft: "-105px",
                }}
              >
                <HapyButtonWithIcon_Little
                  handleClick={handleLogout}
                  iconComponent={<IconSomeoneDelete stroke="white" />}
                  btnClass="hapy-btn-with-icon-black max-width-248"
                  btnHeight={64}
                  btnWidth={64}
                />
              </div>
            ) : (
              <HapyButtonOnlyIcon
                handleClick={handleLogout}
                iconComponent={<IconSomeoneDelete stroke={"white"} />}
                isChecked={false}
                btnClass="hapy-btn-with-icon-black"
                btnWidth={64}
              />
            )}
          </div>
          <div className="col-2" style={{ marginLeft: -40, marginTop: "5px" }}>
            <div className="f-12" style={{ marginLeft: "15px" }}>
              Libres
            </div>
            <div style={{ marginTop: -10, marginLeft:15 }}>
              <span className="f-48 fw-6 text-green">
                {props?.numberOfCloseTable || 0}
              </span>
              {/*<span className="fw-6 f-32 ml-1 text-white">14</span>*/}
            </div>
          </div>
          <div className="col-4 float-end mt-3">
            <Hapy2ButtonSwitching
              activeBtn={activeBtn}
              textBtn1={"Tables"}
              textBtn2={"Réservations"}
              handleClickBtn1={() => handleSwitchBtnActive("btn1")}
              handleClickBtn2={() => handleSwitchBtnActive("btn2")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hote_Top;

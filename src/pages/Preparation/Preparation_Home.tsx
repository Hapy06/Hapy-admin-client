import React, { useContext, useEffect, useState } from "react";
import Preparation_Top, {screenHeight, screenHeightPourcent} from "./Preparation_Top";
import IconTimer2 from "../../globals/icons-components/IconTimer2";
import PreparationCommandBox from "./PreparationCommandBox";
import PreparationCurrentCommandRed from "./PreparationCurrentCommandRed";
import { useNavigate } from "react-router";
import {
  NotificationHapy,
  Order,
  PreparationProcessModel,
} from "../../globals/models/models";
import axios from "axios";
import {
  BASE_URL,
  getAdminProcessValues,
  getProcessStored,
  setProcessStored,
} from "../../globals/GlobalVariables";
import PullToRefresh from "react-simple-pull-to-refresh";
import { preparationContext } from "./PreparationContainer";
import io from "socket.io-client";

import { Simulate } from "react-dom/test-utils";
import IconKey from "../../globals/icons-components/IconKey";
import IconOrder from "../../globals/icons-components/IconOrder";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

type PropsType = {};

function Preparation_Home(props: PropsType) {
  const { preparationProcess, setPreparationProcess } = useContext<{
    preparationProcess: PreparationProcessModel;
    setPreparationProcess: any;
  }>(preparationContext);
  const [loadMessageNotif, setLoadMessageNotif] = useState<string>(
    "(Pas de commandes en cours)"
  );
  const [blurBG, setBlurBG] = useState<string>("");
  const [orders, setOrders] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState<{
    state: boolean;
    modalToOpen: any;
  }>({ state: false, modalToOpen: null });
  const navigate = useNavigate();
  // const socketOpenOrder = io(BASE_URL);

  useEffect(() => {
    if (
      !preparationProcess?.listAllOrders ||
      preparationProcess.listAllOrders?.length == 0
    )
      handleLoadData();
  }, []);

  const handleLoadData = () => {
    return axios
      .get(
        BASE_URL +
          "api/v1/managements/order?status=waiting&institutionID=" +
          getAdminProcessValues("userLogged").institution.id, //+
          // "&position=" +
          // getAdminProcessValues("userLogged").position,
        {
          headers: {
            Authorization: `Bearer ${getAdminProcessValues("authToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 202 ||
          response.status === 203 ||
          response.status === 204
        ) {
          let listOrdersFromDB = response.data.data.response.items.sort(
            (a, b) => (a.createdAt < b.createdAt ? -1 : 1)
          );
          if (listOrdersFromDB?.length == 0) {
            setLoadMessageNotif("(Pas de commandes en cours)");
          } else {
            let temp = { ...preparationProcess };
            temp.ticketQuantity = listOrdersFromDB.length;
            if (!temp.listAllOrders) temp.listAllOrders = [];
            if (!temp.listWaitingOrders) temp.listWaitingOrders = [];
            listOrdersFromDB.forEach((order: Order) => {
              if (
                temp?.listAllOrders?.some((elt: Order) => elt.id == order.id) ==
                false
              ) {
                temp.listAllOrders.push(order);
                temp.listWaitingOrders.push(order);
              }
            });
            if (!temp.orderCooking) {
              temp.orderCooking = temp.listWaitingOrders.pop();
              temp.orderCooking.status = "cooking";
            }
            setProcessStored("preparationProcess", temp);
            setPreparationProcess({ ...temp });
          }
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadMessageNotif("(Erreur de Chargement, Veuillez ressayez...)");
        throw error;
      });
  };

  const handleOrderClicked = (order: Order, timerProp: boolean = false) => {
    let temp = { ...preparationProcess };
    temp.orderDetail = order;
    setProcessStored("preparationProcess", temp);
    setPreparationProcess({ ...temp });
    navigate("/preparation/order", {state: {timerProp}});
  };

  const handleOpenModal = (modalToOpen) => {
    setBlurBG("blur-bg");
    setIsModalOpened({ state: true, modalToOpen: modalToOpen });
  };

  const handleCloseModal = () => {
    setBlurBG("");
    setIsModalOpened({ state: false, modalToOpen: null });
  };

  return (
    <>
      <Preparation_Top
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        classAdditional={blurBG}
      />
      {/*<div className={"border-orange-container preparation-container-wrapper " + blurBG}></div>*/}
      <div className="preparation-bottom-container-without-border border-orange">
        <div className={"preparation-container-wrapper " + blurBG}>
          <PullToRefresh onRefresh={handleLoadData}>
            <>
              <div className="text-center -mb-3 mt-4">
                <svg width="16"  height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1228_18481)">
                    <path
                      d="M12.6711 15.5509L11.4503 15.8086C11.2583 15.8499 11.0625 15.871 10.8661 15.8718C10.6283 15.8734 10.392 15.835 10.167 15.7581C9.9683 15.6895 9.78241 15.5883 9.61692 15.4587C9.32376 15.2239 9.09332 14.9202 8.94622 14.5746C8.86325 14.386 8.80386 14.1879 8.76939 13.9847C8.74481 13.875 8.72876 13.7635 8.72139 13.6513C8.71192 13.525 8.7075 13.3917 8.7075 13.2452C8.7075 12.7482 8.75423 12.1324 8.79971 11.5369C8.84518 10.9413 8.89065 10.366 8.89065 9.96494C8.89065 9.92452 8.89065 9.886 8.89065 9.84937C8.58309 10.575 8.27805 11.3651 7.93575 12.1273C7.52715 13.0368 7.06738 13.9051 6.47563 14.5746C6.08154 15.0198 5.6262 15.3773 5.08623 15.585L5.05276 15.5983C4.74781 15.7132 4.42608 15.7772 4.10039 15.7878C4.0145 15.7916 3.93114 15.7935 3.84777 15.7935C3.0375 15.7935 2.36933 15.621 1.83189 15.3072C1.30827 14.996 0.884157 14.5421 0.609218 13.9986C0.416667 13.623 0.273995 13.2239 0.184821 12.8113C0.0561636 12.2107 -0.00568254 11.5978 0.000409853 10.9836C0.000409853 9.50139 0.293446 7.88906 0.673004 6.45356C1.05256 5.01806 1.51927 3.76382 1.87294 2.99839C1.95604 2.8155 2.04879 2.63715 2.15082 2.4641C2.18843 2.40148 2.23065 2.34173 2.27712 2.28537H2.28028C2.44532 2.08161 2.64165 1.90532 2.86193 1.76309C3.10198 1.60708 3.35563 1.47307 3.61979 1.36269C4.18555 1.13359 4.77084 0.956041 5.36853 0.832192C6.08476 0.675747 6.81016 0.564794 7.54041 0.500001H7.56378C7.60157 0.499946 7.63926 0.503969 7.67619 0.512C7.73752 0.523849 7.79576 0.548136 7.84734 0.583364C7.89157 0.614328 7.92915 0.653841 7.95786 0.699568C8.00186 0.772622 8.02379 0.856844 8.02101 0.942081C8.01993 1.01873 8.00716 1.09476 7.98312 1.16754L7.97365 1.19975L7.95281 1.22691C6.80719 2.71609 5.78851 4.47872 5.00223 6.24326C4.22228 7.99453 3.6722 9.74769 3.44927 11.2325C3.46724 11.313 3.49152 11.3919 3.5219 11.4686C3.56188 11.577 3.62187 11.6768 3.69873 11.7629C3.74296 11.8109 3.79825 11.8473 3.85977 11.869C3.89661 11.8814 3.93523 11.8876 3.97408 11.8874C4.05858 11.8848 4.14169 11.8652 4.21849 11.8299C4.34059 11.7741 4.45535 11.7035 4.56015 11.6196L4.56458 11.6158C4.7193 11.4724 4.91256 11.2205 5.12665 10.9059C5.34074 10.5914 5.58515 10.2049 5.8485 9.79506C6.37521 8.97405 6.98844 8.04884 7.69008 7.30614C8.15806 6.81165 8.66708 6.39672 9.226 6.1561C9.54288 6.01637 9.8851 5.94328 10.2314 5.94138C10.3554 5.94129 10.4791 5.95122 10.6015 5.97106C10.8689 6.00589 11.1244 6.10302 11.3474 6.25462C11.5474 6.39691 11.709 6.58655 11.8179 6.80659C12.0035 7.17226 12.0705 7.61497 12.0705 8.10252C12.0705 8.84395 11.912 9.6978 11.7143 10.5655C11.5166 11.4333 11.2829 12.2928 11.1181 13.0589L11.1143 13.0785C10.9924 13.6468 10.9116 14.1559 10.9122 14.5525C10.9095 14.6955 10.9233 14.8383 10.9533 14.9781C10.9734 15.0777 11.0138 15.1721 11.072 15.2554C11.1036 15.2984 11.1433 15.3349 11.1888 15.3627C11.2619 15.4053 11.3438 15.4304 11.4282 15.436L12.6711 15.5509Z"
                      fill="#323232"
                    />
                    <path
                      d="M15.9997 14.5102C15.9978 14.7537 15.9341 14.9927 15.8146 15.2049C15.698 15.4165 15.5302 15.5954 15.3264 15.7253C15.1365 15.847 14.916 15.9126 14.6905 15.9147C14.5053 15.9157 14.3235 15.8654 14.1651 15.7694C14.0067 15.6735 13.8779 15.5356 13.793 15.371C13.7025 15.1953 13.6559 15.0003 13.6573 14.8026C13.6602 14.5598 13.7232 14.3216 13.8406 14.1091C13.9581 13.8966 14.1264 13.7165 14.3305 13.585C14.5204 13.4633 14.7409 13.3976 14.9664 13.3955C15.1516 13.3946 15.3335 13.4449 15.4918 13.5409C15.6502 13.6368 15.779 13.7747 15.8639 13.9393C15.9551 14.1156 16.0017 14.3117 15.9997 14.5102Z"
                      fill="#F7B927"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1228_18481">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="row">
                {/*COMMAND COMMAND COL */}
                {preparationProcess?.listPausedOrders?.length > 0 && (
                  <div className="col-lg-3 col-md-4 justify-content-center pl-2 scroll-and-hidden" style={{marginTop:6, height:screenHeight - 150}}>
                    <div className="text-center f-20" style={{ opacity: 0.32 }}>
                      {preparationProcess.listPausedOrders?.length}{" "}
                      <IconTimer2
                        width={48}
                        height={48}
                        styleIcon={{ width: 32 }}
                        classIcon="mt-1"
                      />
                    </div>
                    <hr className="-mt-1" style={{width:275}} />
                    <br/>
                    <div>
                      {preparationProcess.listPausedOrders?.map(
                        (order: Order, index: number) => (
                          <PreparationCommandBox
                            removePauseIcon={false}
                            key={index}
                            order={order}
                            handleClick={() => handleOrderClicked(order)}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
                {/*RED COMMAND COL */}
                <div className="col-lg-3 col-md-4 d-flex justify-content-center px-0">
                  <br />
                  {preparationProcess?.orderCooking && (
                    <PreparationCurrentCommandRed
                      order={preparationProcess.orderCooking}
                      handleClick={() =>
                        handleOrderClicked(preparationProcess.orderCooking, true)
                      }
                    />
                  )}
                </div>
                {/*All COMMAND LIST COL */}
                <div
                  className={
                    preparationProcess?.listPausedOrders?.length > 0
                        ? "col-lg-6 col-md-4 px-0"
                        : "col-lg-9 col-md-8 px-0"
                  } style={{marginTop: 16}}
                >
                  <div className="col-lg-5 col-md-12 float-end  d-flex  justify-content-end m-right">
                    <div className="" style={{ marginRight: 48 }}>
                      <div className="fw-3 mb-1" style={{ fontSize: 8 }}>
                        Couverts
                      </div>
                      <span className="fw-7">0</span>
                      <span style={{ marginLeft: 4 }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.15957 10.87C9.05957 10.86 8.93957 10.86 8.82957 10.87C6.44957 10.79 4.55957 8.84 4.55957 6.44C4.55957 3.99 6.53957 2 8.99957 2C11.4496 2 13.4396 3.99 13.4396 6.44C13.4296 8.84 11.5396 10.79 9.15957 10.87Z"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.4103 4C18.3503 4 19.9103 5.57 19.9103 7.5C19.9103 9.39 18.4103 10.93 16.5403 11C16.4603 10.99 16.3703 10.99 16.2803 11"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.15973 14.56C1.73973 16.18 1.73973 18.82 4.15973 20.43C6.90973 22.27 11.4197 22.27 14.1697 20.43C16.5897 18.81 16.5897 16.17 14.1697 14.56C11.4297 12.73 6.91973 12.73 4.15973 14.56Z"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="" style={{ marginRight: 48 }}>
                      <div
                        className="fw-3 mb-1"
                        style={{ fontSize: 8, marginLeft: 15 }}
                      >
                        Ticket
                      </div>
                      <span className="fw-8">{orders.length}</span>
                      <span style={{ marginLeft: 4 }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97C3 3.33 4.34 2 6 2H18C19.66 2 21 3.33 21 4.97V15.88C21 17.52 19.66 18.86 18 18.86Z"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.0701 8.95005C12.0301 8.95005 11.97 8.95005 11.92 8.95005C10.87 8.91005 10.04 8.06005 10.04 7.00005C10.04 5.92005 10.9101 5.05005 11.9901 5.05005C13.0701 5.05005 13.9401 5.93005 13.9401 7.00005C13.9501 8.06005 13.1201 8.92005 12.0701 8.95005Z"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.25043 11.96C7.92043 12.85 7.92043 14.3 9.25043 15.19C10.7604 16.2 13.2404 16.2 14.7504 15.19C16.0804 14.3 16.0804 12.85 14.7504 11.96C13.2404 10.96 10.7704 10.96 9.25043 11.96Z"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="">
                      <div
                        className="fw-3 mb-1"
                        style={{ fontSize: 8, marginLeft: 15 }}
                      >
                        Envoy??
                      </div>
                      <span className="fw-8">
                        {preparationProcess?.listFinishedOrders?.length || 0}
                      </span>
                      <span style={{ marginLeft: 4 }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.4404 19.05L15.9604 20.57L19.0004 17.53"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44961 10.79 7.55961 8.84 7.55961 6.44C7.54961 3.99 9.53961 2 11.9896 2C14.4396 2 16.4296 3.99 16.4296 6.44C16.4296 8.84 14.5296 10.79 12.1596 10.87Z"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.99 21.8099C10.17 21.8099 8.36004 21.3499 6.98004 20.4299C4.56004 18.8099 4.56004 16.1699 6.98004 14.5599C9.73004 12.7199 14.24 12.7199 16.99 14.5599"
                            stroke="#323232"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <br />
                  <div className="mt-5">
                    <ScrollMenu scrollContainerClassName="scroll-and-hidden pl-2">
                      {preparationProcess?.listWaitingOrders?.map(
                        (order: Order, index: number) => (
                           <div
                            key={index}
                            style={{ width: 275, marginRight: 16 }}
                          >
                            <PreparationCommandBox
                              removePauseIcon={true}
                              order={order}
                              handleClick={() => handleOrderClicked(order)}
                            />
                          </div> 
                        )
                      )}
                    </ScrollMenu>
                    {/* <pre>
                      {JSON.stringify(preparationProcess.listWaitingOrders, null, 4)}
                    </pre> */}
                  </div>
                  {/*<div className="list-command-container" style={{marginTop:66, marginLeft:16}}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="text-disabled">
                                        <span className="f-12 float-start">21:17</span>
                                        <span className="float-end" style={{marginTop:-22}}>
                                            <span className="f-12 fw-3">00:02??? 37??? </span>
                                            <IconTimer width={48} height={48} styleIcon={{width:32}} classIcon="mt-3"/>
                                        </span>
                                    </div>
                                    <div style={{display:"inline-block", width:215, marginTop:-30}}>
                                    <span className="float-start">
                                        <svg style={{width:20}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.5502 16.875C23.5502 17.025 23.5502 17.1 23.4752 17.175C23.4002 17.25 23.4002 17.325 23.3252 17.4L23.2502 17.475H23.1752L20.7002 18.375H20.6252H3.3002H3.2252L0.825195 17.475C0.750195 17.4 0.600195 17.25 0.525195 17.1C0.525195 17.025 0.450195 16.95 0.450195 16.8C0.450195 16.725 0.450195 16.65 0.450195 16.575C0.450195 16.5 0.525195 16.425 0.525195 16.425L0.600195 16.35C0.750195 16.275 0.825195 16.2 0.900195 16.2C0.900195 16.2 0.975195 16.2 1.0502 16.2H1.1252L3.3002 17.1H20.5502L22.9502 16.275C22.9502 16.275 23.0252 16.275 23.1002 16.35C23.1002 16.35 23.1752 16.425 23.2502 16.5C23.3252 16.575 23.3252 16.65 23.3252 16.725C23.4752 16.725 23.5502 16.8 23.5502 16.875Z" fill="#323232" stroke="#323232" strokeWidth="0.75" strokeMiterlimit="10"/>
                                            <path d="M13.2746 4.65L12.6746 4.575V2.55C12.6746 2.325 12.5996 2.25 12.4496 2.1C12.4496 2.025 12.2996 2.025 12.2246 1.95C12.1496 1.875 11.9996 1.875 11.9996 1.875C11.7746 1.875 11.6996 1.95 11.5496 2.1C11.4746 2.1 11.4746 2.25 11.3996 2.325C11.3246 2.4 11.3246 2.55 11.3246 2.55V4.5L10.7246 4.575C6.07461 5.175 2.47461 9.3 2.47461 14.175C2.47461 14.4 2.54961 14.55 2.69961 14.625C2.84961 14.775 2.99961 14.85 3.14961 14.775H20.9246C21.1496 14.775 21.2996 14.7 21.3746 14.55C21.5246 14.4 21.5246 14.25 21.5246 14.1C21.5246 9.3 17.9246 5.25 13.2746 4.65ZM4.04961 13.5L4.19961 12.75C4.57461 10.8 5.54961 9.15 6.89961 7.875C8.24961 6.6 9.97461 5.85 11.9996 5.85C14.0246 5.85 15.7496 6.675 17.0996 7.875C18.4496 9.15 19.4246 10.875 19.7996 12.75L19.9496 13.575H4.04961V13.5Z" fill="#323232" stroke="#323232" strokeWidth="0.75" strokeMiterlimit="10"/>
                                        </svg>
                                        <span> 20</span>
                                    </span>
                                        <span className="float-end">
                                        <span className="f-12">Table </span>
                                        <span className="fw-5">458</span>
                                    </span>
                                    </div>
                                </div>
                                <div className="col-12 row" style={{marginTop:21, marginLeft:15}}>
                                    <div className="col-6">
                                                <div className="row fw-5 mb-3" >
                                                    <span className="col-1">2</span>
                                                    <span className="col-10 fw-5" style={{marginLeft:5}}>
                                                    Croque Monsieur</span>
                                                </div>
                                                <div className="row fw-5 mb-3" >
                                                    <span className="col-1">1</span>
                                                    <span className="col-10 fw-5" style={{marginLeft:5}}>
                                                    Planche ?? partager</span>
                                                </div>
                                                <div className="row fw-5 mb-3" >
                                                    <span className="col-1">1</span>
                                                    <span className="col-10 fw-5" style={{marginLeft:5}}>
                                            Salade Lyonnaise
                                        </span>
                                                </div>
                                                <div className="row fw-5 mb-3" >
                                                    <span className="col-1">1</span>
                                                    <span className="col-10 fw-5" style={{marginLeft:5}}>
                                            Gaspacho
                                        </span>
                                                </div>
                                        <div className="row fw-5 mb-3" >
                                                    <span className="col-1">2</span>
                                                    <span className="col-10 fw-5" style={{marginLeft:5}}>
                                                    Croque Monsieur</span>
                                                </div>
                                                <div className="row fw-5 mb-3" >
                                                    <span className="col-1">1</span>
                                                    <span className="col-10 fw-5" style={{marginLeft:5}}>
                                                    Planche ?? partager</span>
                                                </div>
                                                <div className="row fw-5 mb-3" >
                                                    <span className="col-1">1</span>
                                                    <span className="col-10 fw-5" style={{marginLeft:5}}>
                                            Salade Lyonnaise
                                        </span>
                                                </div>
                                                <div className="row fw-5 mb-3" >
                                                    <span className="col-1">1</span>
                                                    <span className="col-10 fw-5" style={{marginLeft:5}}>
                                            Gaspacho
                                        </span>
                                                </div>
                                    </div>
                                    <div className="col-1" style={{borderLeft:'0.5px solid #323232', height:66}}></div>
                                    <div className="col-5">
                                        <div className="row fw-5 mb-3" >
                                            <span className="col-1">2</span>
                                            <span className="col-10 fw-5" style={{marginLeft:5}}>
                                                    Croque Monsieur</span>
                                        </div>
                                        <div className="row fw-5 mb-3" >
                                            <span className="col-1">1</span>
                                            <span className="col-10 fw-5" style={{marginLeft:5}}>
                                                    Planche ?? partager</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                </div>
              </div>
            </>
          </PullToRefresh>
        </div>

        {isModalOpened.state && isModalOpened.modalToOpen}
      </div>
    </>
  );
}
export default Preparation_Home;

import React, {useContext, useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import PreparationCommandBox from "./PreparationCommandBox";
import IconArrowDown from "../../globals/icons-components/IconArrowDown";
import {screenHeight} from "./Preparation_Top";
import {Order, PreparationProcessModel} from "../../globals/models/models";
import {preparationContext} from "./PreparationContainer";
import {getAdminProcessValues} from "../../globals/GlobalVariables";

type PropsType = {
    handleCloseModal: any ;
}

function PreparationAllOrdersModal(props:PropsType) {
    const {preparationProcess, setPreparationProcess} = useContext<{preparationProcess:PreparationProcessModel, setPreparationProcess: any}>(preparationContext) ;


    return (
        <div className="container_popup">
            <div className="popup" style={{width:335}}>
                <button className="back-btn-modal text-center" style={{ marginTop: -5}}
                        onClick={props.handleCloseModal}>
                    <IconArrowLeft width={32} height={32} styleIcon={{marginLeft: 9,marginTop: 9}}/>
                </button>
                <br/><br/><br/>
                <p className="text-black mb-0"><span className="text-orange">{getAdminProcessValues("userLogged")?.firstName || "hâpy"}</span> {getAdminProcessValues("userLogged")?.lastName || "hâpy"}</p>
                <h1 className="text-black f-32 fw-6 mt-0">{getAdminProcessValues("userLogged")?.position}</h1>
                <div className="text-center mt-4 mb-4">
                    <svg width="32"  height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div>
                    {preparationProcess?.listFinishedOrders?.map((order:Order, index:number) => (
                        <PreparationCommandBox order={order} handleClick={null} removePauseIcon={true}/>
                    ) )}
                </div>
                {/*<div style={{marginBottom:(screenHeight-650)/2}}
                    className="text-center fixed-bottom">
                    <IconArrowDown/>
                </div>*/}
            </div>
        </div>
    )
}
export default PreparationAllOrdersModal

import React, {useContext, useEffect} from 'react';
import {ICONS} from "../../globals/Icons-svg";
import {Coupon, Order, PreparationProcessModel} from "../../globals/models/models";
import {useTimer} from "react-timer-and-stopwatch";
import {preparationContext} from "./PreparationContainer";
import {timerReducer} from "react-timer-and-stopwatch/dist/reducers/timer-reducer";

type PropsType = {
    handleClick?:any ;
    borderOrange?: boolean ;
    removePauseIcon?: boolean ;
    order: Order ;

}

function PreparationCommandBox(props:PropsType) {
    const {preparationProcess, setPreparationProcess} = useContext<{preparationProcess:PreparationProcessModel, setPreparationProcess: any}>(preparationContext) ;
    // let order:Order = {...props.order} ;
    const timer = useTimer({
        create: {
            stopwatch: {startAtMilliseconds:props.order.millisecondePastSinceStart || 0}
        },
        includeMilliseconds: false,
        intervalRate: 1000,
        callbacks: {
            onTick: () => {
                // console.log(timer.timeElapsed) ;
                // preparationProcess.orderWaintingMilliseconde[props.order.id] = timer.timeElapsed ;
            }
        }
    });

    useEffect(() => {
        // console.log(timer.timerText) ;
    }, [timer]) ;

    const handlePauseAndResume = () => {

    } ;

    return (
        <>
            <div className="current-command-container" style={{cursor:"pointer", border: props.borderOrange ? "2px solid #F7B927" : ""}} onClick={props.handleClick}>
                <div className="text-disabled row">
                    <div className="f-12 col-3 mt-2">{props.order.startTime}</div>
                    <div className="col-9 text-end">
                        {/*<span className="f-8">00:03’ 65”</span>*/}
                        <span className="f-8">{timer.timerText}</span>
                        {/*<span className="f-12">/ 00:02’ 37” {ICONS.timer16Disabled}*/}
                        <span className="f-12">/ 00:00:00 {ICONS.timer16Disabled}
                        {/*<IconTimer width={48} height={48} styleIcon={{width:32}} classIcon="mt-3"/>*/}
                         </span>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-5 col-md-5">
                        <svg style={{width:20}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.5502 16.875C23.5502 17.025 23.5502 17.1 23.4752 17.175C23.4002 17.25 23.4002 17.325 23.3252 17.4L23.2502 17.475H23.1752L20.7002 18.375H20.6252H3.3002H3.2252L0.825195 17.475C0.750195 17.4 0.600195 17.25 0.525195 17.1C0.525195 17.025 0.450195 16.95 0.450195 16.8C0.450195 16.725 0.450195 16.65 0.450195 16.575C0.450195 16.5 0.525195 16.425 0.525195 16.425L0.600195 16.35C0.750195 16.275 0.825195 16.2 0.900195 16.2C0.900195 16.2 0.975195 16.2 1.0502 16.2H1.1252L3.3002 17.1H20.5502L22.9502 16.275C22.9502 16.275 23.0252 16.275 23.1002 16.35C23.1002 16.35 23.1752 16.425 23.2502 16.5C23.3252 16.575 23.3252 16.65 23.3252 16.725C23.4752 16.725 23.5502 16.8 23.5502 16.875Z" fill="#323232" stroke="#323232" strokeWidth="0.75" strokeMiterlimit="10"/>
                            <path d="M13.2746 4.65L12.6746 4.575V2.55C12.6746 2.325 12.5996 2.25 12.4496 2.1C12.4496 2.025 12.2996 2.025 12.2246 1.95C12.1496 1.875 11.9996 1.875 11.9996 1.875C11.7746 1.875 11.6996 1.95 11.5496 2.1C11.4746 2.1 11.4746 2.25 11.3996 2.325C11.3246 2.4 11.3246 2.55 11.3246 2.55V4.5L10.7246 4.575C6.07461 5.175 2.47461 9.3 2.47461 14.175C2.47461 14.4 2.54961 14.55 2.69961 14.625C2.84961 14.775 2.99961 14.85 3.14961 14.775H20.9246C21.1496 14.775 21.2996 14.7 21.3746 14.55C21.5246 14.4 21.5246 14.25 21.5246 14.1C21.5246 9.3 17.9246 5.25 13.2746 4.65ZM4.04961 13.5L4.19961 12.75C4.57461 10.8 5.54961 9.15 6.89961 7.875C8.24961 6.6 9.97461 5.85 11.9996 5.85C14.0246 5.85 15.7496 6.675 17.0996 7.875C18.4496 9.15 19.4246 10.875 19.7996 12.75L19.9496 13.575H4.04961V13.5Z" fill="#323232" stroke="#323232" strokeWidth="0.75" strokeMiterlimit="10"/>
                        </svg>
                        <span> {props.order.coupons.length}</span>
                    </div>
                        <div className="col-lg-3 col-md-3">
                    {!props.removePauseIcon && (
                            <svg style={{marginTop:-6}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 8V13" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 2H15" stroke="#323232" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 17V21" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 17V21" stroke="#323232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                    )}
                        </div>
                    <div className="col-lg-4 col-md-4 text-end" style={{marginLeft:-5}}>
                        <span className="f-12">Table </span>
                        <span className="fw-5">{props.order.tableNumber}</span>
                    </div>
                </div>
                <br/><br/>
                {props.order.coupons.map((coupon:Coupon, index:number) => (
                    <div key={index} className={coupon.isPregnant ? "row fw-5 mb-3 mt-4" : "row fw-5 mb-3"}>
                        <span className="col-1">1</span>
                        <span className="col-10" style={{marginTop:-24}}>
                        {coupon.isPregnant && (<span className="text-orange" style={{fontSize:12, marginLeft:15}}>Enceinte</span>)}
                        <br/>
                        {coupon.isPregnant ? (
                            <span className="text-orange">
                            <span style={{marginLeft:-10}}>
                                <svg style={{marginTop:-5}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 6V9.33333" stroke="#F9A826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.00028 14.2733H3.96028C1.64695 14.2733 0.680281 12.6199 1.80028 10.5999L3.88028 6.85327L5.84028 3.33327C7.02695 1.19327 8.97361 1.19327 10.1603 3.33327L12.1203 6.85994L14.2003 10.6066C15.3203 12.6266 14.3469 14.2799 12.0403 14.2799H8.00028V14.2733Z" stroke="#F9A826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.99609 11.3333H8.00208" stroke="#F9A826" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </span>
                            <span className="fw-5" style={{marginLeft:10}}>{coupon.productVariant.name}</span>
                        </span>
                        ) : (
                            <span className="fw-5" style={{marginLeft:15}}>{coupon.productVariant.name}</span>
                        )}
                        {coupon.ingredientsModifiablesStates.length > 0 && (
                            <div style={{fontSize:12, marginLeft:15}}>
                                {coupon.ingredientsModifiablesStates.map((elt:string, index) => (
                                    <span key={index}>{elt}<br/></span>
                                ))}
                            </div>
                        )}
                        </span>
                        <br/>
                    </div>
                ))}

                {/*<br/>
                <div className="row fw-5">
                    <span className="col-1">2</span>
                    <span className="col-10 fw-5" style={{marginLeft:10}}>
                        Burchetta Provencale
                    </span>
                </div>*/}
            </div>
        </>
    )
}
export default PreparationCommandBox

import React from 'react' ;
import {IconType} from "../models";

function IconPayTicket(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M26.2498 16.6668C26.2498 14.8268 27.7432 13.3335 29.5832 13.3335V12.0002C29.5832 6.66683 28.2498 5.3335 22.9165 5.3335H9.58317C4.24984 5.3335 2.9165 6.66683 2.9165 12.0002V12.6668C4.7565 12.6668 6.24984 14.1602 6.24984 16.0002C6.24984 17.8402 4.7565 19.3335 2.9165 19.3335V20.0002C2.9165 25.3335 4.24984 26.6668 9.58317 26.6668H22.9165C28.2498 26.6668 29.5832 25.3335 29.5832 20.0002C27.7432 20.0002 26.2498 18.5068 26.2498 16.6668Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5835 5.3335L13.5835 26.6668" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5"/>
        </svg>

    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconPayTicket

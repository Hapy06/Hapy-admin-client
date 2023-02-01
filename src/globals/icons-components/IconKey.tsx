import React from 'react' ;
import {IconType} from "../models";

function IconKey(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M26.3865 20.4058C23.6399 23.1391 19.7065 23.9791 16.2532 22.8991L9.9732 29.1658C9.51987 29.6324 8.62654 29.9124 7.98654 29.8191L5.07987 29.4191C4.11987 29.2858 3.22654 28.3791 3.07987 27.4191L2.67987 24.5124C2.58654 23.8724 2.8932 22.9791 3.3332 22.5258L9.59987 16.2591C8.5332 12.7924 9.35987 8.85911 12.1065 6.12578C16.0399 2.19245 22.4265 2.19245 26.3732 6.12578C30.3199 10.0591 30.3199 16.4724 26.3865 20.4058Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.18652 23.8203L12.2532 26.887" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.333 15.166C20.4376 15.166 21.333 14.2706 21.333 13.166C21.333 12.0614 20.4376 11.166 19.333 11.166C18.2284 11.166 17.333 12.0614 17.333 13.166C17.333 14.2706 18.2284 15.166 19.333 15.166Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

        </svg>
    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconKey

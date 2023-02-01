import React from 'react' ;
import {IconType} from "../models";

function IconReservationSearch(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M10.667 2.66602V6.66602" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.333 2.66602V6.66602" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24.2667 28.5333C26.6231 28.5333 28.5333 26.6231 28.5333 24.2667C28.5333 21.9103 26.6231 20 24.2667 20C21.9102 20 20 21.9103 20 24.2667C20 26.6231 21.9102 28.5333 24.2667 28.5333Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M29.3333 29.3333L28 28" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.66699 12.1191H27.3337" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.8267 29.3327H10.6667C6 29.3327 4 26.666 4 22.666V11.3327C4 7.33268 6 4.66602 10.6667 4.66602H21.3333C26 4.66602 28 7.33268 28 11.3327V17.3327" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.9943 18.2663H16.0063" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.0588 18.2663H11.0707" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.0588 22.2663H11.0707" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path fill={props.fill || "none"}} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconReservationSearch

import React from 'react' ;
import {IconType} from "../models";

function IconReservationAdd(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M10.667 2.66602V6.66602" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.333 2.66602V6.66602" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.66699 12.1191H27.3337" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24.0003 30.6667C26.9458 30.6667 29.3337 28.2789 29.3337 25.3333C29.3337 22.3878 26.9458 20 24.0003 20C21.0548 20 18.667 22.3878 18.667 25.3333C18.667 28.2789 21.0548 30.6667 24.0003 30.6667Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25.987 25.3997H22.0137" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 23.4531V27.4398" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28 11.3327V21.8127C27.0267 20.706 25.6 19.9993 24 19.9993C21.0533 19.9993 18.6667 22.386 18.6667 25.3327C18.6667 26.3327 18.9467 27.2793 19.44 28.0793C19.72 28.5593 20.08 28.986 20.4933 29.3327H10.6667C6 29.3327 4 26.666 4 22.666V11.3327C4 7.33268 6 4.66602 10.6667 4.66602H21.3333C26 4.66602 28 7.33268 28 11.3327Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.9943 18.2663H16.0063" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.0588 18.2663H11.0707" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.0588 22.2663H11.0707" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconReservationAdd

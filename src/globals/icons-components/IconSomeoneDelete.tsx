import React from 'react' ;
import {IconType} from "../models/models";

function IconSomeoneDelete(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M24.5471 24.1191L20.7871 27.8791" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.5471 27.8791L20.7871 24.1191" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.2134 14.4927C16.0801 14.4793 15.9201 14.4793 15.7734 14.4927C12.6001 14.386 10.0801 11.786 10.0801 8.58602C10.0801 5.31935 12.7201 2.66602 16.0001 2.66602C19.2667 2.66602 21.9201 5.31935 21.9201 8.58602C21.9067 11.786 19.3867 14.386 16.2134 14.4927Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.0004 29.0809C13.5737 29.0809 11.1604 28.4676 9.32039 27.2409C6.09372 25.0809 6.09372 21.5609 9.32039 19.4142C12.9871 16.9609 19.0004 16.9609 22.6671 19.4142" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconSomeoneDelete

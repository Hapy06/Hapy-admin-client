import React from 'react' ;
import {IconType} from "../models";

function IconChecked(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 24} height={props.height || 24} viewBox={'0 0 ' + 32 + ' ' + 32}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M16.0003 29.3327C23.3337 29.3327 29.3337 23.3327 29.3337 15.9993C29.3337 8.66602 23.3337 2.66602 16.0003 2.66602C8.66699 2.66602 2.66699 8.66602 2.66699 15.9993C2.66699 23.3327 8.66699 29.3327 16.0003 29.3327Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.333 15.9999L14.1063 19.7732L21.6663 12.2266" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconChecked

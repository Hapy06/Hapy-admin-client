import React from 'react' ;
import {IconType} from "../models";

function IconOrderAdd(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M19.3337 14.1992H12.667" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10.9473V17.6139" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.4268 2.66602H9.57342C6.73342 2.66602 4.42676 4.98602 4.42676 7.81268V26.5993C4.42676 28.9993 6.14676 30.0127 8.25342 28.8527L14.7601 25.2393C15.4534 24.8527 16.5734 24.8527 17.2534 25.2393L23.7601 28.8527C25.8668 30.026 27.5868 29.0127 27.5868 26.5993V7.81268C27.5734 4.98602 25.2668 2.66602 22.4268 2.66602Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconOrderAdd

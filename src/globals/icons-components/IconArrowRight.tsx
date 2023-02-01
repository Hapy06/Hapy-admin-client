import React from 'react' ;
import {IconType} from "../models";

function IconArrowRight(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M11.8799 26.5599L20.5732 17.8666C21.5999 16.8399 21.5999 15.1599 20.5732 14.1333L11.8799 5.43994" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}
export default IconArrowRight

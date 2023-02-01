import React from 'react' ;
import {IconType} from "../models";

function IconCouvert(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>

        </svg>
    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconCouvert

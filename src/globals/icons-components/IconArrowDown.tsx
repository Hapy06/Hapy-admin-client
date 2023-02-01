import React from 'react' ;
import {IconType} from "../models";

function IconArrowDown(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M26.5604 11.9331L17.8671 20.6264C16.8404 21.6531 15.1604 21.6531 14.1338 20.6264L5.44043 11.9331" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )

    /*
    <path stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}
export default IconArrowDown

import React from 'react' ;
import {IconType} from "../models";

function IconCloseSquare(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M12.2266 19.7734L19.7732 12.2267" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.7732 19.7734L12.2266 12.2267" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.0003 29.3333H20.0003C26.667 29.3333 29.3337 26.6666 29.3337 20V12C29.3337 5.33329 26.667 2.66663 20.0003 2.66663H12.0003C5.33366 2.66663 2.66699 5.33329 2.66699 12V20C2.66699 26.6666 5.33366 29.3333 12.0003 29.3333Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconCloseSquare

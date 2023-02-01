import React from 'react' ;
import {IconType} from "../models";

function IconBoisson(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M4.85565 3.90002H4.85565H27.2541H27.2544V4.00002C27.3773 3.99926 27.499 4.02344 27.6109 4.07087C27.7227 4.1183 27.8221 4.18783 27.902 4.27463L4.85565 3.90002ZM4.85565 3.90002C4.71978 3.90002 4.5853 3.92714 4.46125 3.97975C4.33719 4.03236 4.22618 4.10937 4.13602 4.20598C4.04583 4.30262 3.97861 4.41663 3.93941 4.54048C3.9002 4.66434 3.89007 4.79477 3.90981 4.92279C3.90982 4.92281 3.90982 4.92282 3.90982 4.92284L7.35591 27.3307L7.35594 27.3309M4.85565 3.90002L7.35594 27.3309M7.35594 27.3309C7.38942 27.546 7.5047 27.7411 7.67856 27.8816L7.74141 27.8038L7.35594 27.3309ZM26.0259 6.49455L26.0259 6.49441L26.1507 5.69049H5.95832L6.08195 6.49574L6.08195 6.49577L6.98357 12.3563L7.10937 13.174L7.96783 12.9289L7.9681 12.9288C9.16647 12.5903 10.3581 12.4181 11.5093 12.4181C11.5094 12.4181 11.5094 12.4181 11.5094 12.4181V12.5181C13.2421 12.516 14.947 12.9221 16.4649 13.6983L26.0259 6.49455ZM26.0259 6.49455L24.98 13.2993L26.0259 6.49455Z" fill="#323232" stroke={props.stroke || '#323232'} strokeWidth="0.2"/>
        </svg>

    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconBoisson

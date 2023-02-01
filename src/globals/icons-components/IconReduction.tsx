import React from 'react' ;
import {IconType} from "../models";

function IconReduction(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M27.3337 15.0667V9.38676C27.3337 4.01343 26.0803 2.66675 21.0403 2.66675H10.9603C5.92033 2.66675 4.66699 4.01343 4.66699 9.38676V24.4001C4.66699 27.9467 6.61367 28.7868 8.97367 26.2534L8.98698 26.2401C10.0803 25.0801 11.747 25.1734 12.6936 26.4401L14.0403 28.2401" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.667 9.33325H21.3337" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14.6667H20" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24.281 19.6937L19.561 24.4137C19.3744 24.6004 19.201 24.947 19.161 25.2004L18.9077 27.0004C18.8144 27.6537 19.2677 28.1071 19.921 28.0137L21.721 27.7604C21.9744 27.7204 22.3344 27.547 22.5077 27.3604L27.2277 22.6404C28.041 21.8271 28.4277 20.8804 27.2277 19.6804C26.041 18.4937 25.0943 18.8804 24.281 19.6937Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23.5986 20.3738C23.9986 21.8138 25.1186 22.9338 26.5586 23.3338" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconReduction

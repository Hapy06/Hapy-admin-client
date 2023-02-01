import React from 'react' ;
import {IconType} from "../models";

function IconNote(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M29.333 7.99984V11.2265C29.333 13.3332 27.9997 14.6665 25.893 14.6665H21.333V5.3465C21.333 3.8665 22.5463 2.6665 24.0263 2.6665C25.4797 2.67984 26.813 3.2665 27.773 4.2265C28.733 5.19983 29.333 6.53317 29.333 7.99984Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.66699 9.33317V27.9998C2.66699 29.1065 3.92033 29.7332 4.80033 29.0665L7.08033 27.3598C7.61366 26.9598 8.36033 27.0132 8.84033 27.4932L11.0537 29.7198C11.5737 30.2398 12.427 30.2398 12.947 29.7198L15.187 27.4798C15.6537 27.0132 16.4003 26.9598 16.9203 27.3598L19.2003 29.0665C20.0803 29.7198 21.3337 29.0932 21.3337 27.9998V5.33317C21.3337 3.8665 22.5337 2.6665 24.0003 2.6665H9.33366H8.00033C4.00033 2.6665 2.66699 5.05317 2.66699 7.99984V9.33317Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17.3467H16" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12.0132H16" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.99414 17.3335H8.00612" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.99414 12H8.00612" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconNote

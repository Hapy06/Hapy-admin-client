import React from 'react' ;
import {IconType} from "../models";

function IconLose(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M4.22656 9.91992L15.9999 16.7332L27.6932 9.95988" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 28.8132V16.7198" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28.8131 12.2266V19.7733C28.8131 19.84 28.8132 19.8933 28.7998 19.9599C27.8665 19.1466 26.6665 18.6667 25.3332 18.6667C24.0798 18.6667 22.9198 19.1067 21.9998 19.84C20.7732 20.8133 19.9998 22.32 19.9998 24C19.9998 25 20.2798 25.9466 20.7732 26.7466C20.8932 26.96 21.0398 27.16 21.1998 27.3467L18.7598 28.6933C17.2398 29.5467 14.7598 29.5467 13.2398 28.6933L6.11983 24.7466C4.5065 23.8533 3.18652 21.6133 3.18652 19.7733V12.2266C3.18652 10.3866 4.5065 8.14666 6.11983 7.25332L13.2398 3.30663C14.7598 2.45329 17.2398 2.45329 18.7598 3.30663L25.8798 7.25332C27.4932 8.14666 28.8131 10.3866 28.8131 12.2266Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30.6667 24C30.6667 25 30.3867 25.9466 29.8934 26.7466C29.6134 27.2266 29.2533 27.6533 28.84 28C27.9067 28.84 26.68 29.3333 25.3333 29.3333C23.3867 29.3333 21.6933 28.2933 20.7733 26.7466C20.28 25.9466 20 25 20 24C20 22.32 20.7733 20.8133 22 19.84C22.92 19.1066 24.08 18.6666 25.3333 18.6666C28.28 18.6666 30.6667 21.0533 30.6667 24Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26.7593 25.3866L23.9326 22.5732" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26.7329 22.6133L23.9062 25.4266" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>

        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconLose

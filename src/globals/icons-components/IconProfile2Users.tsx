import React from 'react' ;
import {IconType} from "../models";

function IconProfile2Users(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M12.2134 14.4933C12.0801 14.48 11.9201 14.48 11.7734 14.4933C8.60008 14.3866 6.08008 11.7866 6.08008 8.58663C6.08008 5.31996 8.72008 2.66663 12.0001 2.66663C15.2667 2.66663 17.9201 5.31996 17.9201 8.58663C17.9067 11.7866 15.3867 14.3866 12.2134 14.4933Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.8804 5.33337C24.467 5.33337 26.547 7.42671 26.547 10C26.547 12.52 24.547 14.5734 22.0537 14.6667C21.947 14.6534 21.827 14.6534 21.707 14.6667" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.54695 19.4134C2.32029 21.5734 2.32029 25.0934 5.54695 27.24C9.21362 29.6934 15.227 29.6934 18.8936 27.24C22.1203 25.08 22.1203 21.56 18.8936 19.4134C15.2403 16.9734 9.22695 16.9734 5.54695 19.4134Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24.4531 26.6666C25.4131 26.4666 26.3198 26.08 27.0665 25.5066C29.1465 23.9466 29.1465 21.3733 27.0665 19.8133C26.3331 19.2533 25.4398 18.88 24.4931 18.6666" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconProfile2Users

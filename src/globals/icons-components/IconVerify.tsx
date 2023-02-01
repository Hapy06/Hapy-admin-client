import React from 'react' ;
import {IconType} from "../models";

function IconVerify(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M11.1738 16.0001L14.3872 19.2268L20.8272 12.7734" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.3338 3.26578C15.2538 2.47911 16.7605 2.47911 17.6938 3.26578L19.8005 5.07911C20.2005 5.42578 20.9472 5.70578 21.4805 5.70578H23.7472C25.1605 5.70578 26.3205 6.86578 26.3205 8.27911V10.5458C26.3205 11.0658 26.6005 11.8258 26.9472 12.2258L28.7605 14.3324C29.5472 15.2524 29.5472 16.7591 28.7605 17.6924L26.9472 19.7991C26.6005 20.1991 26.3205 20.9458 26.3205 21.4791V23.7458C26.3205 25.1591 25.1605 26.3191 23.7472 26.3191H21.4805C20.9605 26.3191 20.2005 26.5991 19.8005 26.9458L17.6938 28.7591C16.7738 29.5458 15.2672 29.5458 14.3338 28.7591L12.2272 26.9458C11.8272 26.5991 11.0805 26.3191 10.5472 26.3191H8.24049C6.82716 26.3191 5.66716 25.1591 5.66716 23.7458V21.4658C5.66716 20.9458 5.38716 20.1991 5.05383 19.7991L3.25383 17.6791C2.48049 16.7591 2.48049 15.2658 3.25383 14.3458L5.05383 12.2258C5.38716 11.8258 5.66716 11.0791 5.66716 10.5591V8.26578C5.66716 6.85245 6.82716 5.69245 8.24049 5.69245H10.5472C11.0672 5.69245 11.8272 5.41245 12.2272 5.06578L14.3338 3.26578Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}
export default IconVerify

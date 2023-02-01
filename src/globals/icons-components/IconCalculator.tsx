import React from 'react' ;
import {IconType} from "../models";

function IconCalculator(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M13.3333 29.3332H18.6667C25.3333 29.3332 28 26.6665 28 19.9998V11.9998C28 5.33317 25.3333 2.6665 18.6667 2.6665H13.3333C6.66667 2.6665 4 5.33317 4 11.9998V19.9998C4 26.6665 6.66667 29.3332 13.3333 29.3332Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 10.1064V11.4398C22 12.5331 21.1067 13.4398 20 13.4398H12C10.9067 13.4398 10 12.5464 10 11.4398V10.1064C10 9.01311 10.8933 8.10645 12 8.10645H20C21.1067 8.10645 22 8.99978 22 10.1064Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.8482 18.6667H10.8636" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.9937 18.6667H16.0091" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.1392 18.6667H21.1546" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.8482 23.3332H10.8636" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.9937 23.3332H16.0091" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.1392 23.3332H21.1546" stroke={props.stroke || '#323232'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconCalculator

import React from 'react' ;
import {IconType} from "../models/models";

function IconArchive(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + (props.width || 32) + ' ' + (props.height || 32)}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M11.9993 29.3327H19.9993C26.666 29.3327 29.3327 26.666 29.3327 19.9993V11.9993C29.3327 5.33268 26.666 2.66602 19.9993 2.66602H11.9993C5.33268 2.66602 2.66602 5.33268 2.66602 11.9993V19.9993C2.66602 26.666 5.33268 29.3327 11.9993 29.3327Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.66602 17.3336H7.67935C8.69268 17.3336 9.61268 17.907 10.066 18.8136L11.2527 21.2003C11.9993 22.667 13.3327 22.667 13.6527 22.667H18.3594C19.3727 22.667 20.2927 22.0936 20.746 21.187L21.9327 18.8003C22.386 17.8936 23.306 17.3203 24.3193 17.3203H29.306" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.7861 9.33398H18.2261" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.666 13.334H19.3327" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconArchive

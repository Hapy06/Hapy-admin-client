import React from 'react' ;
import {IconType} from "../models";

function IconApple(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path fillRule="evenodd" clipRule="evenodd" d="M20.5334 2.66602C20.8001 4.13268 20.1334 5.59935 19.3334 6.66602C18.5334 7.73268 17.0667 8.66602 15.6001 8.53268C15.3334 7.06602 16.0001 5.73268 16.8001 4.66602C17.7334 3.59935 19.2001 2.79935 20.5334 2.66602ZM24.8001 25.866C25.4667 24.7993 25.8667 24.1327 26.4001 22.9327C22.2667 21.3327 21.6001 15.466 25.7334 13.3327C24.5334 11.7327 22.8001 10.9327 21.0667 10.9327C19.8667 10.9327 19.0667 11.1993 18.2667 11.466C17.6001 11.7327 17.0667 11.866 16.4001 11.866C15.6001 11.866 15.0667 11.5993 14.2667 11.3327C13.4667 11.066 12.6667 10.7993 11.7334 10.7993C9.86672 10.7993 7.86672 11.866 6.66672 13.866C4.93339 16.5327 5.20006 21.7327 8.00006 25.9993C9.20006 27.5993 10.5334 29.3327 12.2667 29.3327C13.0667 29.3327 13.4667 29.066 14.0001 28.9327C14.6667 28.666 15.3334 28.3993 16.4001 28.3993C17.6001 28.3993 18.1334 28.666 18.8001 28.9327C19.3334 29.1993 19.7334 29.3327 20.5334 29.3327C22.4001 29.3327 23.7334 27.3327 24.8001 25.866Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconApple

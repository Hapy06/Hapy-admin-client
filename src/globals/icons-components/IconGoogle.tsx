import React from 'react' ;
import {IconType} from "../models";

function IconGoogle(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M28.8003 13.5993H16.2669V18.5327H23.6003C23.4669 19.7327 22.6669 21.5993 20.9336 22.7993C19.8669 23.5993 18.2669 24.1327 16.2669 24.1327C12.8003 24.1327 9.73359 21.866 8.66693 18.5327C8.40026 17.7327 8.26693 16.7993 8.26693 15.866C8.26693 14.9327 8.40026 13.9993 8.66693 13.1993C8.80026 12.9327 8.80026 12.666 8.93359 12.5327C10.1336 9.73268 12.9336 7.73268 16.2669 7.73268C18.8003 7.73268 20.4003 8.79935 21.4669 9.73268L25.2003 5.99935C22.9336 3.99935 19.8669 2.66602 16.2669 2.66602C11.0669 2.66602 6.53359 5.59935 4.40026 9.99935C3.46693 11.866 2.93359 13.866 2.93359 15.9993C2.93359 18.1327 3.46693 20.1327 4.40026 21.9993C6.53359 26.3993 11.0669 29.3327 16.2669 29.3327C19.8669 29.3327 22.9336 28.1327 25.0669 26.1327C27.6003 23.866 29.0669 20.3993 29.0669 16.266C29.0669 15.1993 28.9336 14.3993 28.8003 13.5993Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconGoogle

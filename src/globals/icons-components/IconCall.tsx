import React from 'react' ;
import {IconType} from "../models";

function IconCall(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M24 25.146H22.9867C21.92 25.146 20.9067 25.5593 20.16 26.306L17.88 28.5593C16.84 29.586 15.1467 29.586 14.1067 28.5593L11.8267 26.306C11.08 25.5593 10.0533 25.146 9 25.146H8C5.78667 25.146 4 23.3727 4 21.186V6.62602C4 4.43935 5.78667 2.66602 8 2.66602H24C26.2133 2.66602 28 4.43935 28 6.62602V21.1727C28 23.3593 26.2133 25.146 24 25.146Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.0934 11.9324C16.0401 11.9324 15.9601 11.9324 15.8934 11.9324C14.4934 11.8791 13.3867 10.7458 13.3867 9.33242C13.3867 7.89242 14.5467 6.73242 15.9867 6.73242C17.4267 6.73242 18.5868 7.90575 18.5868 9.33242C18.6001 10.7458 17.4934 11.8924 16.0934 11.9324Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.3339 15.9458C10.5606 17.1325 10.5606 19.0658 12.3339 20.2525C14.3472 21.5991 17.6539 21.5991 19.6672 20.2525C21.4406 19.0658 21.4406 17.1325 19.6672 15.9458C17.6539 14.6125 14.3606 14.6125 12.3339 15.9458Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconCall

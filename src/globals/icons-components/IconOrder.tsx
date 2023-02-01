import React from 'react' ;
import {IconType} from "../models";

function IconOrder(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M12.333 12.5664C14.7063 13.4331 17.293 13.4331 19.6663 12.5664" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.4268 3.16602H9.57342C6.73342 3.16602 4.42676 5.48602 4.42676 8.31268V27.0993C4.42676 29.4993 6.14676 30.5127 8.25342 29.3527L14.7601 25.7393C15.4534 25.3527 16.5734 25.3527 17.2534 25.7393L23.7601 29.3527C25.8668 30.526 27.5868 29.5127 27.5868 27.0993V8.31268C27.5734 5.48602 25.2668 3.16602 22.4268 3.16602Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.4268 3.16602H9.57342C6.73342 3.16602 4.42676 5.48602 4.42676 8.31268V27.0993C4.42676 29.4993 6.14676 30.5127 8.25342 29.3527L14.7601 25.7393C15.4534 25.3527 16.5734 25.3527 17.2534 25.7393L23.7601 29.3527C25.8668 30.526 27.5868 29.5127 27.5868 27.0993V8.31268C27.5734 5.48602 25.2668 3.16602 22.4268 3.16602Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconOrder

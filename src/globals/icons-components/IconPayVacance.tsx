import React from 'react' ;
import {IconType} from "../models";

function IconPayVacance(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M22.66 5.3335H9.32667C4.22001 5.3335 2.79334 6.56016 2.67334 11.3335C5.24667 11.3335 7.32667 13.4268 7.32667 16.0002C7.32667 18.5735 5.24667 20.6535 2.67334 20.6668C2.79334 25.4402 4.22001 26.6668 9.32667 26.6668H22.66C27.9933 26.6668 29.3267 25.3335 29.3267 20.0002V12.0002C29.3267 6.66683 27.9933 5.3335 22.66 5.3335Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.9912 5.3335V10.0002" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.9912 22V26.6667" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.0335 12.4399L20.8602 14.1065C20.9402 14.2665 21.1002 14.3865 21.2735 14.4132L23.1135 14.6799C23.5669 14.7465 23.7535 15.3065 23.4202 15.6265L22.0869 16.9199C21.9535 17.0399 21.9002 17.2265 21.9269 17.4132L22.2469 19.2399C22.3269 19.6932 21.8469 20.0399 21.4469 19.8265L19.8069 18.9599C19.6469 18.8799 19.4469 18.8799 19.2869 18.9599L17.6469 19.8265C17.2335 20.0399 16.7669 19.6932 16.8469 19.2399L17.1669 17.4132C17.1935 17.2265 17.1402 17.0532 17.0069 16.9199L15.6869 15.6265C15.3535 15.3065 15.5402 14.7465 15.9935 14.6799L17.8335 14.4132C18.0202 14.3865 18.1669 14.2799 18.2469 14.1065L19.0602 12.4399C19.2469 12.0265 19.8335 12.0265 20.0335 12.4399Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
    )
    /*

    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconPayVacance

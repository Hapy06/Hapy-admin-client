import React from 'react' ;
import {IconType} from "../models";

function IconVerifyFilled(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 24} height={props.height || 24} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M10.7499 3.406C11.4399 2.816 12.5699 2.816 13.2699 3.406L14.8499 4.766C15.1499 5.026 15.7099 5.236 16.1099 5.236H17.8099C18.8699 5.236 19.7399 6.106 19.7399 7.166V8.866C19.7399 9.256 19.9499 9.826 20.2099 10.126L21.5699 11.706C22.1599 12.396 22.1599 13.526 21.5699 14.226L20.2099 15.806C19.9499 16.106 19.7399 16.666 19.7399 17.066V18.766C19.7399 19.826 18.8699 20.696 17.8099 20.696H16.1099C15.7199 20.696 15.1499 20.906 14.8499 21.166L13.2699 22.526C12.5799 23.116 11.4499 23.116 10.7499 22.526L9.16988 21.166C8.86988 20.906 8.30988 20.696 7.90988 20.696H6.17988C5.11988 20.696 4.24988 19.826 4.24988 18.766V17.056C4.24988 16.666 4.03988 16.106 3.78988 15.806L2.43988 14.216C1.85988 13.526 1.85988 12.406 2.43988 11.716L3.78988 10.126C4.03988 9.826 4.24988 9.266 4.24988 8.876V7.156C4.24988 6.096 5.11988 5.226 6.17988 5.226H7.90988C8.29988 5.226 8.86988 5.016 9.16988 4.756L10.7499 3.406Z" fill="#FF6063"/>
                <path d="M8.37988 12.956L10.7899 15.376L15.6199 10.536" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            )
    /*
    <path stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}
export default IconVerifyFilled

import React from 'react' ;

type PropsType = {
    text:string ;
    handleClick: any ;
    btnWith?: number ;
}

function HapyButtonWithoutIcon(props:PropsType) {
    return (
        <>
            <button style={{width:props.btnWith}} className="hapy-btn-without-icon" onClick={props.handleClick}>{props.text}</button>
        </>
    )
}
export default HapyButtonWithoutIcon

import React from 'react' ;

type PropsType = {
    handleClick: any ;
    iconComponent:any ;
    btnWidth?:number;
    btnClass?: string ;
}

function HapyButtonWithIcon_Little(props:PropsType) {
    return (
        <>
            <button className={'hapy-btn-with-icon vertical-center ' + props.btnClass} onClick={props.handleClick} style={{width:props.btnWidth}}>
                <span className="float-start" style={{marginLeft:8, marginRight:8}} >{props.iconComponent}</span>
            </button>
        </>
    )
}
export default HapyButtonWithIcon_Little

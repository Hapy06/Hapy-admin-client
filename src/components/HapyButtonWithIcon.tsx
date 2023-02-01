import React from 'react' ;

type PropsType = {
    text:string ;
    handleClick: any ;
    iconComponent:any ;
    btnWidth?:number;
    btnClass?: string ;
    numberAtEnd?: number | string ;
    numberAtEndColor?: '#FF6063' | '#536DFE' | '#F7B927';
}

function HapyButtonWithIcon(props:PropsType) {
    return (
        <>
            <button className={'hapy-btn-with-icon vertical-center ' + props.btnClass} onClick={props.handleClick} style={{width:props.btnWidth}}>
                <span className="float-start" style={{marginLeft:32, marginRight:32}} >{props.iconComponent}</span>
                <span className="float-start fw-4">{props.text}</span>
                {props.numberAtEnd && (<span className="mr-32" style={{color:props.numberAtEndColor, marginLeft:"auto"}}>{props.numberAtEnd}</span>)}
            </button>
        </>
    )
}
export default HapyButtonWithIcon

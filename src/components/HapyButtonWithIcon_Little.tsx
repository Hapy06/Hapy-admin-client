import React from 'react' ;

type PropsType = {
    handleClick: any ;
    iconComponent:any ;
    btnWidth?:number;
    btnHeight?:number;
    btnClass?: string ;
}

function HapyButtonWithIcon_Little(props:PropsType) {
    return (
        <>
            <button className={'hapy-btn-with-icon vertical-center ' + props.btnClass} onClick={props.handleClick} 
                style={{
                    ...(props.btnWidth && {width: props.btnWidth}),
                    ...(props.btnHeight && {width: props.btnHeight}),
                }}>
                <span style={{marginLeft:'auto', marginRight:'auto'}} >{props.iconComponent}</span>
            </button>
        </>
    )
}
export default HapyButtonWithIcon_Little

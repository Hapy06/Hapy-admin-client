import React from 'react' ;

type PropsType = {
    placeholder?:string ;
    inputName?: string ;
    inputValue: any ;
    handleChange: any ;
    btnWidth?:number;
}

function HapySearch(props: PropsType) {
    return (
        <>
            <input className="hapy-search"
                   name={props.inputName || 'search'}
                   value={props.inputValue}
                   onChange={props.handleChange}
                   style={{width:props.btnWidth}}
                   placeholder={props.placeholder||"Que recherchez-vous ?"}/>
        </>
    )
}
export default HapySearch

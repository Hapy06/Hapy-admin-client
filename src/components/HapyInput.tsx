import React from 'react' ;

type PropsType = {
    label: string ;
    inputName: string ;
    inputType: 'text' | 'number' | 'password' | 'email' ;
    placeholder?: string ;
    inputValue: any ;
    handleChange: any ;
    required?: boolean ;
    inputWidth?: number ;
}

function HapyInput(props:PropsType) {
    return (
        <>
            <label className="fw-5 mb-1" style={{width: props.inputWidth}}>
                <span className="float-start f-16 fw-4" style={{fontSize:'16px', fontWeight:500}}>{props.label}</span>
                { props.required && (<span style={{color: '#536DFE'}} className="float-end f-12 fw-3">Obligatoire</span>) }
            </label>
            <input className="hapy-input pl-4"
                   style={{width: props.inputWidth}}
                   onChange={props.handleChange}
                   name={props.inputName}
                   required={props.required}
                   value={props.inputValue}
                   type={props.inputType}
                   placeholder={props.placeholder || props.label} />
        </>
    )
}
export default HapyInput

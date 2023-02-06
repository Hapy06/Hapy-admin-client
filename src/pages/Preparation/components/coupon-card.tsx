import React from 'react'

const Index = ({index, coupon}) => {
    if(coupon.cookingStation.includes('Cuisine')){
        return (
            <div key={index} className={coupon.isPregnant ? "row fw-5 mb-3 mt-4" : "row fw-5 mb-3"}>
                                <span className="col-1">1</span>
                                <span className="col-10" style={{marginTop:-24}}>
                                {coupon.isPregnant && (<span className="text-orange" style={{fontSize:12, marginLeft:15}}>Enceinte</span>)}
                                <br/>
                                {coupon.isPregnant ? (
                                    <span className="text-orange">
                                    <span style={{marginLeft:-10}}>
                                        <svg style={{marginTop:-5}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 6V9.33333" stroke="#F9A826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.00028 14.2733H3.96028C1.64695 14.2733 0.680281 12.6199 1.80028 10.5999L3.88028 6.85327L5.84028 3.33327C7.02695 1.19327 8.97361 1.19327 10.1603 3.33327L12.1203 6.85994L14.2003 10.6066C15.3203 12.6266 14.3469 14.2799 12.0403 14.2799H8.00028V14.2733Z" stroke="#F9A826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M7.99609 11.3333H8.00208" stroke="#F9A826" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </span>
                                    <span className="fw-5" style={{marginLeft:10}}>{coupon.productVariant.name}</span>
                                </span>
                                ) : (
                                    <span className="fw-5" style={{marginLeft:15}}>{coupon.productVariant.name}</span>
                                )}
                                {coupon.ingredientsModifiablesStates.length > 0 && (
                                    <div style={{fontSize:12, marginLeft:15}}>
                                        {coupon.ingredientsModifiablesStates.map((elt:string, index) => (
                                            <span key={index}>{elt}<br/></span>
                                        ))}
                                    </div>
                                )}
                                </span>
                                <br/>
                            </div>
          )
    }
  
}

export default Index
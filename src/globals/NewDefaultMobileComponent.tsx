import React from 'react' ;
import {useNavigate} from "react-router";
import HapyMobileTop from "../components/HapyMobileTop";
import HapyButtonWithIcon from "../components/HapyButtonWithIcon";
import IconArrowLeft from "./icons-components/IconArrowLeft";

function Client00_Default(props) {
    const navigate = useNavigate();

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={true}
                           subtitleStart="#"
                           subtitleStartClassName="text-blue"
                           subtitleEnd="27"
                           title="Regler la note"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/ticket')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">

            <div className="text-center inner-button-container-validate-btn mt-4">
                <HapyButtonWithIcon text="Retour à votre gestion" handleClick={()=>{navigate('/')}}
                    btnWidth={350}
                    iconComponent={<IconArrowLeft width={32} height={32}/>}/>
            </div>
            </div>
        </>
    )
}
export default Client00_Default

import React, {useEffect, useState} from 'react' ;
import {ICONS} from "../../globals/Icons-svg";
import {useNavigate} from "react-router";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import HapySearch from "../../components/HapySearch";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import HapyMobileTop from "../../components/HapyMobileTop";

function Command02_SubCategory(props) {
    const [searchKey, setSearchKey] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={true}
                           subtitleStart="#"
                           subtitleStartClassName="text-blue"
                           subtitleEnd="27"
                           title="Bières"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/command')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">
                <br/>
                <HapyButtonWithoutIcon text="Fish and chips" handleClick={()=>{navigate('/command/product')}}/>
                <br/> <br/>
                <HapyButtonWithoutIcon text="Truite" handleClick={()=>{}}/>
                <br/> <br/>
                <HapyButtonWithoutIcon text="Carpe" handleClick={()=>{}}/>
                <br/> <br/>
                <HapyButtonWithoutIcon text="Poisson rouge" handleClick={()=>{}}/>
            </div>
        </>
    )
}
export default Command02_SubCategory

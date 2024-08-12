import React from "react";
import'./Info.css'
import info_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Info = () =>{
    return(
        <div className='info'>
            <div className="info-logo">
                <img src={info_logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="info-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="info-social-icon">
                <div className="info-icons-container">
                    <img stc={instagram_icon} alt=""/>
                </div>
                <div className="info-icons-container">
                    <img stc={pintester_icon} alt=""/>
                </div>
                <div className="info-icons-container">
                    <img stc={whatsapp_icon} alt=""/>
                </div>
            </div>
            <div className="info-copyright">
                <hr/>
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </div>
     )
}
export default Info
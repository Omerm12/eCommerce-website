import React from "react"
import './Element.css'
import hand_icon from '../Assets/hand_icon.png'
import element_image from '../Assets/hero_image.png'


const element = () => {
    return (
        <div className='element'>
            <div className="element-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="element-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt=""/>
                    </div>
                    <p>collection</p>
                    <p>for everyone</p>
                </div>
            </div>
            <div className="element-right">
                <img src={element_image} alt="" className="element-image"/> 
            </div>
        </div>
    )
}

export default element
 
import React from 'react'
import './AboutHeader.css'
import bg1 from '../../assets/bg1.png'
import bg2 from '../../assets/bg2.png'
import bg3 from '../../assets/bg3.png'
function AboutHeader() {
  return (
    <div className='AboutHeader'>
        <div className='AboutHeader-desc'>
            <h1>Eat today</h1>
            <h2>Live another day</h2>
            <p>Savor today delights, flourish tomorrow! Relisg flavors, nourish <br />
                joy, and embrance vibrant vitality on your jorney.</p>
            <div className='AboutHeader-buttons'>
                <div className='contact'><button >Contact Us </button></div>
                <div><button>Join Us</button></div>
            </div>
        </div>
        <div className='AboutHeader-image'>          
            <img src={bg1} alt="" className='circles' />
            <img src={bg2} alt=""  className='chicken'/>
            <img src={bg3} alt="" className='veg' />
            
        </div>
      
    </div>
  )
}

export default AboutHeader

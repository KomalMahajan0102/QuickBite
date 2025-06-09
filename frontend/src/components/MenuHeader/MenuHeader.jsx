import React, { useState } from 'react'
import './MenuHeader.css'
import bg9 from '../../assets/bg9.png'
import bg14 from '../../assets/bg14.png'
import bg12 from '../../assets/bg12.png'
function MenuHeader() {
    const [item,setItem]=useState("Kabab");
    
  return (
    <div className='MenuHeader'>
        <div className='MenuHeader-desc'>
            <h5>NOW TAKING ONLINE ORDER</h5>

            
            <div className='m'>
            <h1 className='Kabab'>Kababs</h1>
            <h1 className='Shwarma'>Shwarma</h1>
            
            </div>
            
            
            <p>Restaurant style Yogurt Mint Sauce is delicious dip which is quick and easy to... This is a standard india mint chutney served with poppadyms along with mint and lemon.</p>
            <div className='MenuHeader-buttons'>
                <div className='contact'><button >Contact Us </button></div>
                <div><button>Join Us</button></div>
            </div>
        </div>
        <div className='MenuHeader-image'> 
          <div className='m-img'>
          <img src={bg14} alt="" className='circles shwarma-img' />
          <img src={bg12} alt="" className='circles kabab-img' />
          </div>
         
                  
            
            
            
            
        </div>
        
      
    </div>
  )
}

export default MenuHeader

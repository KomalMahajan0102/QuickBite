import React from 'react'
import './Delivery.css'
import Delivery_Boy from '../../assets/Delivery_Boy.gif'
import deliveryboy from '../../assets/deliveryboy.png'
import coffee from '../../assets/coffee.png'
import leaf from '../../assets/leaf.png'
function Delivery() {
  return (
    <div className='delivery'>
      <div className='delivery-boy'>
        <img src={Delivery_Boy} alt="" className='boy'/>
      </div>
      <div className='delivery-desc'>
        <div className='dots'>
            <div className='dot red-dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
        </div>
        <div className='delevery-desc-leaf'>
          <img src={leaf} alt="" />
        </div>
        <div className='desc'>
        <div className='delivery-desc-d1'>
            <p>Faster Food Delivery service</p>
            <img src={deliveryboy} alt="" />
        </div>
        <h1>Get delivered while it is still hot.</h1>
        <p>Satisfy your craving ASAP! Our sppedy delivery ensures your enjoy mouthwatering meals without the wait.</p>
        <div className='delivery-desc-get-started'>
          GET STARTED
        </div>
        <div className='delevery-desc-coffee'>
          <img src={coffee} alt="" />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Delivery

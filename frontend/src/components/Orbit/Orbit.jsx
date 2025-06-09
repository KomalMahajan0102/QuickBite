import React from 'react'
import './Orbit.css'
import bg4 from '../../assets/bg4.png'
import bg5 from '../../assets/bg5.png'
import bg6 from '../../assets/bg6.png'
import bg7 from '../../assets/bg7.png'
function Orbit() {
    return (
        <div className='orbit'>
            <div id="circle-orbit-container">

                {/* <!-- Circles closest to the central point --> */}

                <img src={bg5} alt="" id="inner-orbit" />


                {/* <!-- Circles second closest to the central point --> */}
                <div id="middle-orbit">

                </div>

                {/* <!-- Circles furthest away to the central point --> */}
                <div id="outer-orbit">

                    {/* <div class="outer-orbit-cirlces"></div> */}
                    <img src={bg4} alt="" className="outer-orbit-cirlce-1" />
                    <img src={bg6} alt="" className="outer-orbit-cirlce-2" />
                    <img src={bg7} alt="" className="outer-orbit-cirlce-3" />
                </div>

            </div>
            <div className='desc'>
                <h4>Our popular restaurants</h4>
                <h1>1000+</h1>
                <h2>Our delicious food</h2>
                <p>Popular restaurants culinary temples, artful flavours connecting, inspiring celebrating lifr, shared moments, cherished menories, cultural icons shaping gastronomy legacy</p>
                <div>
                    <button>Explore Menu</button>
                </div>

            </div>
        </div>

    )
}

export default Orbit

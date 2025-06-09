import React from 'react'
import Header from '../components/Header/Header'
import AboutHeader from '../components/AboutHeader/AboutHeader'
import './About.css'
import Footer from '../components/Footer/Footer'
import Orbit from '../components/Orbit/Orbit'
function About({setShowLogin}) {
  return (
    <div className='about'>      
       <div className="about-header">
       <AboutHeader></AboutHeader>
       </div>
       <Orbit></Orbit>
       <Footer></Footer>
      

      
    </div>
  )
}

export default About

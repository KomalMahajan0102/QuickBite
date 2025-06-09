import React, { useState } from 'react'
import Header from '../components/Header/Header'
import MenuHeader from '../components/MenuHeader/MenuHeader'
import './About.css'
import Footer from '../components/Footer/Footer'
import ExploreMenu from '../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay/FoodDisplay'
function MenuPage({setShowLogin}) {
  const [category, setCategory] = useState("All");
  return (
    <div className='menuPage'>
    
       <div className="menu-header">
       <MenuHeader></MenuHeader>
       </div> 
        <ExploreMenu category={category} setCategory={setCategory}></ExploreMenu>
        <FoodDisplay category={category} setCategory={setCategory}></FoodDisplay>
       <Footer></Footer>
    </div>
  )
}

export default MenuPage

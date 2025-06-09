import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ExploreMenu from '../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../components/FoodDisplay/FoodDisplay';
import PopularProduct from '../components/PopularProduct/PopularProduct';
import Delivery from '../components/Delivery/Delivery';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

import foodVideo from '../assets/food.mp4';
import item1 from '../assets/Chicken.png';
import item2 from '../assets/pizza.png';

import './About.css'

const HomePage = ({setShowLogin}) => {


    const [Home] = [
        {
            video: "../../src/assets/food.mp4",
            img: "../../src/assets/Chicken.png",
            img1: "../../src/assets/pizza.png"


        }
    ]

    

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: false,
        });
    }, []);
    const [show, setShow] = useState(false);


    const [show1, setShow1] = useState(false);


    


    return (
        <>
            <div className='homepage' >
            <div className='header'>                   
                    <div id='home '>
                        <div className="video-container container-fluid">
                            <video className="video-bg" src={foodVideo} autoPlay loop muted playsInline></video>
                        </div>
                        <div className={`container-fluid ${show1 ? 'blur' : ''}`}>
                            <div className={`container-fluid ${show ? 'blur' : ''}`}>
                                <div className="container fd-content">
                                    <div className=" row  d-flex justify-content-around " style={{ textAlign: 'justify' }}>
                                        <div className="col-lg-5 pt-3 pt-sm-0 pb-5 fd-content col-12 text-center order-md-1 order-2 text-white desc">
                                            <h2 className='fw-bolder'> We believe Good food</h2>
                                            <h2 className='fw-bolder'> Offers Great smile <i className="icn fas fa-smile-wink "></i></h2>
                                            <p >
                                                " Get ready to nestle into a world of flavor with FoodNest's scrumptious non-veg dishes, crafted to satisfy your cravings !!"
                                                Your one-stop destination for succulent non-veg food that will leave you wanting more, every time !"
                                            </p><br></br>
                                            <div className=' text-center'>
                                                <a href="/menu">
                                                <button className="fd-btn border-0 text-white">Order Now</button>
                                                </a>
                                            </div>


                                        </div>

                                        <div className="col-lg-3 col-10 pt-md-5 mt-md-5 mt-lg-5 mt-xl-1 order-md-2 order-1 pizza-chicken">
                                            <img className='img-fluid fd-rotate d-block d-md-none d-lg-block' src={item1} alt="" />
                                            <img className="img-fluid fd-img d-block d-md-none d-lg-block" src={item2} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PopularProduct></PopularProduct>
                <Delivery></Delivery>
                <Footer></Footer>
            </div>
            
        </>
    )
}

export default HomePage;

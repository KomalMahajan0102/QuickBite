import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import { StoreContext } from '../../context/StoreContext';
import bag_icon from "./bag_icon.png";
import profile_icon2 from "./profile_icon2.png";
import logout_icon from "./logout_icon.png";

function Header({ setShowLogin }) {
    const { token, setToken } = useContext(StoreContext);
    const [menu, setMenu] = useState("home");
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");

        navigate("/");
    }
    const navigate = useNavigate();
    return (
        <div className="container-fluid fd-nav " >
            <Navbar collapseOnSelect expand="lg" className="">
                <Container>
                    <Navbar.Brand className='fw-bolder b-name'>  CSK QUICKBITE    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className='border-0'>
                        <FontAwesomeIcon className='text-white fw-bolder' icon={faHamburger} size="lg" />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav" className='border-0'>
                        <Nav className="justify-content-center flex-grow-1 navlink">


                            <Link onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""} to="/"> Home</Link>
                            <Link onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""} to="/menu">Menu</Link>
                            {/* <Link onClick={() => setMenu("blog")} className={menu === "blog" ? "active" : ""} to="#blog">Blog</Link>
                            <Link  onClick={() => setMenu("review")} className={menu === "review" ? "active" : ""} to="#review">Review</Link> */}
                            <Link onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""} to="/about">About</Link>

                        </Nav>
                        <Nav className='d-flex'>
                            <a href="https://pairup-csk-quickbite.onrender.com">
                                <button className="cookai-gradient" >PairUp</button>
                            </a>

                            <Link to="/cart"><i className="bi bi-cart-plus-fill text-white fw-bolder cart-icon"></i></Link>


                            {!token ?
                                <button className='Sign-in' onClick={() => { setShowLogin(true) }}>Sign in</button>
                                :
                                <div className="navbar-profile">
                                    <img className='profile-img' src={profile_icon2} alt="" />
                                    <ul className="nav-profile-dropdown">
                                        <li onClick={() => { navigate("/myorders") }} ><img src={bag_icon} alt="" /><p>Orders</p></li>
                                        <hr />
                                        <li onClick={logout}><img src={logout_icon} alt="" /><p>Logout</p></li>
                                    </ul>
                                </div>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>
    )
}

export default Header

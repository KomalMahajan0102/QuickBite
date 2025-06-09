import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import './Footer.css'
function Footer() {
    return (
        <div className='footer'>
            <div className='logo'>
                <div className="brand-name">CSK QUICKBITE</div>
                <div className='icons'>
                    <FaFacebookF />
                    <FaTwitter />
                    <FaSquareInstagram />
                    <FaLinkedin />

                </div>

            </div>

            <div className='footer-desc'>
                <div className="contact">
                    <p>
                        <IoLocationSharp />
                       
                            7P24+g56 katraj, Pune 411005
                       
                    </p>
                    <p>
                        <MdEmail />
                        cskquikebite0102@gmail.com
                    </p>
                    <p>
                        <FaMobileAlt />
                        0987388487
                    </p>
                </div>
                <div className="support">
                    <p>faq</p>
                    <p>Shipping & returns</p>
                    <p>Contact Us</p>
                    <p>Our Partners</p>
                </div>
                <div className="info">
                    <p>About Us</p>
                    <p>Our Stores</p>
                    <p>Size Guide</p>
                    <p>Our Piercing Services</p>

                </div>

            </div>
        </div>
    )
}

export default Footer

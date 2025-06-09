import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header/Header";
import { food_list } from "../../assets/assets";

const PlaceOrder = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const verifyOrder=async()=>{
        navigate("/myorders");
    }

    const { getTotalCartAmount, token, food_list, cartItems, url } =
        useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 20,
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            alert("Successful");
            try{
                console.log(response.data);
            const {keyId,amount,currency,razorpayOrderId}=response.data;
            
            // Open Razorpay Checkout
            const options = {
                key: keyId, // Replace with your Razorpay key_id
                amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: currency,
                name: 'CSK QuickBite',               
                order_id: razorpayOrderId, // This is the order_id created in the backend 
                prefill: {
                    name: `Komal Mahajan`,
                    email:'Komal@gmail.com',
                    contact: '1234567899',
                },             
                theme: {
                    color: '#F37254'
                },
                handler:verifyOrder,
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
            }
            catch(error){
                console.log(error);
            }
        }
        else {
            alert("Error");
        }

    }
    useEffect(()=>{
        if(!token){
          toast.error("Please Login first")
          navigate("/cart")
        }
        else if(getTotalCartAmount()===0){
          toast.error("Please Add Items to Cart");
          navigate("/cart")
        }
      },[token])



    return (
        <div>

            <div className="placeorder-main">
                <form onSubmit={placeOrder} className="place-order" >
                    <div className="place-order-left">
                        <p className="title">Delivery Information</p>
                        <div className="multi-fields">
                            <input
                                required
                                name="firstName"
                                value={data.firstName}
                                onChange={onChangeHandler}
                                type="text"
                                placeholder="First name"
                            />
                            <input
                                required
                                name="lastName"
                                value={data.lastName}
                                onChange={onChangeHandler}
                                type="text"
                                placeholder="Last name"
                            />
                        </div>
                        <input
                            required
                            name="email"
                            value={data.email}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Email Address"
                        />
                        <input
                            required
                            name="street"
                            value={data.street}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Street"
                        />
                        <div className="multi-fields">
                            <input
                                required
                                name="city"
                                value={data.city}
                                onChange={onChangeHandler}
                                type="text"
                                placeholder="City"
                            />
                            <input
                                required
                                name="state"
                                value={data.state}
                                onChange={onChangeHandler}
                                type="text"
                                placeholder="State"
                            />
                        </div>
                        <div className="multi-fields">
                            <input
                                required
                                name="zipcode"
                                value={data.zipcode}
                                onChange={onChangeHandler}
                                type="text"
                                placeholder="Zip Code"
                            />
                            <input
                                required
                                name="country"
                                value={data.country}
                                onChange={onChangeHandler}
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                        <input
                            required
                            name="phone"
                            value={data.phone}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Phone"
                        />
                    </div>
                    <div className="place-order-right">
                        <div className="cart-total">
                            <h2>Cart Totals</h2>
                            <div>
                                <div className="cart-total-details">
                                    <p>Subtotals</p>
                                    <p>₹{getTotalCartAmount()}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <b>Total</b>
                                    <b>
                                        ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
                                    </b>
                                </div>
                            </div>
                            <button type="submit" >PROCEED TO PAYMENT</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlaceOrder;
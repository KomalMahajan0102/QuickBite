import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({url}) => {
  
  const [image,setImage]=useState(false);
  const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"Chicken Noodles"
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(()=>{
    console.log(data)
  },[data])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response= await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
        setData({
            name:"",
            description:"",
            price:"",
            category:"Chicken Noodles"
        })
        setImage(false);
        toast.success(response.data.message);

    }
    else{
        toast.error(response.data.message)

    }
}
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className='add-product-name flex-col'>
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col" >
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required id=""></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" id="">
                        <option value="Chicken Noodles">Chicken Noodles</option>
                        <option value="Chicken Rice">Chicken Rice</option>
                        <option value="Chicken Soup">Chicken Soup</option>
                        <option value="Chicken Starter">Chicken Starter</option>
                        <option value="Egg Rice">Egg Rice</option>
                        <option value="Paneer Rice">Paneer Rice</option>
                        <option value="Paneer Starter">Paneer Starter</option>
                        <option value="Paneer Noodles">Paneer Noodles</option>
                        <option value="Shawarma in Plate">Shawarma in Plate</option>
                        <option value="Veg Noodles">Veg Noodles</option>
                        <option value="Veg Rice">Veg Rice</option>
                        <option value="Veg Roll">Veg Roll</option>
                        <option value="Veg Soup">Veg Soup</option>
                        <option value="Veg Starter">Veg Starter</option>
                        


                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='₹20'/>
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add

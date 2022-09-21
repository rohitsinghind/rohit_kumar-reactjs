import React,{useState, useEffect} from 'react'
import axios from 'axios';

import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvaGl0c2luZ2hpbmQyMkBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vcm9oaXRzaW5naGluZCIsImlhdCI6MTY2MzYzNjM2NiwiZXhwIjoxNjY0MDY4MzY2fQ.VLuMKciDczi7jXwE9jYRB94Ch0-R5yVkfRQosMt3m5c"

export default function CreatePage() {

  const [product, setProduct] = useState({Name :"", Price :"", Description :"", Avatar :"",DeveloperEmail :""})

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("");

  const [alert, setAlert] = useState(false)
  const [alertTxt, setAlertTxt] = useState("")

  const handleChange = (key) => {
    key.preventDefault();
    setProduct({ ...product, [key.target.id]: key.target.value });
  };

  const handleChange2 = (event) => {
    setCategory(event.target.value);
  };

   // Get categories
   const getCategories = async () => {
  
    try {
      const response = await axios.get(`/categories`,
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    );
    setCategories(response?.data?.categories);
    } catch (error) {
      console.error(error);
    }
  };

  // add product
  const addProduct = async () => {
  
    try {
      const response = await axios.post(`/products`,
      {
        Name: product.Name, 
        Price: product.Price ,
        Category: category,
        Description: product.Description,
        Avatar: product.Avatar,
        DeveloperEmail: product.DeveloperEmail
      },
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    );
    setAlertTxt(response?.data?.message);
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  

  return (
    <>
    
      <Container maxWidth="xl" sx={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",pt:"20px"}}>
      {alert?
     <Alert severity="info">{alertTxt}</Alert>:<div style={{height:"48.02px"}}></div>}
        <Typography sx={{mt:"50px"}} gutterBottom variant="h5" component="div">Create Product</Typography>
        <TextField id="Name" sx={{my:"10px", width:"35%"}} label="Name" variant="outlined" value={product.Name || ""} onChange={handleChange}/>

        <TextField type="number" id="Price" sx={{my:"10px", width:"35%"}} label="Price" variant="outlined" value={product.Price || ""} onChange={handleChange}/>

        <TextField id="Category" select sx={{my:"10px", width:"35%"}} label="Category" variant="outlined" value={category || ""} onChange={handleChange2}>
        {categories?.map((option) => (
            <MenuItem key={option?._id} value={option?.name}>
              {option?.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField id="Description" sx={{my:"10px", width:"35%"}} multiline={true} label="Description" variant="outlined" value={product.Description || ""} onChange={handleChange}/>

        <TextField id="Avatar" sx={{my:"10px", width:"35%"}} label="Avatar Link" variant="outlined" value={product.Avatar || ""} onChange={handleChange}/>

        <TextField id="DeveloperEmail" sx={{my:"10px", width:"35%"}} label="Developer Email" variant="outlined" value={product.DeveloperEmail || ""} onChange={handleChange}/>

        <Button onClick={()=>{addProduct()}} sx={{my:"10px", width:"35%"}} variant="contained">Submit</Button>
    </Container>
    </>
  )
}

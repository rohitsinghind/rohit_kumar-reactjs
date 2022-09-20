import React,{useState, useEffect} from 'react'
import axios from "axios";

import Product from '../../components/product';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvaGl0c2luZ2hpbmQyMkBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vcm9oaXRzaW5naGluZCIsImlhdCI6MTY2MzYzNjM2NiwiZXhwIjoxNjY0MDY4MzY2fQ.VLuMKciDczi7jXwE9jYRB94Ch0-R5yVkfRQosMt3m5c"

export default function HomePage() {

  const [categories, setCategories] = useState([])

  const [category, setCategory] = useState("Clothing");

  const [products, setProducts] = useState([])

  const handleChange = (event) => {
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


     // Get product
     const getProduct = async () => {
  
      try {
        const response = await axios.get(`/products`,
        {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
      }
      );
      setProducts(response?.data?.products);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      // getCategories();
      getProduct()
    }, []);

    console.log(products)

  return (
    <>
      <Container maxWidth="xl" sx={{background:"red"}}>

    
      <Stack direction="row" spacing={4} sx={{my:"30px"}}>
      <Typography variant="h6" gutterBottom>
        Select Categories
      </Typography>
      <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={category}
          onChange={handleChange}
          sx={{width:"200px"}}
          // helperText="Please select your currency"
        >
          {categories?.map((option) => (
            <MenuItem key={option?._id} value={option?._id}>
              {option?.name}
            </MenuItem>
          ))}
        </TextField>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
        {products.filter(a => a?.category === category).map((e, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Product img={e?.avatar} name={e?.name} id={e?._id} price={e?.price}/>
          </Grid>
        ))}
      </Grid>
    </Box>   


      </Container>
    </>
  )
}

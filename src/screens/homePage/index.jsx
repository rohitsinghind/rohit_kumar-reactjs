import React,{useState, useEffect} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Product from '../../components/product';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvaGl0c2luZ2hpbmQyMkBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vcm9oaXRzaW5naGluZCIsImlhdCI6MTY2MzYzNjM2NiwiZXhwIjoxNjY0MDY4MzY2fQ.VLuMKciDczi7jXwE9jYRB94Ch0-R5yVkfRQosMt3m5c"

export default function HomePage(props) {

  let navigate = useNavigate();

  const [categories, setCategories] = useState([])

  const [category, setCategory] = useState("");

  const [products, setProducts] = useState([])

  const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(false)
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
      setIsLoading(true);
      getCategories();
      getProduct()
    }, []);

  return (
    <>{isLoading?
      <Box sx={{ display: 'flex',justifyContent:"center",alignItems:"center",height:"100vh" }}>
      <CircularProgress/>
    </Box>
      :
      <Container maxWidth="xl">
      <Stack direction="row" spacing={4} sx={{my:"30px", mx:"100px"}}>
      <Typography sx={{mt:"10px"}} variant="h6" gutterBottom>
        Select Categories
      </Typography>
      <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={category}
          onChange={handleChange}
          sx={{width:"200px"}}
        >
          {categories?.map((option) => (
            <MenuItem key={option?._id} value={option?.name}>
              {option?.name}
            </MenuItem>
          ))}
        </TextField>
        {
          (category === "")?"":<Button onClick={()=>{setCategory("")}} variant="text" startIcon={<ClearIcon />}>clear</Button>
        }
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
        {
          (category === "")?
          products.map((e, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Product setProductId={props.setProductId} img={e?.avatar} name={e?.name} id={e?._id} price={e?.price}/>
            </Grid>
          ))
          :
          products.filter(a => a?.category === category).map((e, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Product setProductId={props.setProductId} img={e?.avatar} name={e?.name} id={e?._id} price={e?.price}/>
            </Grid>
          ))
        }
      </Grid>
    </Box>   

    <Fab onClick={()=>{navigate("/addProduct")}} sx={{position:"fixed", bottom:"60px", right:"50px"}} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </Container>
}
    </>
  )
}

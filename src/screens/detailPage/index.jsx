import React,{useState, useEffect} from 'react'
import axios from 'axios';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvaGl0c2luZ2hpbmQyMkBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vcm9oaXRzaW5naGluZCIsImlhdCI6MTY2MzYzNjM2NiwiZXhwIjoxNjY0MDY4MzY2fQ.VLuMKciDczi7jXwE9jYRB94Ch0-R5yVkfRQosMt3m5c"


export default function DetailPage(props) {

  const [product, setProduct] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  // Get product details
  const getProduct = async () => {
  
    try {
      const response = await axios.get(`/products/${props.productId}`,
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    );
    setProduct(response?.data?.product);
    setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getProduct()
  }, []);

  return (
    <>
    {isLoading?
      <Box sx={{ display: 'flex',justifyContent:"center",alignItems:"center",height:"100vh" }}>
      <CircularProgress/>
    </Box>
      :
    <Container maxWidth="xl">
    <Stack direction="row" spacing={4} sx={{my:"30px", mx:"100px", mt:"100px", display:"flex", alignItems:"center",}}>
        <img src={product?.avatar} alt="" style={{maxHeight:"500px",width:"auto", maxWidth:"400px"}}/>
        <div style={{display:"flex",flexDirection:"column", justifyContent:"center",margin:"0px 100px"}}>
        <Typography gutterBottom variant="h5" component="div">
        {product?.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Price : {product?.price}/-
          </Typography>
        </div>
        <Button sx={{height:"50px"}} variant="contained" endIcon={<ShoppingCartIcon/>}>
        Buy 
      </Button>
    </Stack>
    <Divider />
    <Typography sx={{mx:"100px", mt:"40px"}} variant="h6" color="text.secondary">{product?.description}</Typography>
    </Container>
}
    </>
  )
}

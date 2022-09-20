import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Product(props) {
  return (
    <>
    <Card sx={{ maxWidth: 345, height:"350px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250px"
          
          image= {props.img}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price : {props.price}/-
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  )
}

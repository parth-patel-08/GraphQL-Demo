import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader title={product.name} />
      <CardMedia
        component="img"
        height="194"
        image={product.imageUrl}
        alt={`${product.name} image`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="view product">
          <RemoveRedEyeIcon onClick={() => navigate(`/product/${product.id}`)} />
        </IconButton>
        <IconButton aria-label="add to cart">
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ProductCard

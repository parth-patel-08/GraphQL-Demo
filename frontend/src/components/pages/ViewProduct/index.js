import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Button from "@mui/material/Button"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import { GET_PRODUCT } from "../../../graphql/product/queries"
import Spinner from "../../common/Spinner"

function ViewProduct() {
  const { productId } = useParams()

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id: productId,
    },
  })

  if (loading) {
    return <Spinner />
  }
  if (error) {
    throw new Error(error.message)
  }
  const { name, price, description, imageUrl } = data.getProduct

  return (
    <div className="w-3/5 m-2 mx-auto">
      <img src={imageUrl} className="w-full" style={{height: "500px", objectFit: "contain"}} alt={`${name}`}/>
      <p className="mt-2">Name: {name}</p>
      <p>Price: &#8377;{price}</p>
      <p>Description: {description}</p>
      <Button variant="contained" size="small"><ShoppingCartIcon className="mr-2" /> Add To Cart</Button>
    </div>
  )
}

export default ViewProduct

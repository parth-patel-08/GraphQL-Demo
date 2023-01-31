import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "@mui/material"

import ProductCard from "../ProductCard"
import Spinner from "../../../common/Spinner"
import EditProductModal from "../EditProductModal"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../../../../graphql/user/queries"

const Home = () => {
  const [editProductId, setEditProductId] = useState("")
  const { id } = useSelector((state) => state.user)

  const {
    data,
    loading,
  } = useQuery(GET_USER, {
    variables: {
      id,
    },
  })

  const products = data ? data.getUser.products : []

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="p-3">
      <Button onClick={() => setEditProductId("add")} variant="contained">
        Add Product
      </Button>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-5">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            setEditProductId={setEditProductId}
          />
        ))}
      </div>
      <EditProductModal
        isOpen={!!editProductId}
        setIsOpen={setEditProductId}
        product={products.find((product) => product.id === editProductId)}
      />
    </div>
  )
}

export default Home

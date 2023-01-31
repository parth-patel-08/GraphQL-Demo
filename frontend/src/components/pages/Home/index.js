import { useQuery } from '@apollo/client'
import React from 'react'

import { GET_ALL_PRODUCTS } from "../../../graphql/product/queries"
import ProductCard from '../../common/ProductCard'
import Spinner from '../../common/Spinner'


const Home = () => {
    const { data: allProducts, loading } = useQuery(GET_ALL_PRODUCTS, { fetchPolicy: "cache-and-network" })

    if (loading) return <Spinner />

    return (
        <div className='p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-5'>
            {allProducts.getAllProducts.map(product => <ProductCard product={product} key={product.id} />)}
        </div>
    )
}

export default Home

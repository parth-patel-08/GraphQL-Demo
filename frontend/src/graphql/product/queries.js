import { gql } from "@apollo/client"

const PRODUCT_FRAGMENT = gql`
  fragment productFields on Product {
    id
    name
    description
    price
    imageUrl
    user {
      id
      name
    }
  }
`

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      ...productFields
    }
  }
  ${PRODUCT_FRAGMENT}
`

const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllProducts {
      ...productFields
    }
  }
  ${PRODUCT_FRAGMENT}
`

export { GET_PRODUCT, GET_ALL_PRODUCTS }

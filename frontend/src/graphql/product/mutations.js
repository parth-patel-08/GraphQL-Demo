import { gql } from "@apollo/client"

const PRODUCT_FRAGMENT = gql`
  fragment productFields on Product {
    id
    name
    description
    price
    imageUrl
  }
`

const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $description: String!
    $price: Float!
    $imageUrl: String!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      imageUrl: $imageUrl
    ) {
      ...productFields
    }
  }
  ${PRODUCT_FRAGMENT}
`

const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $description: String!
    $price: Float!
    $imageUrl: String!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      imageUrl: $imageUrl
    ) {
      ...productFields
    }
  }
  ${PRODUCT_FRAGMENT}
`

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      ...productFields
    }
  }
  ${PRODUCT_FRAGMENT}
`

export { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT }

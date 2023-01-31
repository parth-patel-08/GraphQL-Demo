import { gql } from "@apollo/client"

const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      phone
      role
      products {
        id
        name
        description
        price
        imageUrl
      }
    }
  }
`

export { GET_USER }

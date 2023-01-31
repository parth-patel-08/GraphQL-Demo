import { gql } from "@apollo/client"

const USER_FRAGMENT = gql`
    fragment userFields on User {
        id
        name
        email
        phone
        role
    }
`

const CREATE_USER = gql`
    mutation createUser($name: String!, $email: String!, $phone: String!, $password: String!, $role: String!) {
        createUser(name: $name, email:$email, phone:$phone, password:$password, role:$role) {
            ...userFields
        }
    }
    ${USER_FRAGMENT}
`

const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $name: String!, $email: String!, $phone: String!, $password: String!, $role: String!) {
        updateUser(id: $id, name: $name, email: $email, phone:$phone, password:$password, role:$role) {
            ...userFields
        }
    }
    ${USER_FRAGMENT}
`

const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            ...userFields
        }
    }
    ${USER_FRAGMENT}
`

const VERIFY_USER = gql`
    mutation verifyUser($email: String!, $password: String!) {
        verifyUser(email: $email, password: $password) {
            token
        }
    }
`

export { CREATE_USER, UPDATE_USER, DELETE_USER, VERIFY_USER }
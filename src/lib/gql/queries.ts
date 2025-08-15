import { gql } from "graphql-request";

export const Loginuser=gql`
query Query($usercred: String!, $password: String!) {
  loginuser(usercred: $usercred, password: $password)
} 
`

export const getusers=gql`
query Getalluser {
  getalluser {
    email
    name
    id
    role
    password
    username
    avatar
  }
} 
`
export const allproducts=gql`

query Getallproducts {
  getallproducts {
    description
    title
    id
    img_url
    price
    stock
    category
  }
}

`
export const getproduct=gql`
query Getproduct($getproductId: String) {
  getproduct(id: $getproductId) {
    description
    id
    img_url
    price
    stock
    title
    category
    sales {
      quantity
      productid
      id
      createdat
    }
  }
}
`

export const logout=gql`
query Query {
  logoutuser
}
`
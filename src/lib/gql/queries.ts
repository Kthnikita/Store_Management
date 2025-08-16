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
export const finduser=gql`
query Searchuser($cred: String) {
  searchuser(cred: $cred) {
    name
    username
  }
}
`
export const filtersearch=gql`
query Searchandfilterprod($sort: String, $title: String, $category: String) {
  searchandfilterprod(sort: $sort, title: $title, category: $category) {
    title
    price
    category
    description
    img_url
    id
    stock
  }
}
`
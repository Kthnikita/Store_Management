import { gql } from "graphql-request";

export const createuser=gql`
mutation Createuser($name: String!, $username: String!, $createuserPassword2: String!, $email: String!, $role: String!) {
  createuser(name: $name, username: $username, password: $createuserPassword2, email: $email, role: $role) {
    id
    name
    username
    email
    role
    avatar
  }
} 
`
export const addnewproduct=gql`
mutation Addproduct($title: String!, $description: String!, $category: String!, $price: Float!, $stock: Int!, $imgUrl: String!) {
  addproduct(title: $title, description: $description, category: $category, price: $price, stock: $stock, img_url: $imgUrl) {
    title
    description
    category
    id
    img_url
    price
    stock
  }
}  
`
export const createsale=gql`
mutation Createsale($createsaleId: String!, $quantity: Int!) {
  createsale(id: $createsaleId, quantity: $quantity)
}

`
export const updateuser=gql`
mutation Updateuserprofile($userid: String, $name: String, $email: String, $username: String, $avatar: String) {
  updateuserprofile(userid: $userid, name: $name, email: $email, username: $username, avatar: $avatar)
}
`

export const Removeuser=gql`
mutation Removeuser($removeuserId: String!) {
  removeuser(id: $removeuserId)
}
`
export const updateprod=gql`
mutation Updateproduct($prodid: String!, $title: String, $stock: Int, $imgUrl: String, $price: Float, $category: String, $description: String) {
  updateproduct(prodid: $prodid, title: $title, stock: $stock, img_url: $imgUrl, price: $price, category: $category, description: $description)
}
`
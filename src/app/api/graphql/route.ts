import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import prismaclient from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/services/jwt";
import { createuser, getalluser, loginuser, logoutuser, removeuser, updateuserprofile, updateuserrole } from "./resolver/user";
import { getuserfromcookies } from "@/helper";
import { addproduct, createsale, getallproducts, getproduct, updateproduct } from "./resolver/product";
import logout from "@/components/userComponents/logout";

const typeDefs = gql`
  type Query {
    loginuser(usercred:String!,password:String!):Boolean
    currentuser:user
    getalluser:[user]
    getallproducts:[product]
    getproduct(id:String):product
   logoutuser:Boolean
  }
    type Mutation{
    createuser(name:String!,username:String!,password:String!,email:String!,role:String!):user
    updateuserrole(userid:String!,role:String!):Boolean
    updateuserprofile(userid:String,name:String,email:String,username:String,avatar:String):Boolean
    addproduct(title:String!,description:String!,category:String!,price:Float!,stock:Int!,img_url:String!):product
    updateproduct(prodid:String!,title:String,description:String,category:String,price:Float,stock:Int,img_url:String):Boolean
    createsale(id:String!,quantity:Int!):Boolean
    removeuser(id:String!):Boolean
    }
    type product{
    id :String 
  title :String
  description :String
  category :String
  price: Float
  stock :Int
  img_url :String
  sales:[sale]
    }
  type sale{
     id :String
  productid :String 
  quantity: Int
  createdat: String
  }
    type user{
    id:String
    name:String
    username:String
    email:String
    password:String
    avatar:String
    role:String
    }
`;

const resolvers = {
  Query: {
    loginuser:loginuser,
    currentuser:getuserfromcookies,
    getalluser:getalluser,
    getallproducts:getallproducts,
    getproduct:getproduct,
  logoutuser:logoutuser
  },
  Mutation:{
    createuser:createuser,
    updateuserrole:updateuserrole,
    updateuserprofile:updateuserprofile,
    addproduct:addproduct,
    createsale:createsale,
    removeuser:removeuser,
    updateproduct:updateproduct
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };
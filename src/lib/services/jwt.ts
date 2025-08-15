import { verify } from "crypto";
import jwt  from "jsonwebtoken";
type payload={
    id:string
}
export  function generateToken(data:payload){
    const token =jwt.sign(data,process.env.SECRET_KEY as string);
    return token;
 }
 export function verifyToken(token:string){
    try{
        const data=jwt.verify(token,process.env.SECRET_KEY as string)
    return data as payload
    }
    catch(e){
        return null
    }
  }
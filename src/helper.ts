import { cookies } from "next/headers";
import { verifyToken } from "./lib/services/jwt";
import prismaclient from "./lib/services/prisma";

export async function getuserfromcookies(){
    const cookie=await cookies();
    const token=cookie.get("token")?.value;
    if(!token)return null;
    const data=verifyToken(token);
    if(!data?.id)return null
    const user=await prismaclient.user.findUnique({
        where:{
            id:data?.id
        }
    })
    if(!user)return null;
    return user
}

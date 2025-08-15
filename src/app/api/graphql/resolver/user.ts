import { getuserfromcookies } from "@/helper";
import { generateToken } from "@/lib/services/jwt";
import prismaclient from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { RoleType } from "../../../../../generated/prisma";

export async function loginuser(x:any,args:{usercred:string,password:string}){
      try{
        const user=await prismaclient.user.findFirst({
        where:{
          OR:[
            {
                email:args.usercred
            },
            {
                username:args.usercred
            }
          ]
        }
      })
      if(!user)return false
      if(user.password==args.password){
       const token = generateToken({id:user.id})
       const cookie=await cookies();
       cookie.set("token",token);
       return true
      }
      }
     catch(e:any){
      return false
     }
    }

    export async function createuser(x:any,args:{name:string,username:string,email:string,password:string}) {
        const user=await getuserfromcookies();
        if(user?.role!="Admin")return null
        try{
            const resp=await prismaclient.user.create({
            data:args
        })
        return resp
        }
        catch(e:any){
            return null
        }
    }

    export async function updateuserrole(X:any,args:{userid:string,role:RoleType}){
           const user=await getuserfromcookies();
           if(user?.role!="Admin")return null
           try{
            const resp=await prismaclient.user.update({
            where:{
                id:args.userid
            },
            data:{
                role:args.role
            }
           }
        )
        return true
           }
           catch(e:any){
            return false;
           }
    }

    export async function updateuserprofile(x:any,args:{userid:string,name:string,email:string,username:string,avatar:string}){
         const user=await getuserfromcookies();
         const datatosave={
            name:args.name,
            username:args.username,
            email:args.email,
            avatar:args.avatar

         }
         if(user?.role!="Admin" && user?.id!=args.userid)return false
        try{
             const resp=await prismaclient.user.update({
            where:{
                id:args.userid
            },
            data:datatosave
         })
         return true
        }
       catch(e:any){
        return false
       }
    }

    export async function getalluser(x:any,args:any){
       try{
         const users=await prismaclient.user.findMany({
             where:{
                role:{
                    not:"Admin"
                }
             }
        })
        return users
       }
       catch(e:any){
        return null
       }
    }
    
    export async function removeuser(x:any,args:any){
        const currentuser=await getuserfromcookies();
        if(!currentuser)return null;
        if(currentuser.role!="Admin")return null;
        try{
            const resp=await prismaclient.user.delete({
                where:{
                    id:args.id
                }
            })
            return true;
        }
        catch(e:any){
            return false;
        }
            
    }

    export async function logoutuser(x:any,args:any) {
        try{
            const cookie=await cookies();
        cookie.delete("token")
        return true
        }
      catch(e:any){
        return false
      }
    }
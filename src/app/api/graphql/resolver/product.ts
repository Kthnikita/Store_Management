import { title } from "process";
import { productCategory } from "../../../../../generated/prisma";
import prismaclient from "@/lib/services/prisma";
import { Description } from "@radix-ui/themes/components/alert-dialog";

export async function addproduct(x:any,args:{title:string,description:string,price:number,stock:number,img_url:string,category:productCategory}){
  try{
    const data=await prismaclient.product.create({
    data:args
  })
  return data
  }
  catch(e:any){
    return null
  }
}

 export async function getallproducts(x:any,args:any){
       try{
         const products=await prismaclient.product.findMany()
        return products
       }
       catch(e:any){
        return null
       }
    }

    export async function getproduct(x:any,args:any){
      try{
        const product=await prismaclient.product.findUnique({
          where:{
            id:args.id
          },
          include:{
            sales:{
              orderBy:{
                createdat:"desc"
              }
            }
          }
        })
        return product
      }
      catch(e:any){
        return null
      }
    }

    export async function createsale(x:any,args:any) {
      const newsale={
        productid:args.id,
        quantity:args.quantity
      }
        try{
          const sale=await prismaclient.sale.create({
            data:newsale
          })
          if(sale){
            await prismaclient.product.update({
              where:{
                id:args.id
              },
              data:{
                stock:{
                  decrement:args.quantity
                }
              }
            })
            return true
          }
        }
        catch(e:any){
          return false
        }
    }

    export async function updateproduct(x:any,args:any){
      const datatoupd={
        title:args.title,
        description :args.description,
        category:args.category,
        price:args.price,
        stock:args.stock,
        img_url:args.img_url
      }
      try{
        const resp=await prismaclient.product.update({
          where:{
            id:args.prodid
          },
          data:datatoupd
        })
        return true
      }
      catch(e:any){
        return false
      }
    }
    
    export async function removeprod(x:any,args:any){
      try{
        const resp=await prismaclient.product.delete({
          where:{
            id:args.id
          }
        })
        return true
      }
      catch(e:any){
        return false
      }
    }

    export async function searchfilter(x:any,args:any){
      try{
        const resp=await prismaclient.product.findMany({
          where:{
            title:{
              contains:args.title
            },
            category:args.category=="others"?undefined:args.category
          },
          orderBy:{
            price:args.sort=="l-h"?'asc':'desc'
          }
        })
        return resp
      }
      catch(e:any){
        return null
      }
    }
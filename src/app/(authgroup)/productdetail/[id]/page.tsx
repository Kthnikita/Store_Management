'use client';
import React, { useEffect, useState } from 'react';
import { product, productCategory, sale } from '../../../../../generated/prisma';
import gqlclient from '@/lib/services/gql';
import { getproduct } from '@/lib/gql/queries';
import Addtosalebtn from '@/components/Addtosalebtn';
import Productsalechart from '@/components/productComponents/productsalechart';
import { DollarSign, Package, Info, BarChart3, Sparkle, Sparkles, Utensils, Cpu, Shirt, Dumbbell, Home, BookOpen, ToyBrick } from 'lucide-react';
import Updateproduct from '@/components/productComponents/UpdateProduct';
import Removeprod from '@/components/productComponents/Removeprod';
import { useRouter } from 'next/navigation';

type prodtype={
   id :string,
  title: string,
  description: string,
  category: productCategory,
  price:number,
  stock :number,
  img_url :string,
  sales :sale[]
}
const categoryIcons:any = {
  beauty: <Sparkles className="w-5 h-5 text-pink-500" />,
  food: <Utensils className="w-5 h-5 text-yellow-600" />,
  electronics: <Cpu className="w-5 h-5 text-blue-500" />,
  clothing: <Shirt className="w-5 h-5 text-purple-500" />,
  furniture: <Home className="w-5 h-5 text-green-600" />,
 
};
function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [product, setProduct] = useState<prodtype | null>(null);
const router=useRouter();
  useEffect(() => {
    async function getProd() {
      const data:{getproduct:prodtype} = await gqlclient.request(getproduct, {
        getproductId: id,
      });
      setProduct(data?.getproduct);
    }
    getProd();
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {product ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-center">
            <img
              src={product.img_url}
              alt={product.title}
              className="rounded-xl max-h-[450px] object-contain"
            />
          </div>

         
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600 leading-relaxed flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
              {product.description}
            </p>

            <div className="flex items-center gap-6 mt-2">
              <p className="text-xl font-semibold text-green-600 flex items-center gap-1">
                <DollarSign className="w-5 h-5" />
                {product.price}
              </p>
              <p className="text-md flex items-center gap-1">
                <Package className="w-5 h-5" />
                Stock: {product.stock}
              </p>
              <p>
                {categoryIcons[product.category] || null}
              </p>
              <Updateproduct prod={product}/>
              <Removeprod id={product.id}/>
            </div>

            <div className="mt-4 flex gap-4">
              <Addtosalebtn product={product} />
              <button onClick={() => router.back()} className='rounded-md p-1.5 border-2 hover:bg-blue-800'>Go back</button>
            </div>
             
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading product...</p>
      )}

   
      {product?.sales && product.sales.length > 0 && (
        <div className="mt-12 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold  flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            Sales Performance
          </h2>
          <div className="h-96 w-full">
            <Productsalechart sale={product.sales} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;

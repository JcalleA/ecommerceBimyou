'use server'

import ProductsGrid from "@/components/products/products-grid/ProductsGrid";
import { SideBar } from "@/components";
import { api } from "../config/wooapi";
import { Checkout } from "@/components/checkout/Checkout"; 
import { Mensaje } from "@/components/mensajes/Mensaje";
import { Footer } from "@/components/ui/footer/Footer";




export default async function Home() {
  
  const products= await fetch(`${process.env.URL}/api/getproducts`)
  const data = await products.json()
  
  const variantesList= await fetch(`${process.env.URL}/api/getvariants`)
  const variantes= await variantesList.json()
  
  
  
  return (
    <div className=" min-h-screen flex-col items-center justify-between ">
      <Mensaje/>
      <ProductsGrid products={data} variantes={variantes}/>
      <SideBar/>
      <Checkout/>
      <Footer/>
    </div>
  )
}


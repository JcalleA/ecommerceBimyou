'use client';

import { Logo1Font, Logo2Font, titleFont } from "@/config/fonts"
import Link from "next/link"
import Image from "next/image"
import { GiShoppingCart } from "react-icons/gi";
import { CartState, useStore } from "@/store";

export const TopMenu = () => {

    const openMenu = useStore(state => state.openMenu)
    const itemsInCart = CartState(state => state.CartItems)
    return (
        <nav className=" justify-center  bg-gradient-radial from-teal-100 to-teal-200 shadow-lg">
            
            <div className=" flex w-full sm:w-[70%] sm:mx-auto items-center  justify-between " >
                <div className="  ">
                    <Link className=" items-center p-1 ml-10 " href="/">
                        <Image className="hover:scale-110" width={"80"} height={"80"} src={'/imgs/Logo1.png'} alt={""}></Image>

                    </Link>
                </div>
                <div>
                    <Link className=" items-center p-1 ml-10 transition-all hover:text-6xl hover:text-rose-500" href="/">
                        <span className={`${Logo2Font.className} antialiased font-bold text-xl `}>BIM</span>
                        <span className="text-4xl"> | </span>
                        <span className={`${Logo1Font.className} antialiased font-bold text-xl`}>YOU</span>
                    </Link>

                </div>

                <div className="relative pr-3">
                    <Link className="flex items-center m-2 mr-3  transition-all hover:scale-150  " 
                    href="/?showmenu=true"
                    
                    >
                        <span className={`${titleFont.className} antialiased font-bold text-lg`}>Carrito</span>
                        <GiShoppingCart className=" w-6 h-6 ml-1 cursor-pointer" 
                        
                        />
                        <span className="absolute text-xl font-bold rounded-full px-2  right-3 -top-5 bg-rose-400">{itemsInCart}</span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}


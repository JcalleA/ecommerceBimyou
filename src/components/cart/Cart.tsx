'use client';


import { Variation } from "@/interfaces";
import { CartState, useStore } from "@/store";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Spinner } from 'theme-ui';
import { MdOutlineFactCheck } from "react-icons/md";
import Link from "next/link";

const initalCheckouttEvent = async (valor: number) => {
    const { default: ReactPixel } = await import("react-facebook-pixel");
    ReactPixel.init(process.env.NEXT_PUBLIC_PIXELID!);
    ReactPixel.track("InitiateCheckout", { currency: "COP", value: valor });
}

export const Cart = () => {

    const [mensajeCart, setmensajeCart] = useState('Carrito Vacio')
    const [Data, setData] = useState<Variation[]>()
    const itemsinCart = CartState(state => state.CartItems)
    const setCartItems = CartState(state => state.setCartItems)
    const cartLoad = CartState(state => state.CartLoad)
    const setCartLoad = CartState(state => state.setCartLoad)
    const [TotalPedido, setTotalPedido] = useState(0)
    const [DescuentoUnitario, setDescuentoUnitario] = useState(0)
    const [Descuento, setDescuento] = useState(0)
    const [Envio, setEnvio] = useState(0)



    useEffect(() => {
        const products = localStorage.getItem('products')!
        if (products) {
            const listaParsed = JSON.parse(products)
            setCartItems(listaParsed.length)
        } else {
            setCartItems(0)
        }
    }, [])

    useEffect(() => {
        const products = localStorage.getItem('products')
        if (products) {
            const listaParsed = JSON.parse(products)
            setData(listaParsed)
            if (listaParsed != undefined && listaParsed.length != 0) {
                setmensajeCart('')
            } else {
                setmensajeCart('Carrito Vacio---')
            }

            let sumaProducts = 0
            for (let index = 0; index < listaParsed.length; index++) {
                const element = listaParsed[index];
                sumaProducts += parseInt(element.regular_price)
            }
            if (listaParsed.length != 0) {
                setDescuentoUnitario(listaParsed[0].regular_price - listaParsed[0].sale_price)

            }
            setTotalPedido(sumaProducts)
        }
    }, [itemsinCart])

    useEffect(() => {

        if (Data?.length != undefined) {

            setCartLoad(false)
            setCartItems(Data.length)
        } else {
            setEnvio(0)

            setCartLoad(false)
        }
    }, [Data])

    const delCartItem = (id: number) => {
        const produts = localStorage.getItem('products')!
        const listaParsed = JSON.parse(produts)
        listaParsed.splice(id, 1)
        localStorage.setItem('products', JSON.stringify(listaParsed))
        setData(listaParsed)
        setCartItems(listaParsed.length)
    }


    useEffect(() => {
        if (Data) {
            const total = Data.length
            if (total >= 1 && total < 3) {
                setDescuento(total * DescuentoUnitario)
                setEnvio(13000)

            }
            if (total >= 3 && total < 6) {
                setDescuento(total * 3000 + (total * DescuentoUnitario))
                setEnvio(0)
            }
            if (total >= 6 && total < 12) {
                setDescuento(total * 6000 + (total * DescuentoUnitario))
                setEnvio(0)
            }
            if (total >= 12) {
                setDescuento(total * 10000 + (total * DescuentoUnitario))
                setEnvio(0)
            }
            if (total === 0) {
                setDescuento(0)
                setEnvio(0)
            }
        }
        else {


        }
    }, [itemsinCart, Data])

    return (
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600  rounded-md ">

            <div className=" mt-11 h-[55vh]  p-2 overflow-hidden rounded-md overflow-y-scroll  shadow-[inset_0_0_7px_0_rgba(0,0,0,0.05)] shadow-black">
                {
                    Data && (
                        Data.map((product: Variation) => (
                            <div className=" border-2 border-rose-300 rounded-md" key={Data.indexOf(product)}>
                                <div className=" text-center m-0 p-0 font-semibold">
                                    <h3>{product.product_Name}</h3>
                                </div>
                                <div  className=" p-0 flex items-center align-middle justify-between -mt-4">
                                    <Image
                                        className=" rounded-lg object-cover"
                                        src={product.image.src}
                                        width={85}
                                        height={85}
                                        alt={""} />
                                    <div>
                                        <span
                                            className=" inline-block align-middle font-bold text-center"
                                        >Talla: {product.attributes[1].option}
                                        </span>
                                        <br></br>
                                        <span
                                            className=" inline-block align-middle font-bold text-center"
                                        >Color: {product.attributes[0].option}
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            className="inline-block line-through text-red-700 align-middle text-center font-bold"
                                        >${new Intl.NumberFormat().format(parseInt(product.regular_price))}
                                        </span>
                                        <br></br>
                                        <span
                                            className="inline-block  text-white bg-green-700 rounded-lg px-2 align-middle text-center font-bold"
                                        >${new Intl.NumberFormat().format((((TotalPedido - Descuento) / Data!.length)))}
                                        </span>
                                    </div>

                                    <IoIosCloseCircle
                                        className="  my-auto w-[10%]  h-full text-rose-300"
                                        onClick={() => {
                                            setCartLoad(true)
                                            delCartItem(Data.indexOf(product))
                                        }}
                                    />
                                </div>
                            </div>

                        ))
                    )
                }

                <div className="flex gap-4">
                    {
                        cartLoad && (
                            <Spinner style={{ color: '#f7cbf7' }} />
                        )
                    }

                </div>
                <h3 className=" text-center text-4xl mt-10 text-slate-50">{mensajeCart}</h3>
            </div>
            {
                Data &&
                (
                    <div className=" ">
                        <div className=" mt-2 flex justify-between pr-3 text-center text-lg font-semibold">
                            <div className=" w-full items-center   text-center text-sm sm:text-lg font-semibold">
                                <table className=" w-[100%] mx-auto mt-2 table-auto text-lg font-semibold ">
                                    <thead className="border-2 border-separate border-spacing-2">
                                        <tr className=" bg-gray-500 ">
                                            <th className="border-2 border-black">Unidad</th>
                                            <th className="border-2 border-black">Valor</th>
                                            <th className="border-2  border-black">Descuento</th>
                                            <th className="border-2 border-black">Envio</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className=" bg-green-400">
                                            <td className="border-2 border-black">{Data!.length}</td>
                                            <td className="border-2 line-through border-black">${new Intl.NumberFormat().format(TotalPedido)}</td>
                                            <td className="border-2 text-red-700 border-black">{
                                                Descuento === 0 && (
                                                    <span>0</span>
                                                )
                                            }
                                                {
                                                    Descuento != undefined && (
                                                        <span>
                                                            $-{new Intl.NumberFormat().format(Descuento)}
                                                        </span>
                                                    )
                                                }</td>
                                            {
                                                Envio === 0 &&
                                                <td className="border-2 border-black">Gratis</td>
                                            }
                                            {
                                                Envio != 0 &&
                                                <td className="border-2 border-rose-300">{Envio}</td>
                                            }

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className=" flex w-full justify-between  mt-1 items-center font-bold h-[20vh]"
                        >
                            <Link
                                className=" w-[60%]"
                                href={"/?showcheck=true"}
                                onClick={() => initalCheckouttEvent(TotalPedido - Descuento + Envio)}>
                                <button
                                    className={
                                        clsx(" flex justify-center border-black shadow-lg shadow-black leading-4  items-center w-full px-2 py-1 bg-rose-300 hover:bg-rose-400 border-2 rounded-full",
                                            { ' hidden': itemsinCart === 0 }
                                        )
                                    }

                                >Compra<br></br> Paga en Casa
                                    <MdOutlineFactCheck
                                        className=" w-7 h-7 text-black ml-2" />
                                </button>
                            </Link>

                            <span
                                className=" text-xl mr-4 bg-green-400  shadow-black border-2 border-black shadow-lg rounded-lg px-2"
                            >Total
                                <br />
                                ${new Intl.NumberFormat().format(TotalPedido - Descuento + Envio)}
                            </span>
                        </div>
                    </div>
                )
            }



        </div>
    )
}

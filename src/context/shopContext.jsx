import React, { useState, useContext, useEffect } from 'react'

export const Context = React.createContext()
export const useCartContext = () => useContext(Context)


const CartContext = ({ defaultValue = [], children }) => {

    const cartLocalStorage = JSON.parse(localStorage.getItem('cart'))

    const [cart, setCart] = useState(cartLocalStorage && cartLocalStorage.length > 0 ? cartLocalStorage : defaultValue)

    cart.totalPrice = cart.length > 0 ? cart.reduce((acc, item) => acc + (item.qty * item.price), 0) : 0

    const methods = {
        addItem(item, qty) {
            const productExist = cart.some(cartItem => cartItem.id === item.id)

            if (productExist) {
                setCart(cart.map(cartItem => {
                    if (cartItem.id === item.id) {
                        return { ...cartItem, qty: cartItem.qty + qty }

                    } else {
                        return cartItem
                    }
                }))
            } else {
                setCart([...cart, { ...item, qty: qty }])
            }
        },


        clearCart() {
            setCart(defaultValue)
        },
        removeItem(id) {
            const productos = cart.map(cartItem => {
                if (cartItem.id === id) {

                    return { ...cartItem, qty: cartItem.qty - 1 }
                } else {
                    return cartItem
                }
            })
            setCart(productos.filter(cartItem => cartItem.qty !== 0))
        }

    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <Context.Provider value={{ cart, ...methods }}>
            {children}
        </Context.Provider>
    )
}

export default CartContext
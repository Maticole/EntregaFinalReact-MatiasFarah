import { Avatar, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState } from 'react'

const CartWidget = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const updatedCart = [...cartItems, product];
        setCartItems(updatedCart);
    };

    const removeFromCart = (productToRemove) => {
        const updatedCart = cartItems.filter(item => item.id !== productToRemove.id);
        setCartItems(updatedCart);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <>
            <Badge count={cartItems.length}>
                <Avatar shape="square" size="large" icon={<ShoppingCartOutlined />} onClick={() => addToCart({ id: 1, name: 'Product 1', price: 10 })} />
            </Badge>
            {/* Aquí podrías mostrar el carrito completo */}
            <div>
                <h2>Carrito de Compras</h2>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price}
                            <button onClick={() => removeFromCart(item)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
                <p>Total: ${calculateTotal()}</p>
            </div>
        </>
    );
};

export default CartWidget;


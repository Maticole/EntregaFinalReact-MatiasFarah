import { Avatar, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState } from 'react'

const CartWidget = () => {

    const [cartItemCount, setCartItemCount] = useState(0);


    const addToCart = () => {
        setCartItemCount(cartItemCount + 1);
    };


    const removeFromCart = () => {
        if (cartItemCount > 0) {
            setCartItemCount(cartItemCount - 1);
        }
    };

    return (
        <>
            <Badge count={cartItemCount}>
                <Avatar shape="square" size="large" icon={<ShoppingCartOutlined />} />
            </Badge>
            <button onClick={addToCart}>Agregar al carrito</button>
            <button onClick={removeFromCart}>Quitar del carrito</button>
        </>
    );
};

export default CartWidget






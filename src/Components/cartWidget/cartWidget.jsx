import { Avatar, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react'
import { useCartContext } from "../../context/shopContext"
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/client";

const CartWidget = () => {
    const { cart, removeItem } = useCartContext()
    const navigate = useNavigate();

    const removeFromCart = (productToRemove) => {
        removeItem(productToRemove.id);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.qty, 0);
    };

    const crearOrdenDeCompra = async () => {
        if (cart.length > 0) {
            const items = cart.map(product => ({ id: product.id, ...product }));
            const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    
            const order = {
                buyer: { name: "Juan", phone: "1165187582", email: "ejemplo@ejemplo.com" },
                items: items,
                total: total
            }
    
            try {
                const orderCollection = collection(db, 'orders');
                const docRef = await addDoc(orderCollection, order);
                console.log("Orden creada con ID:", docRef.id);
                navigate('/itemListContainer/component/checkout', { state: { order } });
            } catch (error) {
                console.error("Error al crear la orden:", error);
            }
        }
    }
    const calcularCarrito = () => {
        return cart.reduce((total, item) => total + item.qty, 0);
    };

    return (
        <>
            <Badge count={calcularCarrito()}>
                <Avatar shape="square" size="large" icon={<ShoppingCartOutlined />} />
            </Badge>

            <div>
                <h2>Carrito de Compras</h2>
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price} - {item.qty} 
                            <button onClick={() => removeFromCart(item)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
                <p>Total: ${calculateTotal()}</p>
            </div>
            <Link onClick={crearOrdenDeCompra}>
                <button>Crear orden</button>
            </Link>
        </>
    );
};

export default CartWidget;


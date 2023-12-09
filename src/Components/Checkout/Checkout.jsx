import React from 'react';

const Checkout = ({ order }) => {

    return (
        <div>

            <h2>Detalles de la Orden</h2>
            {order ? (
                <div>
                    <p>Productos:</p>
                    <ul>
                        {order.items.map((item) => (
                            <li key={item.id}>
                                {item.name} - {item.price}
                            </li>
                        ))}
                    </ul>
                    <p>Total: {order.total}</p>
                    <p>Información del comprador:</p>
                    <p>Nombre: {order.buyer.name}</p>
                    <p>Teléfono: {order.buyer.phone}</p>
                    <p>Email: {order.buyer.email}</p>

                </div>
            ) : (
                <p>No se encontró ninguna orden</p>
            )}

        </div>
    );
};

export default Checkout;




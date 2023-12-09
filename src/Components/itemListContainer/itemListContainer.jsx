import { useEffect, useState } from "react";
import { Spin } from 'antd';
import Item from "../item/item";
import styles from './styles.module.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/client";
import { getDocs, collection, addDoc } from "firebase/firestore";


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const crearOrdenDeCompra = async () => {
        if (products.length > 0) {
            const items = products.map(product => ({ id: product.id, ...product }));
            const total = items.reduce((acc, item) => acc + item.price, 0);
    
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

    useEffect(() => {
        const productRef = collection(db, "products");
        getDocs(productRef)
            .then((snapshot) => {
                let productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (id) {
                    productos = productos.filter(producto => producto.categoryid === id);
                }
                setProducts(productos);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Spin />;

    return (
        <div className={styles.container}>
            {products.map((product) => (
                <Item key={product.id} producto={product} />
            ))}
            <div>
            <Link to="/itemListContainer/component/checkout">
                <button>Crear orden</button>
            </Link>
        </div>
        </div>
    )
}

export default ItemListContainer;



import { useEffect, useState } from "react";
import { Spin } from 'antd';
import Item from "../item/item";
import styles from './styles.module.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/client";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useCartContext } from "../../context/shopContext"


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    
    const { cart } = useCartContext()
    
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
            
        </div>
    )
}

export default ItemListContainer;



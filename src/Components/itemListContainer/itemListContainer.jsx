// import { Button } from "antd"
import { useEffect, useState } from "react";
import { Spin } from 'antd';
import Item from "../item/item";
import styles from './styles.module.css';
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/client";
import { getDocs, collection } from "firebase/firestore";
import { ItemList } from "../itemList/itemList";

const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)


    const crearOrdenDeCompra = () => {
        const order = {

            buyer: { name: "Juan", phone: "1165187582", email: "ejemplo@ejemplo.com" },
            items: products[1],

            total: products[1].price

        }

        const orderCollection = collection(db, 'orders')

        addDoc(orderCollection, order).then(({ id }) => console.log(id))
    }



    useEffect(() => {
        const productRef = collection(db, "products")
        getDocs(productRef)
            .then((snapshot) => {

                setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

            }).catch(error => console.error(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <Spin />

    return (
        <div className={styles.container}>
            <ItemList products={products} />
            <div>
                <button onClick={crearOrdenDeCompra}>Crear orden</button>
            </div>
        </div>
    )
}
export default ItemListContainer;
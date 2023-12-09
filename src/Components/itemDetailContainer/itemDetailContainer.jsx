import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../firebase/client"
import { getDoc, doc } from "firebase/firestore"
import { useCartContext } from "../../context/shopContext"
import styles from './styles.module.css';

const ItemDetailContainer = () => {
    const { id } = useParams()
    const { addItem } = useCartContext()
    const [producto, setProducto] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const productRef = doc(db, "products", id)
        getDoc(productRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setProducto({
                        id: snapshot.id, ...snapshot.data()
                    })
                }
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    }, [id])

    const addToCart = () => {

        if (producto) {
            addItem(producto, 1)
        }
    }


    return (
        <>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                <div className={styles.card}>
                    {producto ? (
                        <>
                            <h3>Soy el producto {producto?.title}</h3>
                            <img src={producto?.image} alt={producto?.title} />
                            <p>Descripción: {producto?.description}</p>
                            <button onClick={addToCart}>Agregar al carrito</button>
                        </>
                    ) : (
                        <p>El producto con id: {id} no existe</p>
                    )}
                    </div>
                </>
            )}
        </>
    )
}

export default ItemDetailContainer


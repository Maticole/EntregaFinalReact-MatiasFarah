import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../firebase/client"
import { getDoc, doc } from "firebase/firestore"

const ItemDetailContainer = () => {
    const {id} = useParams()
    const [producto, setProducto] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
       const productRef = doc(db, "products", id)
       getDoc(productRef)
     .then((snapshot) => {
        if(snapshot.exists()){
            setProducto({
                id: snapshot.id, ...snapshot.data()
            })
        }
                })
                .catch(error => console.error(error))
                .finally (() => setLoading(false)) 
    }, [id])

    return(
        <>
        {loading ? (
            <p>Cargando...</p>
        ) : (
            <>
            {producto ? (
        <>
        <h3>Soy el producto {producto?.title}</h3>
        <p>descripcion: {producto?.description}</p>
        </>
        ) : (
            <p>El producto con id: {id} no existe</p>
        )}
        </>
    )}
    </>
    )
}

export default ItemDetailContainer
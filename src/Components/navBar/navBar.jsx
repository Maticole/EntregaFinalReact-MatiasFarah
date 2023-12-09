
import { Link } from 'react-router-dom';
import CartWidget from '../cartWidget/cartWidget';
import styles from './styles.module.css'
import { db } from "../../firebase/client";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Spin } from 'antd';

const NavBar = () => {
    const [categoriasRef, setCategoriasRef] = useState([]);
    const [loading, setLoading] = useState(true);

    
    
    useEffect(() => {
        const productRef = collection(db, "products")
        getDocs(productRef)
            .then((snapshot) => {
                const categorias = snapshot.docs.map(doc => doc.data().categoryid);
                const categoriasUnicas = [...new Set(categorias)]
                setCategoriasRef(categoriasUnicas)
            }).catch(error => console.error(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <Spin />;
    console.log(categoriasRef)

    return (
        <div className={styles.navbar}>
            <p>(Entre paréntesis)</p>
            {categoriasRef.map((cat, index) => (
        <Link to={`/category/${index + 1}`} key={index}>
          {cat}
        </Link>
      ))}
            <CartWidget />
        </div>
    );
}
export default NavBar


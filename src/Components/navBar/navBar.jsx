
import { Link } from 'react-router-dom';
import CartWidget from '../cartWidget/cartWidget';
import styles from './styles.module.css'
// import { link } from 'react-router-dom';



const NavBar = () => {

    const arrayDeCategorias = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
    ]


    return (
        <div className={styles.navbar}>
            <p>(Entre paréntesis)</p>
            {arrayDeCategorias.map((cat, index) => <Link to={`/category/${cat}`} key={index}>{cat}</Link> )}
            
                    <CartWidget />


        </div>

    )
}

export default NavBar
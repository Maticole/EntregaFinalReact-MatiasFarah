import styles from "./styles.module.css"
import { Link } from 'react-router-dom'

const Item = ({producto}) => {
    return(
        <div className={styles.card}> 
            <img src={producto.image}/>
            <h4>{producto.title}</h4>
            <p>USD {producto.price}</p>
            <Link to={`/item/${producto.id}`}>Ver mas</Link>
        </div>
    )
}

export default Item
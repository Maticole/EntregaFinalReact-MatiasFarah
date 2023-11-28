import style from './styles.module.css';
import  Item  from '../item/item';

export const ItemList = ({products}) => {
    return (
        <div className={style.container}>
            {products.map((products, index) => <Item producto={products} key={index}/>)}
        </div>
    )
}


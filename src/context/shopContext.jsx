import { createContext, useEffect, useState } from "react";

export const shopContext = createContext();


const ShopComponentContext = ({children}) => {

    const [numero, setNumero] = useState(1)
    const [cart, setCart] = useState([])
    
    const suma = () => {
        setNumero(numero + 1)
    }

    return(
        <shopContext.Provider value={{numero, setNumero, suma}}>
            {children}
            </shopContext.Provider>
    )
}

export default ShopComponentContext 
import ItemListContainer from './Components/itemListContainer/itemListContainer';
import NavBar from './Components/navBar/navBar';
import ItemDetailContainer from './Components/itemDetailContainer/itemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopComponentContext from './context/shopContext';
import CartWidget from './Components/cartWidget/cartWidget';
import Checkout from './Components/Checkout/Checkout';
import { useLocation } from 'react-router-dom';

const CheckoutWrapper = () => {
  const location = useLocation();
  const order = location.state?.order || null;

  return <Checkout order={order} />;
  };

function App() {
  return (
    <ShopComponentContext>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/itemListContainer/component/checkout" element={<CheckoutWrapper />} />
          <Route path="/cart" element={<CartWidget />} />
        </Routes>
      </BrowserRouter>
    </ShopComponentContext>
  );
}

export default App;




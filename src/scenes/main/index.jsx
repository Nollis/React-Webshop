import Hero from "../../components/hero/Hero";
import Slider from '../../components/slider/Slider';
import Products from '../../components/products/Products';
import Tagline from '../../components/Tagline'
import api from "../../http-common";

function Main(props) {

  const { cartItems, onAdd, onRemove } = props;
  return (
    <>
    <Hero />
    <Tagline />
    <Slider />
    <Products cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
    </>
  )
}

export default Main
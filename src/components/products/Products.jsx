import axios from "axios";

import Product from "../Product/Product";
import { useQuery } from "react-query";

export default function Products() {
 // let [products, setProducts] = useState([]);
   function getProducts() {
   return axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
 
  }
 
  let {data}=useQuery('getProducts',getProducts)
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {data?.data.data.map((item) => {
            return <Product item={item} key={item._id}/>
          })}
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import SubRows from "./SubRows";

function SubRowAsync({ row }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (category) => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`).catch(err => console.log(err))
    setProducts(response.data.products)
    setLoading(false)
  };

  useEffect(() => {
    fetchProducts(row.original);
  }, [row.original]);

  return (
    <SubRows
      products={products}
      loading={loading}
    />
  );
}

export default SubRowAsync;
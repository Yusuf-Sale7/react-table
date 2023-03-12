import React, { useEffect, useState } from "react";
import axios from "axios";
import SubRows from "./SubRows";

function SubRowAsync({ row }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (category_id) => {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${category_id}/products`).catch(err => console.log(err))
    setProducts(response.data)
    setLoading(false)
  };

  useEffect(() => {
    fetchProducts(row.original.id);
  }, [row.original.id]);

  return (
    <SubRows
      products={products}
      loading={loading}
    />
  );
}

export default SubRowAsync;
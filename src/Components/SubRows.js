import React from "react";

function SubRows({ products, loading }) {

  if (loading) {
    return (
      <tr>
        <td>
          Loading...
        </td>
      </tr>
    );
  }

  return (
    <>
      {products.map(product => (
        <tr key={product.id}>
          <td>
          <img width="40px" src={product.thumbnail} alt="product"/>
          </td>
          <td>
            {product.title}
          </td>
          <td>
            {product.brand}
          </td>
          <td>
            {product.price} $
          </td>
          <td>
            rating: {product.rating}
          </td>
          <td>
            Stock: {product.stock}
          </td>
        </tr>
      ))}
    </>
  );
}

export default SubRows;
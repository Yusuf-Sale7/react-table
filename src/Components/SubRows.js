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
            #{product.id}
          </td>
          <td>
            <img width="60px" src={product.images[0]} alt="product"/>
          </td>
          <td>
            {product.title}
          </td>
          <td>
            {product.description}
          </td>
          <td>
            {product.price} $
          </td>
          <td>
            Last Update: {product.updatedAt}
          </td>
        </tr>
      ))}
    </>
  );
}

export default SubRows;
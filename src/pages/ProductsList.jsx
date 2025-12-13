import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Button, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../api/firebaseApi";
import { useNavigate } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.adminAuth.token);

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await fetchProducts();

    if (data) {
      const list = Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }));
      setProducts(list);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;

    await deleteProduct(id, token);
    loadProducts();
  }

  return (
    <>
      <AdminHeader />

      <Container className="mt-4">
        <h3 className="mb-3">Products</h3>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/products/edit/${p.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ProductsList;

import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Button, Container, Table, Card, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../api/firebaseApi";
import { useNavigate } from "react-router-dom";
import styles from "./ProductsList.module.css";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.adminAuth.token);
  const navigate = useNavigate();

  console.log(products);

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

      <Container className="py-4">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold mb-0">Products</h3>

          <Button onClick={() => navigate("/products/add")}>
            + Add Product
          </Button>
        </div>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-0">
            <Table hover responsive className="mb-0 align-middle">
              <thead className={styles.tableHead}>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className={styles.productName}>{p.name}</td>

                    <td>
                      <Badge bg="secondary">{p.category}</Badge>
                    </td>

                    <td className="fw-semibold">₹{p.price}</td>

                    <td>
                      {p.quantity > 0 ? (
                        <Badge bg="success">{p.quantity}</Badge>
                      ) : (
                        <Badge bg="danger">Out of stock</Badge>
                      )}
                    </td>

                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="outline-warning"
                        className="me-2"
                        onClick={() => navigate(`/products/edit/${p.id}`)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ProductsList;

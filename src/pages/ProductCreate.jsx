import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { createProduct } from "../api/firebaseApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

function ProductCreate() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.adminAuth.token);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      description: form.description,
      images: [form.image],
    };

    await createProduct(productData, token);

    alert("Product added successfully");
    navigate("/products");
  }

  return (
    <>
      <AdminHeader />

      <Container className="mt-4" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4">Add Product</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" onChange={handleChange} required>
              <option value="">Select</option>
              <option value="doors">Doors</option>
              <option value="tables">Tables</option>
              <option value="chairs">Chairs</option>
              <option value="beds">Beds</option>
              <option value="sofas">Sofas</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="quantity"
              type="number"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control name="image" onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" variant="danger" className="w-100">
            Add Product
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ProductCreate;

import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts, updateProduct } from "../api/firebaseApi";
import { useSelector } from "react-redux";
import AdminHeader from "../components/AdminHeader";

function ProductEdit() {
  const { id } = useParams();
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

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    const data = await fetchProducts();

    if (data && data[id]) {
      const p = data[id];
      setForm({
        name: p.name,
        category: p.category,
        price: p.price,
        quantity: p.quantity,
        description: p.description,
        image: p.images?.[0] || "",
      });
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedProduct = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      description: form.description,
      images: [form.image],
    };

    await updateProduct(id, updatedProduct, token);

    alert("Product updated successfully");
    navigate("/products");
  }

  return (
    <>
      <AdminHeader />

      <Container className="mt-4" style={{ maxWidth: "600px" }}>
        <h3 className="mb-4">Edit Product</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
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
              value={form.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="image"
              value={form.image}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="danger" className="w-100">
            Update Product
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ProductEdit;

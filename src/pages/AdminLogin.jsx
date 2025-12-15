import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/firebaseApi";
import { adminLogin } from "../store/slices/adminAuthSlice";
import { Button, Container, Form } from "react-bootstrap";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await signIn(form.email, form.password);

      console.log("LOGIN USER ID:", data.localId);

      const userId = data.localId;
      const token = data.idToken;

      // CHECK IF ADMIN IN FIREBASE DB
      const roleRes = await axios.get(
        `https://tripzy-de9a4-default-rtdb.firebaseio.com/users/${userId}/role.json?auth=${token}`
      );

      if (roleRes.data !== "admin") {
        alert("NOT AUTHORIZED — You are not an admin.");
        return;
      }

      dispatch(
        adminLogin({
          token,
          userId,
          email: form.email,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.error?.message);
    }
  }

  return (
    <Container style={{ maxWidth: "500px" }} className="mt-5">
      <h3 className="mb-4 text-center">Admin Login</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100" variant="danger">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default AdminLogin;

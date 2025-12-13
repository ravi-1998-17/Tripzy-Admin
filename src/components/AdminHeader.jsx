import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../store/slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.adminAuth.email);

  function handleLogout() {
    dispatch(adminLogout());
    navigate("/admin-login");
  }
  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Container fluid>
        <Navbar.Brand className="fw-bold">Tripzy Admin</Navbar.Brand>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white">{email}</span>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;

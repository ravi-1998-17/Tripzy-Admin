import React from "react";
import AdminHeader from "../components/AdminHeader";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <AdminHeader />

      <Container>
        <h3 className="mb-4">Admin Dashboard</h3>
        <Row>
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h5>Products</h5>
              <p>Manage all products</p>
              <Link to="/products">Go to Products</Link>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h5>Orders</h5>
              <p>View & manage orders</p>
              <Link to="/orders">Go to Orders</Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

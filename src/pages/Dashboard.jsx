import React from "react";
import AdminHeader from "../components/AdminHeader";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <>
      <AdminHeader />

      <Container className="py-4">
        <div className="mb-4">
          <h3 className="fw-bold">Admin Dashboard</h3>
          <p className="text-muted mb-0">
            Manage products, orders and platform activity
          </p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Link to="/products" className={styles.cardLink}>
              <Card className={`${styles.dashboardCard} ${styles.product}`}>
                <div className={styles.iconBox}>
                  <i className="bi bi-box-seam"></i>
                </div>
                <h5 className="fw-semibold">Products</h5>
                <p className="text-muted mb-0">
                  Add, update or remove products
                </p>
              </Card>
            </Link>
          </Col>

          <Col md={4}>
            <Link to="/orders" className={styles.cardLink}>
              <Card className={`${styles.dashboardCard} ${styles.orders}`}>
                <div className={styles.iconBox}>
                  <i className="bi bi-cart-check"></i>
                </div>
                <h5 className="fw-semibold">Orders</h5>
                <p className="text-muted mb-0">
                  View & manage customer orders
                </p>
              </Card>
            </Link>
          </Col>

          <Col md={4}>
            <Card className={`${styles.dashboardCard} ${styles.users}`}>
              <div className={styles.iconBox}>
                <i className="bi bi-people"></i>
              </div>
              <h5 className="fw-semibold">Users</h5>
              <p className="text-muted mb-0">
                User management (coming soon)
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

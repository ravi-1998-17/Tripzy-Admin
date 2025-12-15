import { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminHeader from "../components/AdminHeader";
import { fetchOrders, updateOrderStatus } from "../api/firebaseApi";
import styles from "./OrdersList.module.css";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.adminAuth.token);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await fetchOrders();

    if (data) {
      const list = Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }));
      setOrders(list);
    }
  }

  async function changeStatus(orderId, status) {
    await updateOrderStatus(orderId, status, token);
    loadOrders();
  }

  function statusBadge(status) {
    if (status === "placed")
      return <Badge bg="warning">🕒 Placed</Badge>;
    if (status === "shipped")
      return <Badge bg="info">🚚 Shipped</Badge>;
    if (status === "delivered")
      return <Badge bg="success">✅ Delivered</Badge>;
    if (status === "cancelled")
      return <Badge bg="danger">❌ Cancelled</Badge>;
  }

  return (
    <>
      <AdminHeader />

      <Container className="py-4">
        <h3 className="fw-bold mb-3">Orders</h3>

        <Card className="shadow-sm border-0">
          <Card.Body className="p-0">
            <Table hover responsive className="mb-0 align-middle">
              <thead className={styles.tableHead}>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className={styles.orderId}>{o.id}</td>
                    <td>{o.userId}</td>
                    <td className="fw-semibold">₹{o.total}</td>
                    <td>{o.payment}</td>
                    <td>{statusBadge(o.status)}</td>

                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="outline-info"
                        className="me-2"
                        disabled={o.status !== "placed"}
                        onClick={() => changeStatus(o.id, "shipped")}
                      >
                        Ship
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-success"
                        className="me-2"
                        disabled={o.status !== "shipped"}
                        onClick={() => changeStatus(o.id, "delivered")}
                      >
                        Deliver
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        disabled={o.status === "delivered"}
                        onClick={() => changeStatus(o.id, "cancelled")}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No orders found
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

export default OrdersList;

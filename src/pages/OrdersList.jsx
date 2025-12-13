import { useEffect, useState } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminHeader from "../components/AdminHeader";
import { fetchOrders, updateOrderStatus } from "../api/firebaseApi";

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
    if (status === "placed") return <Badge bg="warning">Placed</Badge>;
    if (status === "shipped") return <Badge bg="info">Shipped</Badge>;
    if (status === "delivered") return <Badge bg="success">Delivered</Badge>;
    if (status === "cancelled") return <Badge bg="danger">Cancelled</Badge>;
  }

  return (
    <>
      <AdminHeader />

      <Container className="mt-4">
        <h3 className="mb-3">Orders</h3>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.userId}</td>
                <td>₹{o.total}</td>
                <td>{o.payment}</td>
                <td>{statusBadge(o.status)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    className="me-2"
                    onClick={() => changeStatus(o.id, "shipped")}
                  >
                    Ship
                  </Button>

                  <Button
                    size="sm"
                    variant="success"
                    className="me-2"
                    onClick={() => changeStatus(o.id, "delivered")}
                  >
                    Deliver
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => changeStatus(o.id, "cancelled")}
                  >
                    Cancel
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

export default OrdersList;

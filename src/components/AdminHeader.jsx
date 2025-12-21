import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../store/slices/adminAuthSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = useSelector((state) => state.adminAuth.email);

  function handleLogout() {
    dispatch(adminLogout());
    navigate("/admin-login");
  }

  const hideCreateBtn = location.pathname === "/products/new";

  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/dashboard"
          className="fw-bold"
          style={{ cursor: "pointer" }}
        >
          Tripzy Admin
        </Navbar.Brand>

        <Nav className="me-auto ms-4 gap-3">
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>

          <Nav.Link as={Link} to="/orders">
            Orders
          </Nav.Link>

          {!hideCreateBtn && (
            <Nav.Link as={Link} to="/products/new">
              Create Product
            </Nav.Link>
          )}
        </Nav>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white small">{email}</span>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Home from './Home';
import Yantra from './Yantra';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/yantra",
    element: <Yantra />,
  },
]);

function App() {
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <Image src="favicon-16x16.png" roundedCircle />
            the y
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
              <Nav.Link href="/">home</Nav.Link>
              <NavDropdown title="floor plan" id="basic-nav-dropdown">
                <NavDropdown.Item href="/nirvana" style={{pointerEvents: 'none'}} className="text-muted">
                  nirvana - the y
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/namaste" style={{pointerEvents: 'none'}} className="text-muted">
                  namaste - studios
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/yantra" style={{color: '#ff69b4'}}>
                  yantra - den
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;

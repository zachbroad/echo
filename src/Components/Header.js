import {Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {generateCodeChallenge, generateRandomString} from "../util";
import {API_AUTH, redirectAndAuthWithSpotify} from "../api";
import {useAuth} from "./Auth";
import {Link} from 'react-router-dom';

export default function Header() {
  const {token, isLoggedIn, logout, profile} = useAuth();


  const reflectionStyle = {
    transform: 'scaleX(-1)', // Flip horizontally
    color: 'rgba(0, 0, 0, 0.1)', // Lighter color for reflection
    display: 'inline-block',
    marginLeft: '0.5rem',
    margin: 0,
    fontWeight: 900,
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className="navbar-brand" to="/">
        <span style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <h1 style={{margin: 0, fontWeight: 900}} className="font-weight-bold">ECHO</h1>
          <h1 style={reflectionStyle} className="font-weight-bold">ECHO</h1>
        </span>
        </Link>
        {/*<Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
        {/*<Navbar.Collapse id="basic-navbar-nav">*/}
        {/*  <Nav className="me-auto">*/}
        {/*    <Nav.Link as={Link} to="/">Home</Nav.Link>*/}
        {/*    <Nav.Link as={Link} to="/explore/">Users</Nav.Link>*/}
        {/*    /!*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*!/*/}
        {/*    /!*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*!/*/}
        {/*    /!*  <NavDropdown.Item href="#action/3.2">*!/*/}
        {/*    /!*    Another action*!/*/}
        {/*    /!*  </NavDropdown.Item>*!/*/}
        {/*    /!*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*!/*/}
        {/*    /!*  <NavDropdown.Divider/>*!/*/}
        {/*    /!*  <NavDropdown.Item href="#action/3.4">*!/*/}
        {/*    /!*    Separated link*!/*/}
        {/*    /!*  </NavDropdown.Item>*!/*/}
        {/*    /!*</NavDropdown>*!/*/}
        {/*  </Nav>*/}
        {/*</Navbar.Collapse>*/}
        <div className="ml-auto">
          {isLoggedIn ? (
            <DropdownButton variant="outline-secondary" id="dropdown-basic-button"
                            title={`${profile.display_name}`}>
              <Dropdown.Item as={Link} to={"/dashboard/"}>
                My dashboard
              </Dropdown.Item>

              <Dropdown.Item as={Link} to={"/settings/"}>
                Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={() => logout()}>Log out</Dropdown.Item>
            </DropdownButton>
          ) : (
            <DropdownButton variant="outline-secondary" id="dropdown-basic-button" title="Log in">
              <Dropdown.Item onClick={() => redirectAndAuthWithSpotify()}>
                Log in with Spotify
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>
      </Container>
    </Navbar>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex align-items-center">
        <Nav className="">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/explore/">Users</Nav.Link>
        </Nav>
      </div>
    </nav>
  );
}

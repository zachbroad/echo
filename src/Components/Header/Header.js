import {Container, Dropdown, DropdownButton, Nav, Navbar} from "react-bootstrap";
import {redirectAndAuthWithSpotify} from "../../api.js";
import {useAuth} from "../Auth/Auth";
import {Link, NavLink} from 'react-router-dom';
import styles from './header.module.scss';

export default function Header() {
  const {token, isLoggedIn, logout, profile} = useAuth();

  return (
    <Navbar expand="lg" className={`navbar-dark ${styles.header}`}>
      <Container>
        <Link className="" to="/">
        <span style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <h1 style={{margin: 0, fontWeight: 900}} className={styles.logoMain}>ECHO</h1>
          <h1 className={styles.logoSecondary}>ECHO</h1>
        </span>
        </Link>
        {/*<Navbar.Toggle aria-controls="basic-navbar-nav" className={"d-none d-sm-none d-md-block"}/>*/}
        <Navbar.Collapse id="basic-navbar-nav" className={"d-sm-none"}>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/explore/">Explore</Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard/">Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="ml-auto">
          {profile !== null ? (
            <DropdownButton variant="outline-secondary" id="dropdown-basic-button"
                            title={`${profile?.display_name}`}>
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

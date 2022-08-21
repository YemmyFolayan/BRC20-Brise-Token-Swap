import React from 'react'
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { Logo, SearchIcon } from "../../assets/images";

const Header = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand href="#">
					<Link to="/">
						<img src={Logo} className="logo" alt="Brise" />
					</Link>
					<div className="logo-text relative" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="mr-auto my-2 my-lg-0">
						{/* <Nav.Link href="#action2">Exchange</Nav.Link> */}
					</Nav>
					<Form className="d-flex" onSubmit={handleSubmit}>
						<Link to="/swap">
							<button className="btn" type="button">Trade</button>
						</Link>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

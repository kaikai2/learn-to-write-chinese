import React from 'react';

import { Navbar, Nav } from 'react-bootstrap'

import {ReactComponent as ReactLogo} from '../logo.svg'

class NavList extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="sm">
                <Navbar.Brand href="#home">
                    <ReactLogo/>
                    {' '}
                    学写汉字
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav variant="pills" defaultActiveKey="/home">
                        {this.props.entries.map((e,i) => (
                            <Nav.Item key={i}>
                                <Nav.Link href="#" 
                                    eventKey={"link-" + i.toString()} 
                                    active={this.props.activeTab === i} 
                                    onClick={() => this.props.onChange(i)}>
                                    {e.name}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

NavList.defaultPros = {
    activeTab: 0,
    onChange: (i) => 0,
    entries: [{
        name: 'Tab1',
    },{
        name: 'Tab2',
    }]
}

export default NavList;

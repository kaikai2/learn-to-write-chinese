import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap'

import { MdAirplanemodeActive, MdRefresh, MdAddToPhotos } from 'react-icons/md'

//import {ReactComponent as ReactLogo} from '../logo.svg'

const isInWebAppiOS = window.navigator.standalone == true
const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches
const isMobile = typeof window.orientation !== 'undefined'

class NavList extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="sm" sticky="top">
                <Navbar.Brand href="#home">
                    <img alt="Learn to write Chinses Logo" src={`${process.env.PUBLIC_URL}/logo192.png`} width="50" height="50"/>
                    {' '}
                    学写汉字
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
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
                {this.props.online || (
                    <MdAirplanemodeActive/>
                )}
                {isMobile && (
                    <>
                    {isInWebAppiOS || isInWebAppChrome ? (
                        <Button variant="outline-danger" size="sm" 
                            onClick={window.location.reload.bind(window.location, true)}>
                            <MdRefresh/>
                        </Button>
                        ) : null}
                    </>
                )}
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
    }],
    online: true,
}

export default NavList;

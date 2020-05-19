import React from 'react';

import { Nav } from 'react-bootstrap'

class NavList extends React.Component {
    render() {
        return (
            <Nav variant="tabs" defaultActiveKey="/home">
                {this.props.entries.map((e,i) => (
                    <Nav.Item>
                        <Nav.Link href="#" 
                            eventKey={"link-" + i.toString()} 
                            active={this.props.activeTab === i} 
                            onClick={() => this.props.onChange(i)}>
                            {e.name}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
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

import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Hanzi from './Hanzi'

class HanziList extends React.Component {
    render() {
        return (
            <Container>
                <Row>

                {this.props.chars.map((c, i) => (
                    <Col className="mb-3" key={i}>
                        <Hanzi
                            key={i.toString()}
                            name={i.toString()}
                            size={this.props.size}
                            char={c}
                        />
                    </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

HanziList.defaultProps = {
    size: 100,
    chars: []
}

export default HanziList;

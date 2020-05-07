import React from 'react'

import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { connect }  from 'react-redux'
import { getRecogniseHistory } from '../../model/selectors'

import { RecogniseHistoryItem } from '..'

class HistoryPage extends React.Component {

    render() {
        return (
            <Container>
                <Row className="mt-1">
                    <Col>
                        <ListGroup>
                        {this.props.recogniseHistory instanceof Array &&
                        this.props.recogniseHistory.reverse().map((r, i) => (
                            <ListGroup.Item key={i} as={RecogniseHistoryItem} {...r}/>
                        ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default connect(
    state => ({
        recogniseHistory: getRecogniseHistory(state),
    }),
    {
    } )(HistoryPage);

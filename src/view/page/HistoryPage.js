import React from 'react'

import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { connect }  from 'react-redux'
import { getRecogniseHistory } from '../../model/selectors'

import { RecogniseHistoryItem } from '..'

class HistoryPage extends React.Component {

    recentRecogniseHistory() {
        let list = []
        if (this.props.recogniseHistory instanceof Array){
            list = list.concat(this.props.recogniseHistory.slice(-5))
        }
        return list.reverse()
    }
    render() {
        return (
            <Container>
                <Row className="mt-1">
                    <Col>
                        <ListGroup>
                        {this.recentRecogniseHistory().map((r, i) => (
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

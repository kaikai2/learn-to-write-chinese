import React from 'react'
import { connect }  from 'react-redux'

import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap'
import { MdAdd, MdRemove } from 'react-icons/md'

import { changeSettings, resetSettings } from '../../model/actions'
import { getSettings } from '../../model/selectors'


class SettingsPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            newCompliment: '',
            newEncouragement: ''
        }
    }
    booleanEnabled(key, e) {
        this.props.changeSettings(key, e.target.checked)
    }
    removeCompliments(index) {
        let newCompliments = [...this.props.settings.compliments]
        newCompliments.splice(index, 1)
        this.props.changeSettings('compliments', newCompliments)
    }    
    changeNewCompliment(e) {
        this.setState({newCompliment: e.target.value})
    }
    addCompliment() {
        let newCompliments = [...this.props.settings.compliments, this.state.newCompliment]
        this.props.changeSettings('compliments', newCompliments)
    }
    removeEncouragement(index) {
        let newEncouragement = [...this.props.settings.encouragement]
        newEncouragement.splice(index, 1)
        this.props.changeSettings('encouragement', newEncouragement)
    }    
    changeNewEncouragement(e) {
        this.setState({newEncouragement: e.target.value})
    }
    addEncouragement() {
        let newEncouragement = [...this.props.settings.encouragement, this.state.newEncouragement]
        this.props.changeSettings('encouragement', newEncouragement)
    }
    render() {
        return (
            <Container fluid>
                <Row className="mt-1">
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Check
                                    checked={this.props.settings.complimentsEnabled}
                                    type="switch"
                                    id="complimentsEnabled"
                                    label="答对时给予称赞"
                                    onChange={this.booleanEnabled.bind(this, 'complimentsEnabled')}
                                    />
                                {this.props.settings.complimentsEnabled && (
                                    <>
                                        <ListGroup>
                                        {this.props.settings.compliments instanceof Array &&
                                        this.props.settings.compliments.map((c,i) => (
                                            <ListGroup.Item key={i.toString()}>
                                                {c}
                                                <Button onClick={e => this.removeCompliments(i)}><MdRemove/></Button>
                                            </ListGroup.Item>
                                        ))}
                                        </ListGroup>
                                        <Form.Control type="text" 
                                            value={this.state.newCompliment} 
                                            onChange={this.changeNewCompliment.bind(this)} 
                                            placeholder="新的称赞语" />
                                        <Button onClick={this.addCompliment.bind(this)}><MdAdd/></Button>
                                    </>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Check
                                    checked={this.props.settings.encouragementEnabled}
                                    type="switch"
                                    id="encouragementEnabled"
                                    label="答错时给予鼓励"
                                    onChange={this.booleanEnabled.bind(this, 'encouragementEnabled')}
                                    />
                                {this.props.settings.encouragementEnabled && (
                                    <>
                                        <ListGroup>
                                        {this.props.settings.encouragement instanceof Array &&
                                        this.props.settings.encouragement.map((c,i) => (
                                            <ListGroup.Item key={i.toString()}>
                                                {c}
                                                <Button onClick={e => this.removeEncouragement(i)}><MdRemove/></Button>
                                            </ListGroup.Item>
                                        ))}
                                        </ListGroup>
                                        <Form.Control type="text" 
                                            value={this.state.newEncouragement} 
                                            onChange={this.changeNewEncouragement.bind(this)} 
                                            placeholder="新的鼓励语" />
                                        <Button onClick={this.addEncouragement.bind(this)}><MdAdd/></Button>
                                    </>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Check
                                    checked={this.props.settings.wordsEnabled}
                                    type="switch"
                                    id="wordsEnabled"
                                    label="提示时给出词组示例"
                                    onChange={this.booleanEnabled.bind(this, 'wordsEnabled')}
                                    />
                            </Form.Group>

                            <Form.Group>
                                <Button variant="danger" onClick={this.props.resetSettings.bind(this)}>重置设置</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(
    state => ({
        settings: getSettings(state)
    }),
    {
        changeSettings,
        resetSettings
    } )(SettingsPage)

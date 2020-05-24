import React from 'react'
import { connect }  from 'react-redux'
import moment from 'moment/min/moment-with-locales'

import { Button, Form, Container, Row, Col, ListGroup, InputGroup, Alert } from 'react-bootstrap'
import { MdAdd, MdRemove } from 'react-icons/md'
import { GiSpeaker } from 'react-icons/gi'
import { changeSettings, resetSettings } from '../../model/actions'
import { getSettings } from '../../model/selectors'
import { VoiceText } from '..'
import { speak } from '../../module/speak'


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
    version() {
        moment.locale('zh-cn')
        const buildDate = moment.unix(+process.env.REACT_APP_BUILD_DATE).format('LLLL')
        return `当前版本: ${process.env.REACT_APP_VERSION} 生成于 ${buildDate}`
    }

    render() {
        return (
            <Container fluid>
                <Row className="mt-1">
                    <Col>
                        <Alert variant='primary'>
                            {this.version()}
                        </Alert>
                    </Col>
                </Row>
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
                                        <ListGroup variant="flush">
                                        {this.props.settings.compliments instanceof Array &&
                                        this.props.settings.compliments.map((c,i) => (
                                            <ListGroup.Item key={i.toString()}>
                                                <VoiceText text={c}/>
                                                <Button className="float-right" onClick={e => this.removeCompliments(i)}><MdRemove/></Button>
                                            </ListGroup.Item>
                                        ))}
                                        </ListGroup>
                                        <InputGroup>
                                            <Form.Control type="text" 
                                                value={this.state.newCompliment} 
                                                onChange={this.changeNewCompliment.bind(this)} 
                                                placeholder="新的称赞语" />
                                            <InputGroup.Append>
                                                <Button variant="outline-info" onClick={speak.bind(this, this.state.newCompliment, true)}><GiSpeaker/></Button>
                                                <Button onClick={this.addCompliment.bind(this)}><MdAdd/></Button>
                                            </InputGroup.Append>
                                        </InputGroup>
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
                                        <ListGroup variant="flush">
                                        {this.props.settings.encouragement instanceof Array &&
                                        this.props.settings.encouragement.map((c,i) => (
                                            <ListGroup.Item key={i.toString()}>
                                                <VoiceText text={c}/>
                                                <Button className="float-right" onClick={e => this.removeEncouragement(i)}><MdRemove/></Button>
                                            </ListGroup.Item>
                                        ))}
                                        </ListGroup>
                                        <InputGroup>
                                            <Form.Control type="text" 
                                                value={this.state.newEncouragement} 
                                                onChange={this.changeNewEncouragement.bind(this)} 
                                                placeholder="新的鼓励语" />
                                            <InputGroup.Append>
                                                <Button variant="outline-info" onClick={speak.bind(this, this.state.newEncouragement, true)}><GiSpeaker/></Button>
                                                <Button onClick={this.addEncouragement.bind(this)}><MdAdd/></Button>
                                            </InputGroup.Append>
                                        </InputGroup>
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

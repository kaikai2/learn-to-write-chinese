import React from 'react';
import {Button, ButtonGroup, Container, Row, ListGroup, Col, Modal} from 'react-bootstrap'
import {MdDone, MdReplay, MdClose, MdChevronRight, MdPlayArrow} from 'react-icons/md'
import {GiUnicorn} from 'react-icons/gi'

import Hanzi from '../Hanzi'
import HanziStrokes from '../HanziStrokes'

import { connect}  from 'react-redux'
import { getNewCharList, getUnrecognisedCharList } from '../../model/selectors'
import { startRecognise, recognise } from '../../model/actions'

class NewChars extends React.Component {
    render() {
        console.log(this.props.chars);
        return (
            <ListGroup horizontal>
                {this.props.chars && this.props.chars.map((c,i) => {
                    return <ListGroup.Item key={c}>{c}</ListGroup.Item>
                })}
            </ListGroup> 
        );
    }
}
let ConnectedNewChars = connect(store => {
    return {chars : getNewCharList(store)};
 } )(NewChars)

class RecognisePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            char: null,
            replayed: 0,
            width: 0,
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    showNextChar() {
        console.log('RecognisePage.showNextChar', this.props.unrecognisedChars, this.state.char);
        if (this.props.unrecognisedChars.length > 0) {
            let nextIndex = Math.floor(Math.random() * this.props.unrecognisedChars.length);
            console.log('RecognisePage.showNextChar: random index', nextIndex, this.props.unrecognisedChars[nextIndex]);
            this.setState({char: this.props.unrecognisedChars[nextIndex]});
        }
    }
    componentDidMount() {
        this.updateWindowDimensions();
        this.props.startRecognise(
            ['L51'],
            ['L22', 'L37', 'L44', 'L48', 'L50']);
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        console.log("RecognisePage.componentDidUpdate", this.props.unrecognisedChars, prevProps.unrecognisedChars);
        if (this.props.unrecognisedChars !== prevProps.unrecognisedChars) {
            console.log("RecognisePage.componentDidUpdate: props changed. was", prevProps.unrecognisedChars);
            this.showNextChar();
        }
    }
    
    updateWindowDimensions() {
        console.log("window.innerWidth=", window.innerWidth, "window.innerHeight=", window.innerHeight)
        let res = Math.max(100, Math.min(window.innerWidth, window.innerHeight) * 0.8)
        console.log("optimalCharSize=", res)
        this.setState({ optimalCharSize: res });
    }

    recognise() {
        this.props.recognise(this.state.char, true);
        this.showNextChar();
    }
    dontRecognise() {
        this.props.recognise(this.state.char, false);
        this.play();
    }
    replay() {
        console.log('replay');
        this.setState({
            replayed: this.state.replayed + 1
        });
    }

    play() {
        var synth = window.speechSynthesis;
        if (synth && typeof synth.speak === "function"){
            var utterThis = new SpeechSynthesisUtterance(this.state.char);
            var zhVoices = synth.getVoices().filter(v => v.lang.startsWith('zh'));
            console.log(zhVoices);
            var sortedVoices = Array.prototype.concat.apply([], 
                ['zh-CN', 'zh-HK', 'zh-TW'].map(c => zhVoices.filter(v => v.lang === c)));
            if (sortedVoices.length > 0) {
                utterThis.voice = sortedVoices[0];
            }
            synth.speak(utterThis);
        }
    }
    render() {
        return (
            <Container fluid>
                { false ? ( 
                    <>
                <Row>
                    <Col>
                        <h1>今日生字</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ConnectedNewChars/>
                    </Col>
                </Row> </>) : null}

                <Row className="mt-1">
                    <Col>
                        <Container>
                            <Hanzi replay={this.state.replayed}
                                size={this.state.optimalCharSize}
                                char={this.state.char} 
                                showPinyin={false}/>
                        </Container>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <ButtonGroup className="d-flex"> 
                            <Button variant="primary" onClick={this.recognise.bind(this)}>
                                <MdDone/>
                            </Button> 
                            <Button variant="success" onClick={this.replay.bind(this)}>
                                <MdReplay></MdReplay>
                            </Button>
                            {window.speechSynthesis && typeof window.speechSynthesis.speak === "function" ? (
                            <Button variant="success" onClick={this.play.bind(this)}>
                                <MdPlayArrow/>
                            </Button>
                            ) : null}
                            <Button variant="primary" onClick={this.dontRecognise.bind(this)}>
                                <MdClose/>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                {this.props.unrecognisedChars.length === 0 ? (
                    <Modal
                        size="sm"
                        show={true}>

                        <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            恭喜你！完成了！
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <GiUnicorn size={this.state.optimalCharSize/2}/>
                        </Modal.Body>
                    </Modal>
                ) : null}
            </Container>
        )
    }
}
function mapStateToProps(state){
    console.log('RecognisePage.mapStateToProps', state);
    return {
        unrecognisedChars: getUnrecognisedCharList(state)
    }
}

export default connect(
    mapStateToProps,
    {startRecognise, recognise} )(RecognisePage);

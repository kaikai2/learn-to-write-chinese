import React from 'react';
import {Button, ButtonGroup, Container, Row, ListGroup, Col} from 'react-bootstrap'
import {MdReplay, MdChevronLeft, MdChevronRight} from 'react-icons/md'
import {GiSpeaker} from 'react-icons/gi'
import Hanzi from '../Hanzi'
import HanziStrokes from '../HanziStrokes'

class MainPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            curIndex: 0,
            chars: ['鸡','米','花','香'],
            replayed: 0,
        }
    }

    prevChar() {
        console.log('prevChar', this.state.curIndex);
        this.setState({
            curIndex: this.state.curIndex - 1
        });
    }
    nextChar() {
        console.log('nextChar', this.state.curIndex);
        this.setState({
            curIndex: this.state.curIndex + 1
        });
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
            var utterThis = new SpeechSynthesisUtterance(this.state.chars[this.state.curIndex]);
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
                <Row>
                    <Col xs={8} md={3}>
                        <h1>今日汉字</h1>
                    </Col>
                    <Col>
                        <ListGroup horizontal>
                        {this.state.chars.map((c, i) => (
                            <ListGroup.Item key={i.toString()} active={i === this.state.curIndex} onClick={() => this.setState({curIndex: i})}>{c}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <Container >

                            <Hanzi replay={this.state.replayed}
                                size={this.props.optimalCharSize}
                                char={this.state.chars[this.state.curIndex]} />
                    
                            <HanziStrokes 
                                size={30} 
                                char={this.state.chars[this.state.curIndex]}
                            />
                        </Container>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <ButtonGroup className="d-flex"> 
                            <Button variant="primary" disabled={this.state.curIndex === 0} onClick={this.prevChar.bind(this)}>
                                <MdChevronLeft/>
                            </Button> 
                            <Button variant="success" onClick={this.replay.bind(this)}>
                                <MdReplay></MdReplay>
                            </Button>
                            {window.speechSynthesis && typeof window.speechSynthesis.speak === "function" ? (
                            <Button variant="success" onClick={this.play.bind(this)}>
                                <GiSpeaker/>
                            </Button>
                            ) : null}
                            <Button variant="primary" disabled={this.state.curIndex === this.state.chars.length - 1} onClick={this.nextChar.bind(this)}>
                                <MdChevronRight/>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                    
            </Container>
        )
    }
}


export default MainPage;

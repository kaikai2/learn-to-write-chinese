import React from 'react'
import { connect }  from 'react-redux'

import { 
    Button, 
    ButtonGroup, 
    Container, 
    Row, 
    ListGroup, 
    Col } from 'react-bootstrap'
import { 
    MdChevronLeft, 
    MdChevronRight,
    MdFullscreen,
    MdFullscreenExit
 } from 'react-icons/md'
import { GiSpeaker } from 'react-icons/gi'
import { GoPencil } from 'react-icons/go'

import { getNewCharList } from '../../model/selectors'

import { speak } from '../../module/speak'
import {descriptiveWords} from '../../module/words'

import { 
    Hanzi, 
    HanziStrokes
 } from '..'

class MainPage extends React.Component {
    hanzi = null
    _isMounted = false

    constructor(props){
        super(props)
        this.state = {
            curIndex: 0,
            chars: ['鸡','米','花','香'],
            replayed: 0,
            writing: false,
            fullView: false
        }
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    prevChar() {
        console.log('prevChar', this.state.curIndex)
        this.setState({
            curIndex: this.state.curIndex - 1,
            writing: false
        })
    }
    nextChar() {
        console.log('nextChar', this.state.curIndex)
        this.setState({
            curIndex: this.state.curIndex + 1,
            writing: false
        })
    }

    play() {
        const theChar = this.currentChar()
        if (theChar) {
            let toSpeak = descriptiveWords(theChar)
            console.log(toSpeak)
            speak(toSpeak)
        }
    }

    startQuiz() {
        console.log('startQuiz', this.hanzi)
        if (this.hanzi) {
            this.setState({writing: true})
            this.hanzi.quiz().then(e => {
                if (this._isMounted) {
                    this.setState({writing: false})
                }
            })
        }
    }
    toggleFullView(){
        this.props.setFullView(!this.state.fullView)
        this.setState({fullView: !this.state.fullView})
    }
    currentChar() {
        if (this.state.curIndex >= 0 && this.state.curIndex < this.props.newChars.length){
            return this.props.newChars[this.state.curIndex]
        }
        return null;
    }

    render() {
        return (
            <Container fluid>
                {this.state.fullView ? null : (
                <Row className="mt-1">
                    <Col xs={12} md={3}>
                        <h1>今日汉字</h1>
                    </Col>
                    <Col>
                        <ListGroup horizontal>
                        {this.props.newChars.map((c, i) => (
                            <ListGroup.Item key={i.toString()} 
                                active={i === this.state.curIndex} 
                                onClick={() => this.setState({
                                    curIndex: i, 
                                    writing: false})}>
                                {c}
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                )}
                <Row className="mt-1">
                    <Col>

                        <Hanzi
                            ref={i => this.hanzi = i}
                            size={this.props.optimalCharSize}
                            char={this.currentChar()} 
                            clickPlay={!this.state.writing}
                            quiz={true}/>
                    
                            <HanziStrokes 
                                size={Math.max(30, this.props.optimalCharSize / 10)} 
                                char={this.currentChar()}
                            />
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <ButtonGroup className="d-flex"> 
                            <Button variant="primary" size="lg" disabled={this.state.curIndex === 0} onClick={this.prevChar.bind(this)}>
                                <MdChevronLeft/>
                            </Button>

                            {window.speechSynthesis && typeof window.speechSynthesis.speak === "function" ? (
                            <Button variant="success" size="lg" onClick={this.play.bind(this)}>
                                <GiSpeaker/>
                            </Button>
                            ) : null}
                            <Button variant="info" size="lg" onClick={this.toggleFullView.bind(this)}>
                                {this.state.fullView ? (
                                    <MdFullscreenExit/>
                                ): (
                                    <MdFullscreen/>
                                )}
                            </Button>
                            <Button variant="warning" size="lg" disabled={this.state.writing} onClick={this.startQuiz.bind(this)}>
                                <GoPencil/>
                            </Button>

                            <Button variant="primary" size="lg" disabled={this.state.curIndex >= this.props.newChars.length - 1} onClick={this.nextChar.bind(this)}>
                                <MdChevronRight/>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                    
            </Container>
        )
    }
}


export default connect(
    state => ({
        newChars: getNewCharList(state),
    }),
    {
    } )(MainPage);


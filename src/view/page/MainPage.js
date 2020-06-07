import React from 'react'
import { connect }  from 'react-redux'

import { Button, ButtonGroup, Container, Row, ListGroup, Col } from 'react-bootstrap'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { GiSpeaker } from 'react-icons/gi'
import { GoPencil } from 'react-icons/go'

import { getNewCharList } from '../../model/selectors'

import { speak } from '../../module/speak'
import {descriptiveWords} from '../../module/words'

import { Hanzi, HanziStrokes } from '..'

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
        const theChar = this.props.newChars[this.state.curIndex]
        let toSpeak = descriptiveWords(theChar)
        console.log(toSpeak)
        speak(toSpeak)
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

    render() {
        return (
            <Container fluid>
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
                <Row className="mt-1">
                    <Col>
                        <Container >

                            <Hanzi
                                ref={i => this.hanzi = i}
                                size={this.props.optimalCharSize}
                                char={this.props.newChars[this.state.curIndex]} 
                                clickPlay={!this.state.writing}
                                quiz={true}/>
                    
                            <HanziStrokes 
                                size={30} 
                                char={this.props.newChars[this.state.curIndex]}
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

                            {window.speechSynthesis && typeof window.speechSynthesis.speak === "function" ? (
                            <Button variant="success" onClick={this.play.bind(this)}>
                                <GiSpeaker/>
                            </Button>
                            ) : null}

                            <Button variant="warning" disabled={this.state.writing} onClick={this.startQuiz.bind(this)}>
                                <GoPencil/>
                            </Button>

                            <Button variant="primary" disabled={this.state.curIndex === this.props.newChars.length - 1} onClick={this.nextChar.bind(this)}>
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


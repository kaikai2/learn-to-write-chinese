import React from 'react';
import {Button, ButtonGroup, Container, Row, ProgressBar, Col, Modal, ListGroup} from 'react-bootstrap'
import {MdDone, MdClose, MdChevronLeft, MdChevronRight} from 'react-icons/md'
import {GiUnicorn, GiSpeaker} from 'react-icons/gi'

import Hanzi from '../Hanzi'
import HanziList from '../HanziList'
import RecogniseHistoryItem from '../RecogniseHistoryItem'

import { connect}  from 'react-redux'
import { getNewCharList, getReviewCharList, getQuizCharQueue, getNewListIndex, getWrongChars, getRecogniseHistory } from '../../model/selectors'
import { prepareRecognise, startRecognise, recognise, changeNew } from '../../model/actions'

import { speak } from '../../module/speak'

class Result {
    static get Finished() {return 0}
    static get Failed() {return 1}
    static get Passed() {return 2}
}

class RecognisePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            begin: false,
            passedChars: []
        }
    }

    changeNewIndex(index = this.props.newListIndex) {
        this.setState({begin: false, passedChars: []})
        this.props.changeNew(index)

        this.props.prepareRecognise(
            ['L' + index],
            [-29, -14, -7, -3, -1].map(d => index + d).filter(i => i >= 0)
                .map(i => 'L' + i.toString())
            );
    }

    componentDidMount() {
        this.setState({begin: false, passedChars: []})
        this.props.prepareRecognise(
            ['L' + this.props.newListIndex],
            [-29, -14, -7, -3, -1].map(d => this.props.newListIndex + d).filter(i => i >= 0)
                .map(i => 'L' + i.toString())
            );
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
    }
    startRecognise() {
        this.setState({begin: true})
        this.props.startRecognise()
    }
    recognise() {
        if (this.props.quizQueue.length > 0) {
            this.props.recognise(this.props.quizQueue[0], true)
            this.setState({passedChars: [...this.state.passedChars, this.props.quizQueue[0]]})
        }
    }
    dontRecognise() {
        if (this.props.quizQueue.length > 0) {
            this.props.recognise(this.props.quizQueue[0], false)
            //this.play();
        }
    }
    progress(key) {
        let totalChar = new Set(this.props.newChars.concat(this.props.reviewChars))
        let total = totalChar.size
        let quizQueue = new Set(this.props.quizQueue)
        return [{
            variant: "",
            now: 100 * (total - quizQueue.size) / total,
            label: `${total - quizQueue.size}/${total}`,
        }, {
            variant: "success",
            now: 100 * (new Set([...this.state.passedChars].filter(x => quizQueue.has(x))).size) / total,
            label: `${new Set([...this.state.passedChars].filter(x => quizQueue.has(x))).size}`
        },
        {
            variant: "warning",
            now: 100 * this.props.wrongChars.length / total,
            label: `${this.props.wrongChars.length}`
        }]
    }

    play() {
        if (this.props.quizQueue.length > 0){
            speak(this.props.quizQueue[0])
        }
    }
    render() {
        return (
            <Container fluid>
                { this.state.begin ? ( 
                <>
                    <Row className="mt-1">
                        <Col>
                            <RecogniseProgressBar progress={this.progress.bind(this)}/>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <VoiceText text='请认一认，这个是什么字啊' autoSpeak={true}/>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <Container>
                                <Hanzi replay={0}
                                    size={this.props.optimalCharSize}
                                    char={this.props.quizQueue.length > 0 ? this.props.quizQueue[0] : null} 
                                    showPinyin={false}/>
                            </Container>
                        </Col>
                    </Row>
                </>
                ) : (
                <>
                    <Row>
                        <Col>
                            <center>
                                <ButtonGroup className="d-flex">
                                    <Button variant="primary" onClick={e => this.changeNewIndex(this.props.newListIndex - 1)}>
                                        <MdChevronLeft />
                                    </Button>
                                    <h1>今日生字</h1>
                                    <Button variant="primary" onClick={e => this.changeNewIndex(this.props.newListIndex + 1)}>
                                        <MdChevronRight />
                                    </Button>
                                </ButtonGroup>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <HanziList chars={this.props.newChars} size={50} className="mb-2"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center>
                                <h1>今日复习</h1>
                            </center>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <HanziList chars={this.props.reviewChars} size={50}/>
                        </Col>
                    </Row>
                </>)}

                <Row className="mt-1">
                    <Col>
                        <ButtonGroup className="d-flex">
                        { this.state.begin ? (
                        <>
                            <Button variant="primary" onClick={this.recognise.bind(this)}>
                                <MdDone/>
                            </Button>
                            {window.speechSynthesis && typeof window.speechSynthesis.speak === "function" ? (
                            <Button variant="success" onClick={this.play.bind(this)}>
                                <GiSpeaker/>
                            </Button>
                            ) : null}
                            <Button variant="primary" onClick={this.dontRecognise.bind(this)}>
                                <MdClose/>
                            </Button>
                            </>
                        ) : (
                            <Button variant="primary" onClick={this.startRecognise.bind(this)}>
                                <MdDone/>
                                 开始测试
                            </Button>
                        )}
                        </ButtonGroup>
                    </Col>
                </Row>

                { !this.state.begin && (
                <Row className="mt-1">
                    <Col>
                        <ListGroup>
                        {this.props.recogniseHistory instanceof Array &&
                        this.props.recogniseHistory.slice(-5).reverse().map((r, i) => (
                            <ListGroup.Item key={i} as={RecogniseHistoryItem} {...r}/>
                        ))}
                        </ListGroup>
                    </Col>
                </Row>
                ) }
                <Modal
                    size="sm"
                    show={this.props.quizQueue.length === 0 && this.state.begin} 
                    onHide={this.changeNewIndex.bind(this)}>

                    <Modal.Header closeButton>
                    <Modal.Title>
                        <VoiceText text="恭喜你！完成了！" autoSpeak={true}/>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <GiUnicorn size={this.props.optimalCharSize/2 || 32}/>
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

RecognisePage.defaultProps = {
    quizQueue: []
}

export default connect(
    state => ({
        newChars: getNewCharList(state),
        reviewChars: getReviewCharList(state),
        quizQueue: getQuizCharQueue(state),
        newListIndex: getNewListIndex(state),
        wrongChars: getWrongChars(state),
        recogniseHistory: getRecogniseHistory(state),
    }),
    {
        prepareRecognise,
        startRecognise, 
        recognise,
        changeNew
    } )(RecognisePage);

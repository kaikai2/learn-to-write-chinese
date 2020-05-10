import React from 'react';
import { connect }  from 'react-redux'

import { Button, ButtonGroup, Container, Row, Col, Modal, ListGroup } from 'react-bootstrap'
import { MdDone, MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { GiUnicorn, GiSpeaker } from 'react-icons/gi'

import { Hanzi, HanziList, RecogniseHistoryItem, RecogniseProgressBar, VoiceText } from '..'

import { getNewCharList, getReviewCharList, getQuizCharQueue, getNewListIndex, getWrongChars, getRecogniseHistory } from '../../model/selectors'
import { prepareRecognise, startRecognise, recognise, changeNew } from '../../model/actions'
import { speak } from '../../module/speak'

import annyang from 'annyang'
import pinyin from 'pinyin'
//import { SpeechKITT } from '../../../node_modules/speechkitt/src/speechkitt'

class RecognisePage extends React.Component {
    _isMounted = false

    constructor(props){
        super(props)
        this.state = {
            begin: false,
            passedChars: [],
            judging: false,
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
        this._isMounted = true
        this.setState({begin: false, passedChars: []})
        this.props.prepareRecognise(
            ['L' + this.props.newListIndex],
            [-29, -14, -7, -3, -1].map(d => this.props.newListIndex + d).filter(i => i >= 0)
                .map(i => 'L' + i.toString())
            );
        if (annyang) {
            console.log('initialize annyang')
            var commands = {
                '前': (e) => {
                    this.changeNewIndex(this.props.newListIndex - 1)
                },
                '后': (e) => {
                    this.changeNewIndex(this.props.newListIndex + 1)
                },
                '开始测试': this.startRecognise.bind(this)
            }
            //SpeechKITT.setInstructionsText('准备好')
            //SpeechKITT.setSampleCommands(Object.keys(commands))
            annyang.addCommands(commands)
            annyang.start()
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
    }

    componentWillUnmount() {
        if (annyang){
            annyang.abort()
        }
        this._isMounted = false
    }

    startRecognise() {
        this.setState({begin: true, judging: false})
        if(annyang) {
            this.props.startRecognise()
            const tryHanzi = (hanzi) => {
                let candidates = pinyin(hanzi, {heteronym: true}).shift()
                console.log("candidates", candidates)
                let correct = pinyin(this.props.quizQueue[0], {heteronym: true}).shift()
                console.log("correct", correct)
                let same = correct.filter(x => new Set(candidates).has(x))
                console.log("same", same)
                if (same.length > 0) {
                    console.log('yes')
                    this.recognise()
                } else {
                    console.log('no')
                    this.dontRecognise()
                }
                console.log('汉字' + hanzi)
            }
            const dontKnow = this.dontRecognise.bind(this)
            var commands = {
                '不认识': dontKnow,
                '不知道': dontKnow,
                '这个字是*hanzi': tryHanzi,
            }
            annyang.addCommands(commands, true)
        }
    }
    randomOf(list){
        return list[Math.floor(Math.random() * list.length)]
    }

    randomCompliments() {
        return this.randomOf([
            '',
            '你真~棒啊!', 
            '厉~害',
            '记幸~不错',
            '棒棒棒',
            '还真是难不倒你啊',
            '你记住了耶',
            //'真他妈是个天才',
            //'我就不信你全知道',
        ])
    }

    randomImprovementDesired() {
        return this.randomOf([
            '',
            '再想想看', 
            '哎呀，答错了', 
            '我佛慈悲',
            //'我就知道你答不上来'
        ])
    }

    recognise() {
        console.log('recognise')
        this.setState({judging: true})
        speak('答对了!' + this.randomCompliments()).then(x => {
            console.log('speak.then')
            if (!this._isMounted) {
                console.log('speak.then !mounted')
                return
            }
            console.log('speak.the setState judging false')
            this.setState({judging: false})
            if (this.props.quizQueue.length > 0) {
                this.props.recognise(this.props.quizQueue[0], true)
                this.setState({passedChars: [...this.state.passedChars, this.props.quizQueue[0]]})
            }
        })
    }

    dontRecognise() {
        this.setState({judging: true})
        speak(this.randomImprovementDesired() + '，这个字念' + this.props.quizQueue[0]).then(x => {
            if (!this._isMounted) {
                return
            }
            this.setState({judging: false})
            if (this.props.quizQueue.length > 0) {
                this.props.recognise(this.props.quizQueue[0], false)
                //this.play();
            }
        })
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
                            <Button variant="primary" onClick={this.recognise.bind(this)} disabled={this.state.judging}>
                                <MdDone/>
                            </Button>
                            {window.speechSynthesis && typeof window.speechSynthesis.speak === "function" ? (
                            <Button variant="success" onClick={this.play.bind(this)}>
                                <GiSpeaker/>
                            </Button>
                            ) : null}
                            <Button variant="primary" onClick={this.dontRecognise.bind(this)} disabled={this.state.judging}>
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
                        {/*SpeechKITT && SpeechKITT.vroom()*/}
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

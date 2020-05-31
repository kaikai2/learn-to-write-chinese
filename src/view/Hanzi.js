import React from 'react';

import HanziWriter from 'hanzi-writer'
import HanziField from './HanziField'
import pinyin from 'pinyin'
import { isEqual } from 'lodash'

class Hanzi extends React.Component {
    
    constructor(props, context){
        super(props)
        this.selfRef = React.createRef();
        this.state = {
        }
    }
    click() {
        if (this.props.clickPlay && this.writer) {
            this.writer.animateCharacter()            
        }
    }

    quiz() {
        const p = new Promise((resolve, reject) => {
            if (this.props.quiz && this.writer) {
                this.writer.quiz({
                    onComplete: resolve
                })
            } else {
                reject()
            }
        })
        return p;
    }

    showWriter() {
        //console.log('Hanzi.showWriter', this.props.char, this.state.currentChar, this.props.size)
        this.writer._options.width = this.props.size;
        this.writer._options.height = this.props.size;
        
        this.writer.setCharacter(this.props.char || '字');
    }
    componentDidMount() {
        console.log('Hanzi.componentDidMount', this.props.char, this.props.size);
        this.writer = HanziWriter.create(this.selfRef.current, this.props.char || '字', {
            width: this.props.size,
            height: this.props.size,
            padding: 5,
            showOutline: true,
        })
    }
    componentDidUpdate(){
        this.showWriter()
    }
    componentWillUnmount() {
        this.writer = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props, nextProps) ||
            !isEqual(this.state, nextState)
    }

    render() {
        return (
            <span className="hanzi-container">
                <center>
                    {this.props.showPinyin ? (
                    <h1 style={{fontSize: this.props.size / 4 || 25}}>{pinyin(this.props.char, {heteronym: true}).join(' ')}</h1>
                    ) : null}
                    <svg ref={this.selfRef}
                        xmlns="http://www.w3.org/2000/svg" 
                        width={this.props.size || 100}
                        height={this.props.size || 100}
                        onClick={this.click.bind(this)}
                        >

                        <HanziField size={this.props.size || 100} strokeWidth={3} />

                    </svg>
                </center>
            </span>
        )
    }
}
Hanzi.defaultProps = {
    clickPlay: false,
    showPinyin: true,
    size: 100,
    char: '字',
    quiz: false,
}
export default Hanzi;

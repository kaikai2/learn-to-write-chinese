import React from 'react';

import HanziWriter from 'hanzi-writer'
import HanziField from './HanziField'
import pinyin from 'pinyin'

class Hanzi extends React.Component {
    
    constructor(props, context){
        super(props)
        this.selfRef = React.createRef();
        this.state = {
        }
    }
    showWriter() {
        //console.log('Hanzi.showWriter', this.props.char, this.state.currentChar, this.props.size)
        this.writer._options.width = this.props.size;
        this.writer._options.height = this.props.size;
        
        this.writer.setCharacter(this.props.char || '字');
        //this.writer.animateCharacter()
    }
    componentDidMount() {
        //console.log('Hanzi.componentDidMount', this.props.char, this.props.size);
        this.writer = HanziWriter.create(this.selfRef.current, this.props.char || '字', {
            width: this.props.size,
            height: this.props.size,
            padding: 5,
            showOutline: true,
        })
        window.writer= this.writer
        this.showWriter()
    }
    componentDidUpdate(){
        //console.log('Hanzi.componentDidUpdate', this.props.char, this.props.size)
        this.showWriter()
    }
    componentWillUnmount() {
        //console.log('Hanzi.componentWillUnmount', this.props.char)
        this.writer = null;
        if (this.selfRef.current.lastElementChild) {
            this.selfRef.current.removeChild(this.selfRef.current.lastElementChild)
        }
    }
    render() {
        //console.log('Hanzi.render', this.props.size)
        return (
            <div className="hanzi-container mb-1">
                <center>
                    {this.props.showPinyin ? (
                    <h1>{pinyin(this.props.char)}</h1>
                    ) : null}
                    <svg ref={this.selfRef}
                        xmlns="http://www.w3.org/2000/svg" 
                        width={this.props.size || 100}
                        height={this.props.size || 100}>

                        <HanziField size={this.props.size || 100} strokeWidth={3} />

                        <g></g>
                    </svg>
                </center>
            </div>
        )
    }
}
Hanzi.defaultProps = {
    showPinyin: true,
    size: 100,
    char: '字',
}
export default Hanzi;

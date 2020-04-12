import React from 'react';

import HanziWriter from 'hanzi-writer'
import HanziStroke from './HanziStroke'

class HanziStrokes extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            strokes: []
        }
    }

    componentDidMount() {
        console.log('HanziStrokes.componentDidMount', this.props.char, this.props.size)
        let self = this;
        HanziWriter.loadCharacterData(this.props.char).then(function(charData){
            self.setState({strokes: charData.strokes})
        })
    }

    componentDidUpdate(prevProps, prevState){
        console.log('HanziStroke.componentDidUpdate', this.props.char, this.props.size)
        let self = this;
        if (this.props.char != prevProps.char) {
            HanziWriter.loadCharacterData(this.props.char).then(function(charData){
                self.setState({strokes: charData.strokes})
            })
        }
    }

    render() {
        return (
            <>
                {this.state.strokes.map((s, i) => (
                    <HanziStroke
                        key={i.toString()}
                        name={i.toString()}
                        size={this.props.size}
                        char={this.props.char}
                        strokes={this.state.strokes.slice(0, i + 1)}
                        />
                ))}
            </>
        )
    }
}



export default HanziStrokes;

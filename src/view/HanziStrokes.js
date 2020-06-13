import React from 'react';

import HanziWriter from 'hanzi-writer'
import HanziStroke from './HanziStroke'
import { charDataLoader } from '../module/hanziDataLoader'

class HanziStrokes extends React.Component {
    _mounted = false

    constructor(props){
        super(props)

        this.state = {
            strokes: []
        }
    }

    componentDidMount() {
        this._mounted = true
        //console.log('HanziStrokes.componentDidMount', this.props.char, this.props.size)
        let self = this
        if (this.props.char) {
            HanziWriter.loadCharacterData(this.props.char, {charDataLoader}).then(function(charData){
                if (self._mounted) {
                    self.setState({strokes: charData.strokes})
                }
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        //console.log('HanziStroke.componentDidUpdate', this.props.char, this.props.size)
        let self = this;
        if (this.props.char !== prevProps.char) {
            if (this.props.char){
                HanziWriter.loadCharacterData(this.props.char, {charDataLoader}).then(function(charData){
                    if (self._mounted) {
                        self.setState({strokes: charData.strokes})
                    }
                })
            }
        }
    }

    componentWillUnmount() {
        this._mounted = false
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

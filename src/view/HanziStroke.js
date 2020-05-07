import React from 'react';

import HanziWriter from 'hanzi-writer'
import HanziField from './HanziField'

function renderFanningStrokes(target, strokes, size, color, lastColor) {
    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // set the transform property on the g element so the character renders at 75x75
    var transformData = HanziWriter.getScalingTransform(size, size);
    group.setAttributeNS(null, 'transform', transformData.transform);
    target.appendChild(group);

    strokes.forEach(function(strokePath, index) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, 'd', strokePath);
        // style the character paths
        path.style.fill = index + 1 === strokes.length ? lastColor: color;
        group.appendChild(path);
    });
}

class HanziStroke extends React.Component {
    
    constructor(props, context){
        super(props)
        this.selfRef = React.createRef();
        this.state = {
        }
        //console.log('HanziStroke', this.props.name, this.props.strokes.length);
    }
    showWriter() {
        //console.log('HanziStroke.showWriter', this.props.char, this.props.size)
        
        //this.writer.setCharacter(this.props.char);
        //this.writer.animateCharacter()
        if (this.selfRef.current.lastElementChild){
            this.selfRef.current.removeChild(this.selfRef.current.lastElementChild);
        }
        renderFanningStrokes(this.selfRef.current, this.props.strokes, this.props.size, this.props.color, this.props.lastColor);
    }

    componentDidMount() {
        //console.log('HanziStroke.componentDidMount', this.props.char, this.props.size);
        var selfRef = this.selfRef;
        let {strokes, size, color, lastColor} = this.props;
        if (this.props.strokes instanceof Array){
            renderFanningStrokes(selfRef.current, this.props.strokes, size, color, lastColor);
        } else {
            HanziWriter.loadCharacterData(this.props.char).then(function(charData){
                renderFanningStrokes(selfRef.current, charData.strokes.slice(0, strokes), size, color, lastColor);
            })
        }
    }

    componentDidUpdate(){
        //console.log('HanziStroke.componentDidUpdate', this.props.char, this.props.size)
        this.showWriter()
    }

    componentWillUnmount() {
        //console.log('HanziStroke.componentWillUnmount', this.props.char)
        this.writer = null;
        if (this.selfRef.current.lastElementChild) {
            this.selfRef.current.removeChild(this.selfRef.current.lastElementChild)
        }
    }

    render() {
        //console.log('HanziStroke.render', this.props.size)
        return (
            <span className="hanzi-container">
                <svg ref={this.selfRef} className="mt-1 mr-1"
                    xmlns="http://www.w3.org/2000/svg" 
                    width={this.props.size || 100}
                    height={this.props.size || 100}>
                    <HanziField size={this.props.size || 100} strokeWidth={2} />
                </svg>
            </span>
        )
    }
}

HanziStroke.defaultProps = {
    color: '#555',
    lastColor: '#f00',
    size: 100,
    strokes: 3, // or array of stroks data loaded via HanziWriter.loadCharacterData
    char: '字',
}

export default HanziStroke;

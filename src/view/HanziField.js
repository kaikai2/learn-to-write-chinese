import React from 'react';


class HanziField extends React.Component {
    borderStrokeWidth() {
        return Math.max(2, Math.min(40, Math.floor((this.props.size || 100) / 50)))
    }
    render() {
        return (
            <g>
                <line x1={this.borderStrokeWidth()} y1={this.borderStrokeWidth()}
                    x2={(this.props.size || 100) - this.borderStrokeWidth()} y2={(this.props.size || 100) - this.borderStrokeWidth()} stroke="lightpink" />
                <line x1={(this.props.size || 100) - this.borderStrokeWidth()} y1={this.borderStrokeWidth()}
                    x2={this.borderStrokeWidth()} y2={(this.props.size || 100) - this.borderStrokeWidth()} stroke="lightpink" />
                <line x1={(this.props.size || 100)/2} y1={this.borderStrokeWidth()} 
                    x2={(this.props.size || 100) / 2} y2={(this.props.size || 100) - this.borderStrokeWidth()} stroke="lightpink" />
                <line x1={this.borderStrokeWidth()} y1={(this.props.size || 100)/2} 
                    x2={(this.props.size || 100) - this.borderStrokeWidth()} y2={(this.props.size || 100)/2} stroke="lightpink" />
                <line x1={this.borderStrokeWidth()} y1={this.borderStrokeWidth()} 
                    x2={this.borderStrokeWidth()} y2={(this.props.size || 100) - this.borderStrokeWidth()} 
                    strokeLinecap="round"
                    strokeWidth={this.borderStrokeWidth()} stroke="pink" />
                <line x1={(this.props.size || 100) - this.borderStrokeWidth()} y1={this.borderStrokeWidth()} 
                    x2={(this.props.size || 100) - this.borderStrokeWidth()} y2={(this.props.size || 100) - this.borderStrokeWidth()} 
                    strokeLinecap="round"
                    strokeWidth={this.borderStrokeWidth()} stroke="pink" />
                <line x1={this.borderStrokeWidth()} y1={this.borderStrokeWidth()} 
                    x2={(this.props.size || 100) - this.borderStrokeWidth()} y2={this.borderStrokeWidth()} 
                    strokeLinecap="butt"
                    strokeWidth={this.borderStrokeWidth()} stroke="pink" />
                <line x1={this.borderStrokeWidth()} y1={(this.props.size || 100) - this.borderStrokeWidth()} 
                    x2={(this.props.size || 100) - this.borderStrokeWidth()} y2={(this.props.size || 100) - this.borderStrokeWidth()} 
                    strokeLinecap="butt"
                    strokeWidth={this.borderStrokeWidth()} stroke="pink" />
            </g>
        )
    }
}


export default HanziField;

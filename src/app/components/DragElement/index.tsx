import React from 'react';
import { Position } from 'types/element';

interface Props {
  initialPos: Position | null;
  handleDrag: (position: Position) => void;
  handleEndMove: (position: Position) => void;
  setIsDragging: any;
}

interface State {
  pos: Position | null;
  dragging: boolean;
  rel: Position | null;
}

export class DragElement extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      pos: null,
      dragging: false,
      rel: null,
    };
  }

  componentDidUpdate(props, state) {
    if (props.initialPos !== this.props.initialPos) {
      this.setState({
        pos: this.props.initialPos,
      });
    }

    if (this.state.dragging && !state.dragging) {
      this.props.setIsDragging(true);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      this.props.setIsDragging(true);
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  onMouseDown = e => {
    // only left mouse button
    if (e.button !== 0) return;
    if (this.state.pos) {
      this.setState({
        dragging: true,
        rel: {
          x: e.pageX - this.state.pos?.x || 0,
          y: e.pageY - this.state.pos?.y || 0,
        },
      });
    }
    e.stopPropagation();
    e.preventDefault();
  };

  onMouseUp = e => {
    this.setState({ dragging: false });
    if (this.state.pos) {
      this.props.handleEndMove(this.state.pos);
    }
    e.stopPropagation();
    e.preventDefault();
  };

  onMouseMove = e => {
    if (!this.state.dragging) return;
    if (this.state.rel && this.state.pos) {
      this.setState({
        pos: {
          x: e.pageX - this.state.rel.x,
          y: e.pageY - this.state.rel.y,
        },
      });
      this.props.handleDrag(this.state.pos);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
        style={{
          position: 'absolute',
          left: this.state.pos?.x + 'px',
          top: this.state.pos?.y + 'px',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

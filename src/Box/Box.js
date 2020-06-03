import React, { Component } from "react";
import "./Box.css";

class Box extends Component {
  static defaultProps = {
    iconValue: 0, // 0 = Zbrazet; 1 = X ; 2 = O
  };

  constructor(props) {
    super(props);
    this.boxClick = this.boxClick.bind(this);
  }

  boxClick() {
    this.props.handleClick(this.props.id);
  }

  render() {
    const { iconValue } = this.props;

    return (
      <button
        disabled={iconValue !== 0}
        onClick={this.boxClick}
        className="boxContainer"
      >
        {iconValue !== 0 &&
          (iconValue === 1 ? (
            <i className="fas fa-times icon"></i>
          ) : (
            <i className="far fa-circle icon"></i>
          ))}
      </button>
    );
  }
}

export default Box;

import React, { Component } from 'react';

// Parent class that defines the basic structure of the alert component
class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    const additionalStyles = this.props.style || {};
    return {
      color: this.color,
      height: this.height,
      fontWeight: this.props.bold ? "bold" : "normal",
      ...additionalStyles
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

// Child class that extends the parent class and sets the properties for an info alert
class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'white';
      this.height = "10px";
    }
  }

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = "pink";
        this.height = "20px";
    }
}

class WarningAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'orange';
      this.height = '40px';
    }
  } 

export { InfoAlert, ErrorAlert, WarningAlert };
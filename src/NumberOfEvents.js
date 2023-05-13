import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

    class NumberOfEvents extends Component {
        state = {
            query: 32,
            errorText: ""
        }

    handleChange = async (event) => {
        let value = event.target.value;
        if (value <= 32 && value > 0) {
            this.setState({
            query: value,
            errorText: ""
            });
            this.props.updateEvents(null, value);
        } else {
            this.setState({
            query: value,
            errorText: "Select number from 1 to 32."
            });
        }
        };

    handleBlur = () => {
        if (this.state.errorText) {
          this.setState({
            errorText: ""
          });
        }
      };

    render() {
        return (
            <div className="numberOfEvents">
                <label htmlFor="eventCount">Select number of events</label>
                <input
                    type="number"
                    id="eventCount"
                    className="nrOfEvents"
                    value={this.state.query}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                <div>
                <ErrorAlert text={this.state.errorText} bold={true}/>
             </div>
            </div>
        )
    }
}

export default NumberOfEvents;
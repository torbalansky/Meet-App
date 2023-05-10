import React, { Component } from "react";

class Event extends Component {
    state = {
        details: false
    }

    render() {
        const { event } = this.props;

        return (
            <div className="event">
                <h2>{event.summary}</h2>
                <p>{new Date(event.start.dateTime).toString()}</p>
                <p>{event.location}</p>
                {!this.state.details ?
                    <button className="details-btn" onClick={() => this.setState({ details: true })}>show details</button>
                    : <>
                        <h3>About Event:</h3>
                        <a href={event.htmlLink}>See details on Google Calendar</a>
                        <p>{event.description}</p>
                        <button className="details-btn" onClick={() => this.setState({ details: false })}>hide details</button>
                    </>
                }
            </div>
        )
    };
}
export default Event;
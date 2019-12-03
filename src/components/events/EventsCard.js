/*
    Purpose: Display the information for a single event.
    Author(s): Ryan Crowley
*/
import React, { Component } from 'react'
import {convertDateTimeFromISO} from "../../modules/DateTime"


class EventsCard extends Component {
    render() {

        return (
            <div className="card">
                <div className="card-content">
                    <h3>{this.props.event.eventName}</h3>
                    <p>
                        {this.props.event.location}
                        <br />{convertDateTimeFromISO(this.props.event.eventDate).toDateString()}
                    </p>
                </div>
            </div>
        )
    }

}

export default EventsCard
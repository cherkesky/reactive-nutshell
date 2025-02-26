/*
    Purpose: Display a form that allows a user to add a new event.
    Author(s): Ryan Crowley
*/
import React, { Component } from 'react'
import EventsApiManager from './EventsApiManager'
import { isCurrentEvent } from './EventsHelpers'


// CHANGE THIS AFTER LOGIN
function loggedInUserId() {return parseInt(localStorage.getItem("userId"))}

class EventsNewForm extends Component {
    state = {
        eventName: "",
        eventDate: "",
        location: "",
        loadingStatus: false
    }

    

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewEvent = evt => {
        evt.preventDefault()
        if (this.state.eventName ==="" || this.state.eventDate ==="" || this.state.location ==="") {
            window.alert("Please input an Event Name, Event Date, and location")
        } else {
            this.setState({loadingStatus: true})
            const newEvent = {
                userId: loggedInUserId(),
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                location: this.state.location
            }  
            if (isCurrentEvent(newEvent)) {
                // Post event to database and redirect user to Events List
                EventsApiManager.addNewEvent(newEvent)    
                .then(() => this.props.history.push("/events"))
            } else {
                this.setState({loadingStatus: false})
                window.alert("Please input a date not in the past")
            }  
        }
    }

    render() {
        return(
            <React.Fragment>
                <form className="card-body">
                    <fieldset>
                        <h1>Add New Event</h1>
                        <div>
                            <label htmlFor="eventName">Event</label>
                            <br />
                            <input 
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="eventName"
                                placeholder="event"
                            />
                            <br />
                            <label htmlFor="location">Where?</label>
                            <br />
                            <input 
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="location"
                                placeholder="Location"
                            />
                            <br />
                            <label htmlFor="eventDate">When?</label>
                            <br />
                            <input 
                            // type="date" is causing a depreciation error
                                type="date"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="eventDate"
                                placeholder="Event Date"
                            />
                        </div>
                        <br />
                        <div>
                            <button 
                                type="button"
                                className="btn btn-primary"
                                // disabled= {this.state.loadingStatus}
                                onClick={this.constructNewEvent}
                            >Submit
                            </button>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }

}

export default EventsNewForm
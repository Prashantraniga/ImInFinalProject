import React, { Component } from 'react';


class ViewEvent extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }



  render() {


    return (
      <div className="ViewEvent">
      <h3>{this.props.response}</h3>
      <div>
Team Name: {this.props.event.teamName}
      </div>
      <div>
<p>Invitees:</p>

{this.props.event.invitees.map(invitelist => {
return ( <p key={invitelist.part_name}>
        {invitelist.part_name} |
        {invitelist.part_number}
         </p> )
    })
  }

      </div>
<div>Location: {this.props.event.eventPlace}</div>
<div>Date: {this.props.event.eventDate}</div>
<div>Time: {this.props.event.eventTime}</div>
<div>Message: {this.props.event.message}</div>
<div>
<button name="sent_invite" id="sent_invite">Send Invites</button>
<button name="delete" id="delete">Delete</button></div>
      </div>

  )
}}

export default ViewEvent;
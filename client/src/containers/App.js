import React, { Component } from 'react';

import './App.css';
import Newevent from './Newevent'
import Events from './Events'
import RegisterLogin from './RegisterLogin'
import Header from '../components/Header'
import ViewEvent from '../components/ViewEvent'
import WelcomeText from '../components/WelcomeText'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  constructor(props){
    super(props);
    var loggedIn
    if (sessionStorage.getItem('username')=== null) {
      loggedIn = false
    } else {
      loggedIn = true
    }

    this.state = {
      currentView: "home",
      pageTitle: "",
      event:'',
      toasterShow: true,
      user: sessionStorage.getItem('username'),
      userID: sessionStorage.getItem('userID'),
      loggedIn: loggedIn,
      cookieaccept:sessionStorage.getItem('cookieaccept')
    }
    // console.log("are you working?")
     this.pages = {
      'home': '',
      'new' : 'Create a new event',
      'events' : 'Your events',
      'login' : 'Login or Register',
      'register' : 'Register',
      'viewevent' : 'View Event'
    }
    this.showSection = this.showSection.bind(this);
    this.setEventID = this.setEventID.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.refreshEventList = this.refreshEventList.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setLogout = this.setLogout.bind(this);

    // console.log(sessionStorage.getItem('viewingEvent'))
  }

  notify = () => {
    // toast("Wow so easy !")

  toast("We have cookies.  Do you want them?", {
    onClose: () => this.cookieSet(),
     autoClose: false,
          position: toast.POSITION.BOTTOM_CENTER,

          className: 'black-background',
 bodyClassName: "grow-font-size",
 progressClassName: 'fancy-progress-bar'
        });
      }

      toast_login = () => {
        // toast("Wow so easy !")

      toast("You are logged in, "+this.state.user+"", {
         autoClose: true,
              position: toast.POSITION.TOP_RIGHT,

              className: 'black-background',
     bodyClassName: "grow-font-size",
     progressClassName: 'fancy-progress-bar'
            });
          }

          toast_logout = () => {
            // toast("Wow so easy !")

          toast("You are logged out", {
             autoClose: true,
                  position: toast.POSITION.TOP_RIGHT,

                  className: 'black-background',
         bodyClassName: "grow-font-size",
         progressClassName: 'fancy-progress-bar'
                });
              }

  componentDidMount() {
    if (this.state.toasterShow && !this.state.cookieaccept){
      this.notify()}
  }

setEventID(event) {
  console.log(event)
  // console.log(this.state.event)
  // sessionStorage.setItem('viewingEvent', event._id)
  this.setState({
    event : event,
    currentView : 'viewEvent',
    pageTitle : this.pages['viewEvent'],
    // refreshEventList:false
  })
  // )
}

  showSection(section) {
    // console.log(this.state.currentView)
    // console.log(this.pages[section])
    this.setState({
      currentView : section,
      pageTitle : this.pages[section]
    })
  }

  cookieSet() {
    // console.log(this.state.currentView)
    // console.log(this.pages[section])
    sessionStorage.setItem('cookieaccept', true);
    this.setState({
      cookieaccept : true
    })
  }

  deleteEvent = (id) => {
    // var eventID = this.state.event._id
    console.log(id)
    var url = 'http://localhost:5000/api/db/' + id
    // var event = {teamName: this.state.teamName, eventTime: this.state.eventTime, eventDate: this.state.eventDate, eventPlace: this.state.eventPlace, message: this.state.message, invitees: this.state.invitees}
    // console.log(event)
    fetch(url, {
      method: 'DELETE',
      // body: JSON.stringify( event ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    // .then(window.location.reload())
    .then(this.setState({
      currentView : 'events',
      pageTitle : this.pages['events']
    }))
    .then(console.log("refreshing"))
    .then(this.refreshEventList())
    .catch(error => console.error("Error:", error));

  }

  sendInvite = () => {
    console.log('sms test')
    var url = 'http://localhost:5000/api/send/'
    var event = this.state.event
    console.log(event)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify( event ),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    // .then(window.location.reload())
    .then(this.setState({
      currentView : 'home',
      pageTitle : this.pages['home']
    }))
    .then(console.log("refreshing"))
    .then(this.refreshEventList())
    .catch(error => console.error("Error:", error));

  }

  refreshEventList () {
    console.log(this.state)
    this.setState({refreshEventList: !this.state.refreshEventList})
  }

  setUser(user,userID) {
    console.log(user)
    sessionStorage.setItem('username', user);
    sessionStorage.setItem('userID', userID)
    this.setState({user: user, userID:userID, loggedIn:true})
    this.showSection('home')
    this.toast_login()
    console.log(userID)
  }

  setLogout() {
    // console.log("toggle?")
    sessionStorage.clear()
    this.setState({user: '',userID:'', loggedIn:false})
    this.showSection('home')
    this.toast_logout()

  }

  render() {
    return (
      <div className="App">

      <Header pageTitle={this.state.pageTitle} showSection={this.showSection} user={this.state.user} loggedIn={this.state.loggedIn} setLogout={this.setLogout}/>

      {/*// <button onClick={this.notify}>Notify !</button>*/}
      <ToastContainer />
      {this.state.currentView === "home" && <WelcomeText user={this.state.user} loggedIn={this.state.loggedIn}/>}
      {this.state.currentView === "new" && <Newevent showSection={this.showSection} setEventID={this.setEventID}/>}
      {this.state.currentView === "login" && <RegisterLogin showSection={this.showSection} setUser={this.setUser}/>}
      {this.state.currentView === "events" && <Events deleteEvent={this.deleteEvent}  setEventID={this.setEventID} refresh={this.refreshEventList}/>}
      {this.state.currentView === "viewEvent" && <ViewEvent response={'Your Event'} event={this.state.event} deleteEvent={this.deleteEvent} sendInvite={this.sendInvite}/>}
      </div>
    );
  }
}

export default App;

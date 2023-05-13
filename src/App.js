import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";

class App extends Component {
  state = {
    events: [],
    NumberOfEvents: 32,
    locations: [],
    location: "all",
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
            if (this.mounted) {
                events = events.slice(0, 32);
                this.setState({ events, locations: extractLocations(events) });
            }
        });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (location) this.setState({ location });
    if (eventCount) this.setState({ numberOfEvents: eventCount });
    getEvents().then((events) => {
      const locationEvents = (this.state.location === 'all') ?
        events :
        events.filter((event) => event.location === this.state.location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents)
      });
    });
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <h1>Meet App</h1>
        <label>Choose your nearest city</label>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }}/>
        {!navigator.onLine ? <WarningAlert text={"Offline mode: List loaded from cache."} /> : null}
      </div>
    );
  }
}

export default App;
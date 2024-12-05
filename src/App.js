import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import EventGenre from "./EventGenre";

class App extends Component {
  state = {
    events: [],
    numberOfEvents: 32,
    locations: [],
    location: "all",
    showWelcomeScreen: undefined
  }

  getData = () => {
    const { locations, events } = this.state;
    if (!locations || !events) return [];
    
    const data = locations.map(location => {
      const number = events.filter(event => event.location === location).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
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
          this.setState({ events: events.slice(0, 32), locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      let locationEvents;
      if (location === 'all' || !location) {
        locationEvents = events;
      } else {
        locationEvents = events.filter((event) => event.location === location);
      }
      
      const numberOfEvents = eventCount || this.state.numberOfEvents;
      locationEvents = locationEvents.slice(0, numberOfEvents);
      
      this.setState({
        events: locationEvents,
        location: location
      });
    });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <div className="main-container">
          <div className="left-pane">
            <CitySearch data-testid="city-search" locations={this.state.locations} updateEvents={this.updateEvents} />
            <NumberOfEvents data-testid="number-of-events" updateEvents={this.updateEvents} />
            <EventGenre data-testid="event-genre" events={this.state.events} />

            <ResponsiveContainer data-testid="scatter-chart" height={400} width="100%">
              <ScatterChart margin={{ top: 30, right: 50, bottom: 70, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                <XAxis 
                  dataKey="city" 
                  type="category" 
                  name="City" 
                  tick={{ fill: 'white' }}
                  label={{ 
                    value: 'Cities', 
                    position: 'bottom', 
                    offset: 50,
                    fill: 'white'
                  }}
                />
                <YAxis 
                  dataKey="number" 
                  type="number" 
                  name="Number of events" 
                  allowDecimals={false}
                  tick={{ fill: 'white' }}
                  label={{ 
                    value: 'Number of Events', 
                    angle: -90, 
                    position: 'left',
                    offset: 40,
                    fill: 'white'
                  }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: 'rgba(213, 234, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Scatter 
                  data={this.getData()} 
                  fill="var(--accent)"
                  fillOpacity={0.8}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="right-pane">
            <EventList data-testid="event-list" events={this.state.events} />
          </div>
        </div>

        <WelcomeScreen data-testid="welcome-screen" showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => getAccessToken()} />
        {!navigator.onLine && <WarningAlert text={"Offline mode: List loaded from cache."} />}
      </div>
    );
  }
}

export default App;

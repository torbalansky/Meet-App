import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
      }

    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
        this.setState({
          query: value,
          infoText: 'City not found. Try another city.',
      });
    } else {
      return this.setState({
          query: value,
          suggestions,
          infoText: ''
        });
      }
    };

    handleItemClicked = (suggestion) => {
        this.setState({
          query: suggestion,
          suggestions: [],
          showSuggestions: false,
          infoText:''          
        });

        this.props.updateEvents(suggestion);
      }

  render() {
    return (
      <div className="CitySearch">
        <input
            type="text"
            className="city"
            placeholder="Search for a city"
            value={this.state.query}
            onChange={this.handleInputChanged}
            onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
        {this.state.suggestions.map((suggestion) => (
            <li
            key={suggestion}
            onClick={() => this.handleItemClicked(suggestion)}
          >{suggestion}</li>
         ))}
         <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
         </li>
        </ul>
        <InfoAlert text={this.state.infoText} bold={true}/>
      </div>
    );
  }
}

export default CitySearch;
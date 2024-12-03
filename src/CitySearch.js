import React, { Component } from 'react';
import { InfoAlert } from './Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
    infoText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase())
    );
    this.setState({
      query: value,
      suggestions,
      showSuggestions: true,
      infoText: suggestions.length === 0 ? 'City not found. Try another city.' : '',
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion === 'all' ? '' : suggestion,
      showSuggestions: false,
      infoText: '',
    });
    this.props.updateEvents(suggestion);
  };

  handleInputFocus = () => {
    this.setState({
      showSuggestions: true,
      suggestions: this.props.locations,
    });
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showSuggestions: false });
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { query, suggestions, showSuggestions, infoText } = this.state;

    return (
      <div 
        className="CitySearch"
        ref={node => this.wrapperRef = node}
      >

        <div className="search-input-container">
          <input
            type="text"
            className="city"
            placeholder="Search for a city"
            value={query}
            onChange={this.handleInputChanged}
            onFocus={this.handleInputFocus}
          />
          <FontAwesomeIcon
            data-testid="caret-icon"
            icon={faCaretDown}
            onClick={() => this.setState(prev => ({ showSuggestions: !prev.showSuggestions }))}
            style={{ cursor: 'pointer', marginLeft: '5px' }}
          />
        </div>
        <div className="alert-container">
          <InfoAlert text={infoText} bold={true} />
        </div>

        {showSuggestions && (
          <ul className="suggestions">
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion} 
                onClick={() => this.handleItemClicked(suggestion)}
              >
                {suggestion}
              </li>
            ))}
            <li onClick={() => this.handleItemClicked('all')}>
              <b>See all cities</b>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default CitySearch;
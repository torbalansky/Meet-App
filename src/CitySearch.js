import React, { Component } from 'react';
import { InfoAlert } from './Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showModal: false,
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
      infoText: suggestions.length === 0 ? 'City not found. Try another city.' : '',
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showModal: false,
      infoText: '',
    });
    this.props.updateEvents(suggestion);
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          placeholder="Search for a city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={this.toggleModal}
        />
        <FontAwesomeIcon
          icon={faCaretDown}
          onClick={this.toggleModal}
          style={{ cursor: 'pointer', marginLeft: '5px' }}
        />
        <InfoAlert text={this.state.infoText} bold={true} />

        <Modal show={this.state.showModal} onClose={this.toggleModal}>
          <ul className="suggestions">
            {this.state.suggestions.map((suggestion) => (
              <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
                {suggestion}
              </li>
            ))}
            <li onClick={() => this.handleItemClicked('all')}>
              <b>See all cities</b>
            </li>
          </ul>
        </Modal>
      </div>
    );
  }
}

export default CitySearch;
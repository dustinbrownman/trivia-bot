import React from 'react';
import PropTypes from 'prop-types';

import TextInput from "./text-input";
import Message from "./message";

import '../assets/styles/app.scss';

const messages = [];

class App extends React.Component {
  constructor (props) {
    super(props);

    let messages = ["starting message"];
    this.state = {
      inputValue: "",
      messages: messages
    };

    this.enterKeyHandler = this.enterKeyHandler.bind(this);
  }

  enterKeyHandler (event) {
    if (event.which === 13) {
      event.preventDefault();

      var messages = this.state.messages;
      var newMessage = event.target.textContent;

      if (newMessage !== "") {
        messages.push(newMessage);
      }

      this.setState({ messages: messages, inputValue: "" });

      return true;
    }
  }

  renderMessage (message, key) {
    return (
      <p key={key}>{message}</p>
    )
  }

  render () {
    let { greeting } = this.props;

    return (
      <div className="app-container">
        <div className="chat-container">
          <h1>{greeting}</h1>
          <p>Ask me stuff.</p>

          {this.state.messages.map((message, index) => <Message message={message} key={index} source="sent" />)}
        </div>
        <TextInput onKeyPress={this.enterKeyHandler} />
      </div>
    );
  }
}

App.propTypes = {
  greeting: PropTypes.string
};

export default App;

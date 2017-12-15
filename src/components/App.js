import React from 'react';
import PropTypes from 'prop-types';

import TextInput from "./text-input";
import Message from "./message";

import '../assets/styles/app.scss';

const messages = [];

class App extends React.Component {
  constructor (props) {
    super(props);

    var messages = [
      {
        text: "How many plays is Shakespeare generally considered to have written?",
        source: "received"
      }
    ];
    this.state = { messages: messages };

    this.enterKeyHandler = this.enterKeyHandler.bind(this);
  }

  enterKeyHandler (event) {
    if (event.which === 13) {
      event.preventDefault();

      var newMessage = {
        text: event.target.textContent,
        source: "sent"
      };

      if (newMessage.text !== "") {
        this.addMessage(newMessage);
        this.postMessage(newMessage);
      }

      return true;
    }
  }

  addMessage (newMessage) {
    var messages = this.state.messages;
    messages.push(newMessage);
    this.setState({ messages: messages });
  }

  postMessage (message) {
    var requestParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(message)
    }
    var request = new Request("http://localhost:4567/api/messages", requestParams);

    fetch(request)
      .then(response => response.json())
      .then(message => this.addMessage(message))
      .catch(error => console.log(error));
  }

  render () {
    let { greeting } = this.props;

    return (
      <div className="app-container">
        <div className="chat-container">
          <h1>{greeting}</h1>
          <p>Ask me stuff.</p>

          {this.state.messages.map((message, index) => <Message message={message.text} key={index} source={message.source} />)}
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

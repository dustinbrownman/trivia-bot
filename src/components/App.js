import React from 'react';
import PropTypes from 'prop-types';

import TextInput from "./text-input";
import Message from "./message";

import '../assets/styles/app.scss';

const messages = [];

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = { messages: [], currentContext: {} };

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

  processResponse ({ text, source, context, length }) {
    console.log(text);
    console.log(source);
    console.log(context);
    text.forEach((text, index) => {
      this.addMessage({ text: text, source: source, delay: index*1000 })
    });
    this.setState({ currentContext: context });
  }

  addMessage (newMessage) {
    var messages = this.state.messages;
    messages.push(newMessage);
    this.setState({ messages: messages });
  }

  postMessage (message) {
    let body = message;
    body["context"] = this.state.currentContext;

    var requestParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }
    var request = new Request("http://localhost:4567/api/messages", requestParams);

    fetch(request)
      .then(response => response.json())
      .then(response => this.processResponse(response))
      .catch(error => console.log(error));
  }

  render () {
    let { greeting } = this.props;

    return (
      <div className="app-container">
        <div className="chat-container">
          <div className="message-received">
            <h1 className="message-bubble greeting">{greeting}</h1>
          </div>

          {this.state.messages.map((message, index) => <Message message={message.text} key={index} source={message.source} delay={message.delay} />)}
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

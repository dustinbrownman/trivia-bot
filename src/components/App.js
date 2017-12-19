import React from 'react';
import PropTypes from 'prop-types';

import TextInput from "./text-input";
import Message from "./message";

import '../assets/styles/app.scss';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = { messages: [], currentContext: {}, ready: false };

    this.enterKeyHandler = this.enterKeyHandler.bind(this);
  }

  componentDidMount () {
    this.postMessage({}).then(() => this.setState({ ready: true }));
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
    text.forEach((text, index) => {
      let messageProps = { text: text, source: source, delay: index*1000 };
      if (index === 0 && context["answer_status"]) {
        messageProps["answerStatus"] = context["answer_status"];
      }
      this.addMessage(messageProps);
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
    };
    var request = new Request("/api/messages", requestParams);

    return (
      fetch(request)
        .then(response => response.json())
        .then(response => this.processResponse(response))
        .catch(error => this.errorMessage())
    );
  }

  errorMessage () {
    let errorMessage = "Uh oh. I'm experiencing some sort of malfunction.";
    this.addMessage({ text: errorMessage, source: "received", delay: 0 });
  }

  render () {
    let { greeting } = this.props;

    return (
      <div className="app-container">
        <div className="chat-container">
          <div className="message-received">
            <h1 className="message-bubble greeting">{greeting}</h1>
          </div>

          {this.state.messages.map((message, index) => {
            return (
              <Message
                answerStatus={message.answerStatus}
                delay={message.delay}
                key={index}
                message={message.text}
                source={message.source}
              />
            );
          })}
        </div>
        <TextInput
          disabled={!this.state.ready}
          onKeyPress={this.enterKeyHandler}
        />
      </div>
    );
  }
}

App.propTypes = {
  greeting: PropTypes.string
};

export default App;

import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/message.scss';

class Message extends React.Component {
  render () {
    return (
      <div className={`message message-${this.props.source}`}>
        <p className="message-bubble">
          {this.props.message}
        </p>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  source: PropTypes.oneOf(["sent", "received"]).isRequired
};

export default Message;

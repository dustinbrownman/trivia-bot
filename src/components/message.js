import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/message.scss';

class Message extends React.Component {
  constructor (props) {
    super(props)

    this.state = { hidden: true };
  }

  componentWillMount () {
    setTimeout(() => { this.show() }, this.props.delay);
  }

  show () {
    this.setState({ hidden: false });
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  render () {
    let hiddenClass = this.state.hidden ? "hidden" : "";

    return (
      <div className={`message message-${this.props.source} ${this.props.answerStatus} ${hiddenClass}`} ref={el => this.el = el}>
        <p className="message-bubble" dangerouslySetInnerHTML={{ __html: this.props.message }} />
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  source: PropTypes.oneOf(["sent", "received"]).isRequired,
  answerStatus: PropTypes.oneOf(["correct", "missed"])
};

export default Message;

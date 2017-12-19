import React from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/text-input.scss';

class TextInput extends React.Component {
  componentDidUpdate () {
    this.editableSpan.focus();
  }

  clearTextOnEnter (event) {
    if (this.props.onKeyPress(event)) {
      this.editableSpan.innerHTML = "";
    }
  }

  render () {
    return (
      <div className="text-input">
        <span
          contentEditable={!this.props.disabled}
          onKeyPress={this.clearTextOnEnter}
          ref={span => this.editableSpan = span}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  disabled: PropTypes.boolean,
  onKeyPress: PropTypes.func
};

export default TextInput;

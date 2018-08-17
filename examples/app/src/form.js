const React = require('react');
const PropTypes = require('prop-types');

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Form extends React.Component {
  state = {
    name: '',
    errors: [],
  }

  handleChange = (name) => {
    // Update value and clear errors for the given field
    this.setState({ name, errors: [] });
  }

  validateFields = ({ name }) => {
    // Initialize errors
    const errors = [];

    const MIN_CHARS = 3;
    const MAX_CHARS = 30;

    // Sanitize input
    const _name = name && name.trim(); // eslint-disable-line no-underscore-dangle

    if (!_name) {
      errors.push('Name is required!');
    } else if (_name.length < MIN_CHARS) {
      errors.push(`Must be at least ${MIN_CHARS} characters!`);
    } else if (_name.length > MAX_CHARS) {
      errors.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    return errors;
  }

  clearFields = () => {
    this.setState({ name: '' });
  }

  clearErrors = () => {
    this.setState({ errors: [] });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const {
      onBeforeHook,
      onClientErrorHook,
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field values
    const { name } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const err = this.validateFields({ name });

    // In case of errors, display on UI and return handler to parent component
    if (err.length > 0) {
      this.setState({ errors: err });
      onClientErrorHook(err);
      return;
    }

    // onServerErrorHook(err);
    onSuccessHook();
  }

  render() {
    const { btnLabel, disabled } = this.props;
    const { name, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <input
          type="text"
          label="Name"
          value={name}
          onChange={this.handleChange}
        />
        <span>{errors.toString()}</span>
        <button
          type="submit"
          disabled={disabled}
        >
          {btnLabel}
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

Form.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default Form;

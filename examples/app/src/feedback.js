const React = require('react');
const PropTypes = require('prop-types');

const Feedback = ({ className, loading, errorMsg, successMsg }) => (
  <div className={className || ''}>
    {loading && <span>Loading...</span>}
    <div>{`type=error content=${errorMsg}`}</div>
    <div>{`type=success content=${successMsg}`}</div>
  </div>
);

Feedback.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
  successMsg: PropTypes.string,
};

Feedback.defaultProps = {
  className: '',
  errorMsg: '',
  successMsg: '',
};

export default Feedback;

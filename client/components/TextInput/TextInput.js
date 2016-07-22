import React, { PropTypes } from 'react'
import classnames from 'classnames'

function TextInput({ name, placeholder, value, error, onChange, onBlur }) {
  const className = classnames('form-group', { 'has-danger': error && error.length > 0 })

  return (
    <div className={className}>
      <input
        type="text"
        className="form-control"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="help-block">
        {error && <small className="text-help">{error}</small>}
      </div>
    </div>
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
}

TextInput.defaultProps = {
  onBlur: () => {},
}

export default TextInput

import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { SecondaryButton } from './styles/Buttons'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <SecondaryButton onClick={toggleVisibility}>{props.buttonLabel}</SecondaryButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <SecondaryButton onClick={toggleVisibility}>Cancel</SecondaryButton>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
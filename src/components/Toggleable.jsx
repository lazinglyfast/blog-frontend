import { React, useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Toggleable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)
  const hide = { display: "none" }
  const show = {}

  useImperativeHandle(
    ref,
    () => ({
      hide: () => setVisible(false),
    }),
    [],
  )

  return (
    <div style={{ marginBottom: 5, marginTop: 5 }}>
      <div style={visible ? show : hide}>{children}</div>
      <div style={visible ? hide : show}>
        <button type="button" onClick={() => setVisible(true)}>
          {buttonLabel}
        </button>
      </div>
      <div style={visible ? show : hide}>
        <button type="button" onClick={() => setVisible(false)}>
          cancel
        </button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable

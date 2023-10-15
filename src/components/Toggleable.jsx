import { React, useState, forwardRef, useImperativeHandle } from "react"

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

export default Toggleable

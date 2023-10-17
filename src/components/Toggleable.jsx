import { React, useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "react-bootstrap"

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
        <Button
          variant="primary"
          type="button"
          onClick={() => setVisible(true)}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={visible ? show : hide}>
        <Button
          variant="primary"
          type="button"
          onClick={() => setVisible(false)}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

export default Toggleable

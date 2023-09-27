import { React, useState } from "react"

const Toggleable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)
  const hide = { display: "none" }
  const show = {}

  return (
    <div style={{ marginBottom: 5, marginTop: 5 }}>
      <div style={visible ? show : hide}>
        {children}
      </div>
      <div style={visible ? hide : show}>
        <button type="button" onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={visible ? show : hide}>
        <button type="button" onClick={() => setVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default Toggleable

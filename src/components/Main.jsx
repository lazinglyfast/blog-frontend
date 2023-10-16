import { useEffect } from "react"
import LoggedOut from "./LoggedOut"
import LoggedIn from "./LoggedIn"
import { useUser, useUserDispatch, restoreUser } from "./UserContext"

const Main = () => {
  const user = useUser()
  const dispatchUser = useUserDispatch()

  const runOnlyOnceAtApplicationStart = []

  useEffect(() => {
    restoreUser(dispatchUser)
  }, runOnlyOnceAtApplicationStart)

  return <div>{user ? <LoggedIn /> : <LoggedOut />}</div>
}

export default Main

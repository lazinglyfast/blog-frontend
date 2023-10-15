import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import LoggedOut from "./LoggedOut"
import LoggedIn from "./LoggedIn"
import { initBlogs } from "../reducers/blog"
import { logbackin } from "../reducers/user"

const Main = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const runOnlyOnceAtApplicationStart = []

  useEffect(() => {
    dispatch(logbackin())
  }, runOnlyOnceAtApplicationStart)

  useEffect(() => {
    dispatch(initBlogs())
  }, runOnlyOnceAtApplicationStart)

  return <div>{user ? <LoggedIn /> : <LoggedOut />}</div>
}

export default Main

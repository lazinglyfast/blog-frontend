import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import BlogItem from "./BlogItem"

test("<BlogItem /> initially only renders a blog's title and author", () => {
  const handleUpdate = jest.fn()
  const handleRemove = jest.fn()

  const blog = {
    title: "this is a jest blog",
    author: "Lazingly Fast",
    url: "http://lazinglyfast/blog/this-is-a-jest-blog",
    likes: 11000,
    creator: {
      name: "Diogo Friggo",
    },
  }

  render(<BlogItem
    blog={blog}
    handleUpdate={handleUpdate}
    handleRemove={handleRemove}
  />)

  // screen.debug()

  screen.getByText("this is a jest blog by Lazingly Fast")

  const url = screen.getByText("http://lazinglyfast/blog/this-is-a-jest-blog")
  expect(url.parentNode).toHaveStyle("display: none")

  const likes = screen.getByText("likes 11000")
  expect(likes.parentNode).toHaveStyle("display: none")

  const creator = screen.getByText("created by Diogo Friggo")
  expect(creator.parentNode).toHaveStyle("display: none")
})

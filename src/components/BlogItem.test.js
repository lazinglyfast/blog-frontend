import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogItem from "./BlogItem"

const handleUpdate = jest.fn()
const handleRemove = jest.fn()

beforeEach(() => {
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
})

describe("<BlogItem />", () => {
  test("initially only renders a blog's title and author", () => {
    // screen.debug()
    screen.getByText("this is a jest blog by Lazingly Fast")

    const url = screen.getByText("http://lazinglyfast/blog/this-is-a-jest-blog")
    expect(url.parentNode).toHaveStyle("display: none")

    const likes = screen.getByText("likes 11000")
    expect(likes.parentNode).toHaveStyle("display: none")

    const creator = screen.getByText("created by Diogo Friggo")
    expect(creator.parentNode).toHaveStyle("display: none")
  })

  test("if view gets clicked then url and likes are shown", async () => {
    // roundabout way just to learn the framework
    const url = screen.getByText("http://lazinglyfast/blog/this-is-a-jest-blog")
    expect(url.parentNode).toHaveStyle("display: none")

    const likes = screen.getByText("likes 11000")
    expect(likes.parentNode).toHaveStyle("display: none")

    const span = screen.getByTestId("view")
    const view = span.querySelector("#view")
    const user = userEvent.setup()
    await user.click(view)
    await user.click(view)

    expect(url.parentNode).toHaveStyle("display: none")
    expect(likes.parentNode).toHaveStyle("display: none")
  })

  test("two likes result in two calls to handleUpdate", async () => {
    // roundabout way just to learn the framework
    const div = screen.getByTestId("likes")
    expect(div.textContent).toBe("likes 11000 like")

    const like = div.querySelector(".like")
    const user = userEvent.setup()
    await user.click(like)
    await user.click(like)
    expect(handleUpdate.mock.calls).toHaveLength(2)
  })
})

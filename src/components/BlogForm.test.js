import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

const handleCreate = jest.fn()

beforeEach(() => {
  render(<BlogForm
    handleCreate={handleCreate}
  />)
})

describe("<BlogForm />", () => {
  test("upon clicking create the handler is called with the correct blog details", async () => {
    const blog = {
      title: "this is a jest blog",
      author: "Lazingly Fast",
      url: "http://lazinglyfast/blog/this-is-a-jest-blog",
      likes: 0,
    }
    const div = screen.getByTestId("container")
    const title = div.querySelector("#title")
    const author = div.querySelector("#author")
    const url = div.querySelector("#url")

    const create = screen.getByRole("button")
    const user = userEvent.setup()

    await user.type(title, blog.title)
    await user.type(author, blog.author)
    await user.type(url, blog.url)

    await user.click(create, blog)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0]).toStrictEqual(blog)
  })
})

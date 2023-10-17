import CommmentForm from "./CommentForm"
import CommmentList from "./CommentList"

const Comments = ({ blog }) => (
  <div>
    <h2>Comments</h2>
    <CommmentForm blog={blog} />
    <CommmentList blog={blog} />
  </div>
)

export default Comments

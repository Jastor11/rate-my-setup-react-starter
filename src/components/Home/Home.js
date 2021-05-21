import Post from "../Post/Post"
import NewPostForm from "../NewPostForm/NewPostForm"
import "./Home.css"

export default function Home({ user, isFetching, posts }) {
  return (
    <div className="Home">
      <h1 className="intro">Rate My Setup</h1>

      <NewPostForm user={user} isFetching={isFetching} />

      <div className="feed">
        {posts?.map((post) => (
          <Post post={post} key={post.id} user={user} />
        ))}
      </div>
    </div>
  )
}

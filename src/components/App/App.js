import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import Register from "../Register/Register"
import Login from "../Login/Login"
import PostDetail from "../PostDetail/PostDetail"
// import NotFound from "../NotFound/NotFound"
import "./App.css"

export default function App() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true)

      try {
        const res = await axios.get("http://localhost:3001/posts")
        if (res?.data?.posts) {
          setPosts(res.data.posts)
        }
      } catch (err) {
        console.log(err)
        const message = err?.response?.data?.error?.message
        setError(message ?? String(err))
      } finally {
        setIsFetching(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} error={error} posts={posts} isFetching={isFetching} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route path="/posts/:postId" element={<PostDetail user={user} />} />

          {/* <Route
            path="*"
            element={
              <NotFound
                user={user}
                error={error}
                products={products}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
              />
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

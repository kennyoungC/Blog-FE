import React from "react"
import NavBar from "./components/navbar/BlogNavbar"
import Footer from "./components/footer/Footer"
import Home from "./views/home/Home"
import Blog from "./views/blog/Blog"
import NewBlogPost from "./views/new/New"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/login/Login"
import Register from "./components/login/register"

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        {/* <Route path="/" exact element={<Home />} />
        <Route path="/blogPosts/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} /> */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

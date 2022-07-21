import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import BlogItem from "../blog-item/BlogItem"

const BlogList = (props) => {
  const [posts, setPost] = useState([])
  useEffect(() => {
    const getPostBlog = async () => {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/blogPosts`)
      const data = await response.json()
      setPost(data)
    }
    getPostBlog()
  }, [])
  return (
    <Row>
      {posts.map((post) => (
        <Col
          key={post._id}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem {...post} />
        </Col>
      ))}
    </Row>
  )
}

export default BlogList

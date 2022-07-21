import React, { useEffect, useState } from "react"
import { Container, Image } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor"
import BlogLike from "../../components/likes/BlogLike"
import "./styles.css"
const Blog = (props) => {
  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const { id } = params
    getSingleBlog(id)
  }, [])

  const getSingleBlog = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/blogPosts/${id}`
      )
      const blog = await response.json()
      if (blog) {
        setBlog(blog)
        setLoading(false)
      } else {
        navigate("/404")
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <div>loading</div>
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <div className="d-flex justify-content-between align-items-center">
            {" "}
            <h1 className="blog-details-title">{blog.title}</h1>
            <a
              href={`${process.env.REACT_APP_BE_URL}/blogPosts/${blog._id}/files/pdf`}
            >
              Download as Pdf
            </a>
          </div>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{new Date(blog.createdAt).toLocaleString()}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    )
  }
}

export default Blog

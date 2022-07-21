import React, { useCallback, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useNavigate } from "react-router-dom"
import "./styles.css"
const NewBlogPost = (props) => {
  const navigate = useNavigate()
  const [newBlog, setNewBlog] = useState({
    title: "",
    cover: "",
    category: "",
    content: "",
    readTime: { value: 0 },
    author: { name: "" },
  })
  const handleChange = useCallback((value) => {
    setNewBlog({ ...newBlog, content: value })
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      newBlog.title === "" ||
      newBlog.cover === "" ||
      newBlog.category === "" ||
      newBlog.content === "" ||
      newBlog.readTime.value === 0 ||
      newBlog.author.name === ""
    ) {
      return alert("Please fill all the fields")
    }

    try {
      await fetch(`${process.env.REACT_APP_BE_URL}/blogPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      })
      // const data = await response.json()
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-author" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            value={newBlog.author.name}
            onChange={(e) =>
              setNewBlog({ ...newBlog, author: { name: e.target.value } })
            }
            size="lg"
            placeholder="Author's Name"
          />
        </Form.Group>
        <Form.Group controlId="minutes" className="mt-3">
          <Form.Label>How many minutes Read</Form.Label>
          <Form.Control
            value={newBlog.readTime.value}
            onChange={(e) =>
              setNewBlog({ ...newBlog, readTime: { value: +e.target.value } })
            }
            type="number"
            size="lg"
            placeholder=""
            min="1"
            max="10"
          />
        </Form.Group>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            size="lg"
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            value={newBlog.category}
            onChange={(e) =>
              setNewBlog({ ...newBlog, category: e.target.value })
            }
            size="lg"
            as="select"
          >
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        <Form.Group controlId="cover-img" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            value={newBlog.cover}
            onChange={(e) => setNewBlog({ ...newBlog, cover: e.target.value })}
            size="lg"
            placeholder="Image URL"
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default NewBlogPost

import React, { useState } from "react"
import { useEffect } from "react"
import { Button, Card, Form, Image, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import BlogAuthor from "../blog-author/BlogAuthor"
import "./styles.css"
const BlogItem = (props) => {
  const { title, cover, author, _id, comments } = props
  const [comment, setComment] = useState([])
  const [text, setText] = useState("")
  const [selectedFile, setSelectedFile] = useState()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setComment(comments)
  }, [])

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onFileUpload = async (e) => {
    e.preventDefault()
    // Create a object of formData
    const formData = new FormData()

    // Update the formData object
    formData.append("blogPosts", selectedFile)

    // Request made to the backend api
    // Send formData object

    try {
      const response = await fetch(
        `http://localhost:3002/blogPosts/${_id}/uploadCover/`,
        {
          body: formData,
          method: "POST",
        }
      )
      console.log(response)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      setShow(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitComment = async (e) => {
    e.preventDefault()
    if (text.trim().length === 0) {
      return
    }
    try {
      const response = await fetch(
        `http://localhost:3002/blogPosts/${_id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: text }),
        }
      )
      const data = await response.json()
      setComment(data)
      setText("")
    } catch (error) {
      console.log(error)
    }
  }
  const deleteComment = async (commentId) => {
    try {
      await fetch(
        `http://localhost:3002/blogPosts/${_id}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      )
      // console.log(comments)
      const filteredComments = comment.filter((c) => c.id !== commentId)
      setComment(filteredComments)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card className="blog-card">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {" "}
          <Image
            className="blog-author"
            src={cover}
            style={{ width: "250px", height: "250px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <div>
            <form onSubmit={onFileUpload}>
              <input type="file" onChange={(e) => changeHandler(e)} />
              <input type="submit" value="Upload Photo" />
            </form>
          </div>
          {/* <div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Save Changes</Button>
          </div> */}
        </Modal.Footer>
      </Modal>
      <Card.Img
        onClick={handleShow}
        variant="top"
        src={cover}
        className="blog-cover"
      />
      <Card.Body>
        <Link to={`/blogPosts/${_id}`} className="blog-link">
          <Card.Title>{title}</Card.Title>
        </Link>
      </Card.Body>
      <Card.Footer>
        <BlogAuthor {...author} />
      </Card.Footer>
      <Form onSubmit={submitComment}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="add new comment"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add comment
        </Button>
      </Form>
      <ul>
        {comment.map((comment) => (
          <li key={comment.id}>
            <div className="d-flex justify-content-between align-items-center px-2">
              <p className="mb-0"> {comment.text}</p>
              <div
                className="text-danger"
                onClick={() => deleteComment(comment.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default BlogItem

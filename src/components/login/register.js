import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./login.css"
const Register = () => {
  const navigate = useNavigate()
  const [fileError, setFileError] = useState(false)
  const [matchedPassword, setMatchedPassword] = useState(true)
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    email: "",
    password: "",
    avatarFile: null,
    confirmPassword: "",
  })
  const { name, email, password, confirmPassword, avatarFile } = newAuthor
  let productFormData = new FormData()
  productFormData.append("name", name)
  productFormData.append("email", email)
  productFormData.append("password", password)
  productFormData.append("avatar", avatarFile)

  const onFileChange = (e) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      setFileError(false)
      setNewAuthor({ ...newAuthor, avatarFile: e.target.files[0] })
    } else {
      setFileError(true)
      return
    }
  }
  const onSetNewAuthor = (e) => {
    setMatchedPassword(true)
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value,
    })
  }

  const createNewAuthor = async (e) => {
    e.preventDefault()
    const { confirmPassword, ...rest } = newAuthor
    if (password !== confirmPassword) {
      setMatchedPassword(false)
      return
    }
    const apiUrl = `${process.env.REACT_APP_APP_BE_URL}/register`
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(rest),
    })
    if (response.ok) {
      navigate("/")
    }
  }

  return (
    <section className=" bg-image marginTop">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={createNewAuthor}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        onChange={onSetNewAuthor}
                        required
                      />
                      <label className="form-label" for="form3Example1cg">
                        Your Name
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        onChange={onSetNewAuthor}
                        required
                      />
                      <label className="form-label" for="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        name="password"
                        value={password}
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        onChange={onSetNewAuthor}
                        required
                      />
                      <label className="form-label" for="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        onChange={onSetNewAuthor}
                      />
                      <label className="form-label" for="form3Example4cdg">
                        Repeat your password
                      </label>
                      {!matchedPassword && (
                        <p className="text-danger">password does not match</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label for="formFile" class="form-label">
                        Upload Avatar
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        id="formFile"
                        onChange={onFileChange}
                      />
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label className="form-check-label" for="form2Example3g">
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register

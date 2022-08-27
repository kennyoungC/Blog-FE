import React, { useReducer } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./login.css"
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatarFile: null,
  fileError: false,
  matchedPassword: true,
}
const registerReducer = (state, action) => {
  const { type, fieldName, payload } = action
  switch (type) {
    case "field": {
      return {
        ...state,
        [fieldName]: payload,
        matchedPassword: true,
      }
    }
    case "file": {
      return {
        ...state,
        fileError: false,
        avatarFile: payload,
      }
    }
    case "fileError": {
      return {
        ...state,
        fileError: true,
      }
    }
    case "matchedPassword": {
      return {
        ...state,
        matchedPassword: false,
      }
    }
  }
}

const Register = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(registerReducer, initialState)

  const {
    name,
    email,
    password,
    confirmPassword,
    avatarFile,
    matchedPassword,
    fileError,
  } = state
  let authorFormData = new FormData()
  authorFormData.append("name", name)
  authorFormData.append("email", email)
  authorFormData.append("password", password)
  authorFormData.append("avatar", avatarFile)

  const onFileChange = (e) => {
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      dispatch({
        type: "file",
        payload: e.target.files[0],
      })
    } else {
      dispatch({ type: "fileError" })
      return
    }
  }
  const onSetNewAuthor = (e) => {
    dispatch({
      type: "field",
      payload: e.target.value,
      fieldName: e.target.name,
    })
  }

  const createNewAuthor = async (e) => {
    e.preventDefault()
    const { confirmPassword, ...rest } = state
    if (password !== confirmPassword) {
      dispatch({ type: "matchedPassword" })
      return
    }
    const apiUrl = `${process.env.REACT_APP_APP_BE_URL}/register`
    const response = await fetch(apiUrl, {
      method: "POST",
      body: authorFormData,
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
                      <label for="formFile" className="form-label">
                        Upload Avatar
                      </label>
                      <input
                        className="form-control"
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

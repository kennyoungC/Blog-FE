import React from "react"
import { Link } from "react-router-dom"
import "./login.css"
const Login = () => {
  return (
    <section className=" bg-image marginTop">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <label className="form-check-label" for="form2Example3g">
                        Don't have an Account yet?{" "}
                        <Link to="/register" className="text-body">
                          <u>Register</u>
                        </Link>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Login
                      </button>
                    </div>
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

export default Login

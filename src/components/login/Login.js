import React from "react"
import { Link } from "react-router-dom"
import "./login.css"
const Login = () => {
  return (
    <section class=" bg-image marginTop">
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Login</h2>

                  <form>
                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">
                      <label class="form-check-label" for="form2Example3g">
                        Don't have an Account yet?{" "}
                        <Link to="/register" class="text-body">
                          <u>Register</u>
                        </Link>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        type="button"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
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

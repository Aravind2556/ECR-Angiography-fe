import React, { useContext, useState } from "react";
import PowermangeUser from "../../assets/login image .png";
import { DContext } from "../../context/Datacontext";

export const Login = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const { setAuth } = useContext(DContext);
  const [display, setDisplay] = useState(""); // Initialize with an empty string
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log("form data", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${apiurl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDisplay(data.message);
          setAuth(data.user);
          window.location.reload();
        } else {
          setDisplay(data.message);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        setDisplay("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="container-fluid min-vh-95 d-flex justify-content-center align-items-center" style={{position : "relative" , top : "200px"}}>
      <div className="row w-100">
        {/* Image Section */}
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <img
            src={PowermangeUser}
            alt="Login Illustration"
            className="img-fluid"
            style={{
              width: "100%", // Make it responsive and scale to container size
              maxWidth: "800px", // Max size to prevent it from getting too large
              objectFit: "contain",
            }}
          />
        </div>

        {/* Form Section */}
        <div className="col-12 col-md-4 offset-md-1">
          <form onSubmit={handleLogin} className="shadow p-4 rounded bg-white">
            <h2 className="text-center mb-4">Login</h2>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingEmail">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>

            <div className="d-flex justify-content-between">
              <a href="/create-account" className="text-decoration-none">
                Create Account
              </a>
            </div>

            {/* Conditional Display of Success/Error Message */}
            {display && (
              <div className="d-flex justify-content-center mt-3">
                <p className={display === "Login successfully" ? "text-success" : "text-danger"}>
                  {display}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};



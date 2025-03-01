import React, { useContext, useState } from "react";
import PowermangeUser from "../../assets/login image .png";
import { DContext } from "../../context/Datacontext";

export const Login = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const { setAuth } = useContext(DContext);
  const [display, setDisplay] = useState(false);
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log("form data",formData)

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
        
      });
  };

  return (
    <div className="">
      <div className=" w-100 d-flex justify-content-center align-items-center">
      
        {/* Image Section */}
        <div className="col-8 ">
          <img
            src={PowermangeUser}
            alt="Login Illustration"
            className="img-fluid"
            style={{ width : "800px" ,objectFit : "contain" , position : "relative", top : "100px"}}
          />
        </div>

        {/* Form Section */}
        <div className="col-3">
          <h2 className="text-center mb-4"></h2>
          <form onSubmit={handleLogin}>
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

            <div className="d-flex justify-content-center mt-3">
              {display && (
                display === "Login successfully" ? (
                  <p className="text-success">{display}</p>
                ) : (
                  <p className="text-danger">{display}</p>
                )
              )}
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

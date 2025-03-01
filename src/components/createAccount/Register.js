import React, { useState } from "react";
import PowermangeUser from "../../assets/hand-medical-glove-pointing-virtual-screen-medical-technology.jpg";

export const Register = () => {
  const apiurl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData) {
      fetch(`${apiurl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message)
          
          if (data.success === true) {
            window.location.href='/'
          }
        })
        .catch((err) => {
          console.log("Error", err);
          alert("Catch error");
        });
    } else {
      alert("Data value not declared");
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 p-3">
      <div className="row w-100 d-flex justify-content-center align-items-center">
        
        {/* Image Section (Shown in Large Screens) */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
          <img
            src={PowermangeUser}
            alt="Register Illustration"
            className="img-fluid"
            style={{  objectFit: "cover", borderRadius: "10px" }}
          />
        </div>

        {/* Form Section */}
        <div className="col-lg-5 col-md-8 col-sm-10 col-12">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Register</h2>

            <form onSubmit={handleRegister}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="Your Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingName">Name</label>
              </div>

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
                  type="tel"
                  className="form-control"
                  id="floatingContact"
                  placeholder="1234567890"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingContact">Contact</label>
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

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Register
              </button>

              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <a href="/" className="text-decoration-none">
                    Go to login
                  </a>
                </p>
              </div>

            
            
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;




import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "./FormFeild";
import Header from "./Header";
import EventDisplay from "./Chat/EventDisplay";

const Register = () => {
  const nav=useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [event, setEvent] = useState({
    type: "",
    message: "",
    show: false,
  });

  const [passwordError, setPasswordError] = useState(false);
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (formData.password.length === 0) {
      setPasswordError(false);
      setPasswordsMatchError(false);
      return;
    }

    setPasswordError(!passwordPattern.test(formData.password));

    if (formData.confirmPassword.length > 0) {
      setPasswordsMatchError(
        formData.password !== formData.confirmPassword
      );
    }

  }, [formData.password, formData.confirmPassword]);

const [success,setSuccess]=useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const isValidPassword = passwordPattern.test(formData.password);
    const isMatch = formData.password === formData.confirmPassword;

    setPasswordError(!isValidPassword);
    setPasswordsMatchError(!isMatch);

    if (!isValidPassword || !isMatch) return;

    try {

      const res = await fetch(
        "http://localhost:5000/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSuccess(true)
        setEvent({
          show: true,
          type: "success",
          message: data.msg,
        });
      } else {
        setEvent({
          show: true,
          type: "error",
          message: data.msg,
        });
      }

    } catch (error) {

      console.log(error);

      setEvent({
        type: "error",
        message: "Server Error",
        show: true,
      });

    }
  };
 
  useEffect(()=>{
    if(success){
      const timeout=setTimeout(()=>{
        nav("/login")
      },1500)
      return ()=> clearTimeout(timeout)
    }

  },[success])


  return (
    <>
      <Header />

      {event.show && (
        <EventDisplay
          type={event.type}
          message={event.message}
          onClose={() =>
            setEvent({
              type: "",
              message: "",
              show: false,
            })
          }
        />
      )}

      <div className="flex items-center justify-center h-screen bg-gray-100">

        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <FormField
              label="userName"
              name="userName"
              type="text"
              minLength="3"
              value={formData.userName}
              onChange={handleChange}
              required
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={
                passwordError
                  ? "Password must be 8+ characters with uppercase, lowercase, number & special character."
                  : null
              }
            />

            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={
                passwordsMatchError
                  ? "Passwords do not match."
                  : null
              }
            />

            <input
              type="submit"
              value="Register"
              className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
            />

            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline"
              >
                Login here
              </Link>
            </p>

            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to our Terms
              of Service and Privacy Policy.
            </p>

          </form>

        </div>

      </div>
    </>
  );
};

export default Register;
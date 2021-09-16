import React, {useState,useContext } from "react";
import axios from "axios";
import "../auth/SignUp.css";
import Modal from "../Modal/Modal";
import { userSign } from "../../App";
const SignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const {email, setEmail} = useContext(userSign);
  const {password, setPassword}= useContext(userSign);
  const [status, setStatus] = useState();
  const [show, setShow] = useState(false);

  return (
   
    <>

      {!show ? (
        <div className="signUp">
          <h2 className="header-name">Signup</h2>
          <input
            type="text"
            placeholder="firstName"
            className="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="lastName"
            className="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <input
            type="number"
            className="phoneNumber"
            placeholder="phoneNumber"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            className="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            className="password-sign"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
               className="btn-sign"
            onClick={() => {
              axios
                .post("http://localhost:5000/signUp", {
                  firstName,
                  lastName,
                  phoneNumber,
                  email,
                  password,
                })
                .then((result) => {
                  setShow(true);

                  //    console.log(result)
                  setStatus(
                    <div className="success">
                      the user has been added successfully
                    </div>
                  );
                })
                .catch((err) => {
                  setStatus(
                    <div className="wrong">
                      error happen while regeister please try again
                    </div>
                  );
                });
            }}
          >
            signUp
          </button>
          {status}
        </div>
      ) : (
        <Modal />
      )}
    </>
  );
};

export default SignUp;

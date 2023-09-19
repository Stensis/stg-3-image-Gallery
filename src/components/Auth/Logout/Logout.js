import React from "react";
import firebase from "../../../config/firebase";
import "./Logout.css"

function LogoutForm() {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <div>
      <h3>Logged in as: {firebase.auth().currentUser.email}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutForm;

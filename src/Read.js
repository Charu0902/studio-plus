import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: ""

  });
  const { company } = useParams();
  // useEffect(() => {
  //   loadUser();
  // }, []);
  // const loadUser = async () => {
  //   const res = await axios.get('https://react.opositive.io/list.php/' + id);
  //   setUser(res.data);
  // };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {company}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: { props.name }</li>
        <li className="list-group-item">email: {user.email}</li>
      </ul>
    </div>
  );
};

export default User;
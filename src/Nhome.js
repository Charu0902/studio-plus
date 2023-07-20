import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nhome = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get("https://react.opositive.io/list.php");
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {posts.map((el) => (
        <article key={el.id}>
          <Link to={`/${el.slug}`}>
            <h1>{el.slug}</h1>
          </Link>
          <p>{el.id}</p>
        </article>
      ))}
    </>
  );
};

export default Nhome;
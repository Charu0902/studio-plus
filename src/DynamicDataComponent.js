import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DynamicDataComponent = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://react.opositive.io/api.php?id=${id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Data for ID: {id}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DynamicDataComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DataList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://react.opositive.io/api.php');
        setDataList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {dataList.map((data) => (
          <li key={data.id}>
            <Link to={`/data/${data.id}`}>{data.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Test = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제로는 서버에서 데이터를 가져오는 API 엔드포인트를 호출해야 합니다.
        // 예: const response = await axios.get('http://172.10.7.46:80/api/dummy1');
        // setData(response.data);

        // 임시로 데이터를 설정 (시뮬레이션용)
        setData([1, 2, 3, 4]);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // useEffect는 최초 렌더링 시에만 호출

  return (
    <div>
      {data.length > 0 ? (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', listStyleType: 'none' }}>
          {data.map((item) => (
            <li key={item} style={{ border: '1px solid #ddd', padding: '16px', textAlign: 'center' }}>
              Item {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Test;
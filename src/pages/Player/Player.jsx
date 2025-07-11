import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams,useNavigate } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate=useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTY3Y2YzZWVlYTliNDRhNzMzMzQ4Y2U3ZWFmNDc2OSIsIm5iZiI6MTc1MTg5MTk4Ny41MjYsInN1YiI6IjY4NmJjMDEzNmM4MjIyZDhkZDZlODMzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjVvHSk1TQ7ouxXOSz5y036ZnDiNKge2_0pGE3fYf8I'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={()=>{navigate('/')}} />
      {apiData.key ? (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${apiData.key}`}
            width='90%'
            height='90%'
            title='Trailer'
            frameBorder='0'
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>{apiData.published_at.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Player;

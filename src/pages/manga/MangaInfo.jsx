import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getManga } from '../../services/MangaService';
import MangaDetailComponent from '../../components/manga/Details/MangaDetailsComponent';


const MangaInfo = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const res = await getManga(id);
        setManga(res);
      } catch (err) {
        console.error('Error fetching manga details:', err);
        setManga(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [id]);

  return (
    <div className='px-14 py-10'>
      {loading ? <p>Loading...</p> : <MangaDetailComponent manga={manga} />}
    </div>
  );
};

export default MangaInfo;

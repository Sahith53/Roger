import React, { useState, useEffect } from 'react';
import { fetchChapters } from '../../../services/MangaService';
import { Link } from 'react-router-dom';

const Chapters = ({ mangaId }) => {
  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChapters = async () => {
      try {
        const allChapters = await fetchChapters(mangaId);
        setChapters(allChapters);
        localStorage.setItem('chapters', JSON.stringify(allChapters));
        setFilteredChapters(allChapters);
      } catch (error) {
        console.error('Failed to fetch chapters:', error);
      } finally {
        setLoading(false);
      }
    };

    getChapters();
  }, [mangaId]);

  // Filter chapters based on search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredChapters(
      chapters.filter((chapter) =>
        chapter.chapter.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="max-w-4xl mt-20 mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
      </div>
      {loading ? (
        <p>Loading chapters...</p>
      ) : filteredChapters.length > 0 ? (
        <ul>
          {filteredChapters.map((chapter) => (
            <Link to={`./chapter/${chapter.id}`}>
            <li key={chapter.id} className="p-2 border-b border-gray-700">
            Chapter - {chapter.chapter}
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No chapters found.</p>
      )}
    </div>
  );
};

export default Chapters;
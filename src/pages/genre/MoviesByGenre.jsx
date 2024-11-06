import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/MovieCard';
import { getMoviesByGenre } from '../../services/MovieServices';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const SkeletonLoader = () => {
  return (
    <div className="flex justify-center flex-wrap gap-8">
      {Array(8).fill().map((_, index) => (
        <div key={index} className="w-64 h-96 bg-zinc-800/10 rounded-lg p-4">
          <Skeleton height={300} 
            baseColor='rgba(0,0,0,0.9)'
            enableAnimation={true}
            highlightColor='rgba(0,0,0,0.5)'
          />
          <Skeleton height={20} width="80%"
          baseColor='rgba(0,0,0,0.5)'
           className="mt-4 " />
          <Skeleton height={20} width="60%"
          baseColor='rgba(0,0,0,0.6)'
           className="mt-2" />
        </div>
      ))}
    </div>
  );
};

const MoviesByGenre = () => {
  const { genre_id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (page) => {
    try {
      const response = await getMoviesByGenre(genre_id, page);
      setMovies((prevMovies) => [...prevMovies, ...response.results]);
      setHasMore(response.results.length > 0);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1);
  }, [genre_id]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-full px-14 items-center justify-center py-6">
      <h1 className="text-2xl text-white font-bold mb-6">Movies by Genre</h1>
      {loading && page === 1 ? (
        <SkeletonLoader />
      ) : (
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<SkeletonLoader />}
          endMessage={
            <p style={{ textAlign: 'center', color: 'white' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex justify-center flex-wrap gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MoviesByGenre;

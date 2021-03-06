import React, { useEffect, useState } from 'react';
import { movieApi } from '../../api';
import { View, Text } from 'react-native';
import MoviesPresenter from './MoviesPresenter';

function MoviesContainer(props) {
  const [refreshing, setRefresing] = useState(false);
  const [movies, setMovies] = useState({
    loading: true,
    nowPlaying: [],
    popular: [],
    upcoming: [],
    nowPlayingError: null,
    popularError: null,
    upcomingError: null,
  });
  const getData = async () => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    setMovies({
      loading: false,
      nowPlaying,
      popular,
      upcoming,
      nowPlayingError,
      popularError,
      upcomingError,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // 531219
  // useEffect(() => {
  //   console.log(movies, 'movies');
  // }, [movies.loading]);

  if (movies.loading) return null;
  return <MoviesPresenter refreshFn={getData} {...movies} />;
}

export default MoviesContainer;

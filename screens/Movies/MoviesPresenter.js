import React, { Fragment } from 'react';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import {
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
  Dimensions,
  View,
} from 'react-native';
import ScrollContainer from '../../components/ScrollContainer';
import { apiImage } from '../../api';
import { formatDate, trimText } from '../../libs/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link, useNavigation } from '@react-navigation/native';
import Poster from '../../components/Poster';
import HorizontalSlider from '../../components/HorizontalSlider';
import Votes from '../../components/Votes';
import Vertical from '../../components/Vertical';
import List from '../../components/List';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const PlayingSliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 3}px;
  margin-bottom: 40px;
`;

const PlayingSlide = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  /* justify-content: center; */
  /* background-color: orange; */
  /* color: white; */
`;

const PlayingSlideBg = styled.Image`
  height: 100%;
  width: 100%;
  opacity: 0.4;
  position: absolute;
`;

const PlayingPosterContainer = styled.View`
  width: 30%;
  margin-left: 10%;
  margin-right: 2.5%;
`;

const PlayingInfomationContainer = styled.View`
  width: 50%;
  margin-right: 10%;
  margin-left: 2.5%;
`;

const PlayingInformationText = styled.Text`
  color: white;
`;

const PlayingTitle = styled(PlayingInformationText)`
  font-size: 20px;
  font-weight: 700;
`;

const PlayingOverview = styled(PlayingInformationText)`
  font-size: 14px;
`;

const PlayingViewButton = styled.View`
  margin-top: 10px;
  width: 150px;
  padding: 7px 0px;
  background-color: #e74c3c;
  border-radius: 3px;
`;

const PlayingViewButtonText = styled(PlayingInformationText)`
  text-align: center;
`;

const ContentContainer = styled.View``;

const PopularContainer = styled.View`
  align-items: center;
  margin-right: 20px;
`;

const PopularTitle = styled.Text`
  color: white;
  font-weight: 500;
  margin: 10px 0px 5px 0px;
`;

const UpcomingContainer = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: flex-start;
`;

const UpcomingData = styled.View`
  align-items: flex-start;
  width: 65%;
  margin-left: 25px;
`;

const UpcomingTitle = styled.Text`
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
`;

const UpcomingReleaseDate = styled.Text`
  color: white;
  opacity: 0.8;
  font-size: 12px;
`;

const UpcomingOverview = styled.Text`
  margin-top: 10px;
  color: white;
  opacity: 0.8;
`;

function MoviesPresenter({ refreshFn, loading, nowPlaying, popular, upcoming }) {
  const navigation = useNavigation();
  const goToDetail = config => {
    const { id, title, backgroundImage, votes, overview, poster } = config;
    navigation.navigate('Detail', {
      id,
      title,
      backgroundImage,
      votes,
      overview,
      poster,
    });
  };

  return (
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
      <>
        <Link to="/detail/531219">
          <Text>Go to 531219</Text>
        </Link>
        <PlayingSliderContainer>
          {/* <Fragment key={nowPlaying[2].id}>
            <SlideBg source={{ uri: apiImage(nowPlaying[2].backdrop_path) }} />
            <Slide>
              <PosterContainer>
                <Poster url={nowPlaying[2].poster_path} />
              </PosterContainer>
              <InfomationContainer>
                <Title>{trimText(nowPlaying[2].original_title, 40)}</Title>
                <Overview>{trimText(nowPlaying[2].overview, 80)}</Overview>
                <TouchableOpacity onPress={goToDetail}>
                  <ViewButton>
                    <ViewButtonText>View details</ViewButtonText>
                  </ViewButton>
                </TouchableOpacity>
              </InfomationContainer>
            </Slide>
          </Fragment> */}
          <Swiper controlsEnabled={false} loop timeout={3}>
            {nowPlaying.map(movie => {
              const formData = {
                id: movie.id,
                title: movie.original_title,
                backgroundImage: movie.backdrop_path,
                votes: movie.vote_average && movie.vote_average,
                overview: movie.overview,
                poster: movie.poster_path,
              };
              return (
                <Fragment key={movie.id}>
                  <PlayingSlideBg source={{ uri: apiImage(movie.backdrop_path) }} />
                  <PlayingSlide>
                    <PlayingPosterContainer>
                      <Poster url={movie.poster_path} />
                    </PlayingPosterContainer>
                    <PlayingInfomationContainer>
                      <PlayingTitle>{trimText(movie.original_title, 40)}</PlayingTitle>
                      <PlayingOverview>{trimText(movie.overview, 80)}</PlayingOverview>
                      {movie.vote_average > 0 && <Votes votes={movie.vote_average} />}
                      <Link to={`/detail/${movie.id}`}>
                        {/* <TouchableOpacity onPress={() => goToDetail(formData)}> */}
                        <PlayingViewButton>
                          <PlayingViewButtonText>View details</PlayingViewButtonText>
                        </PlayingViewButton>
                        {/* </TouchableOpacity> */}
                      </Link>
                    </PlayingInfomationContainer>
                  </PlayingSlide>
                </Fragment>
              );
            })}
          </Swiper>
        </PlayingSliderContainer>
        <ContentContainer>
          <HorizontalSlider title={'Popular Movies'}>
            {popular.map(movie => {
              const formData = {
                id: movie.id,
                title: movie.title,
                backgroundImage: movie.backdrop_path,
                votes: movie.vote_average && movie.vote_average,
                overview: movie.overview,
                poster: movie.poster_path,
              };
              return (
                <Fragment key={movie.id}>
                  <Link to={`/detail/${movie.id}`}>
                    {/* <TouchableOpacity onPress={() => goToDetail(formData)}> */}
                    <PopularContainer>
                      <Poster url={movie.poster_path} />
                      <PopularTitle>{trimText(movie.title, 10)}</PopularTitle>
                      {movie.vote_average > 0 && <Votes votes={movie.vote_average} />}
                    </PopularContainer>
                    {/* </TouchableOpacity> */}
                  </Link>
                </Fragment>
              );
            })}
          </HorizontalSlider>
          <List title="Coming Soon">
            {upcoming.map(movie => {
              // console.log(movie, 'movie');
              const formData = {
                id: movie.id,
                title: movie.title,
                backgroundImage: movie.backdrop_path,
                votes: movie.vote_average && movie.vote_average,
                overview: movie.overview,
                poster: movie.poster_path,
              };
              return (
                <Fragment key={movie.id}>
                  <Link to={`/detail/${movie.id}`}>
                    {/* <TouchableOpacity onPress={() => goToDetail(formData)}> */}
                    <UpcomingContainer>
                      <Poster url={movie.poster_path} />
                      <UpcomingData>
                        <UpcomingTitle>{trimText(movie.title, 10)}</UpcomingTitle>
                        {movie.release_date ? (
                          <UpcomingReleaseDate>
                            {formatDate(movie.release_date)}
                          </UpcomingReleaseDate>
                        ) : null}
                        <UpcomingOverview>{trimText(movie.overview, 80)}</UpcomingOverview>
                      </UpcomingData>
                    </UpcomingContainer>
                    {/* </TouchableOpacity> */}
                  </Link>
                </Fragment>
              );
            })}
          </List>
        </ContentContainer>
      </>
    </ScrollContainer>
  );
}

export default MoviesPresenter;

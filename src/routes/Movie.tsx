import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

interface Data {
  movie: Movie;
}

interface Movie {
  id: string;
  title: string;
  medium_cover_image: string;
  rating: number;
  isLiked: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(170, 170, 170, 1);
  padding: 10px;
  box-sizing: border-box;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;
`;

const Image = styled.div<{ image: string }>`
  display: flex;
  width: 50%;
  aspect-ratio: 2/3;
  background-color: red;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;
const Rating = styled.div``;

export default function MovieInfo() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery<Data>(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  if (loading) {
    return <h1>Fetching data...</h1>;
  }

  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment potatoMovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data?.movie.isLiked,
      },
    });
  };

  return (
    <Container>
      <MovieContainer>
        <Title>{data?.movie.title}</Title>
        <Image image={data?.movie.medium_cover_image || ""} />
        <Rating>{data?.movie.rating}</Rating>
        <button onClick={onClick}>
          {data?.movie.isLiked ? "Unlike" : "Like"}
        </button>
      </MovieContainer>
    </Container>
  );
}

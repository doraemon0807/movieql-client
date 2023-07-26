import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface Data {
  allTweets: Tweet[];
  allMovies: Movie[];
}

interface Movie {
  id: string;
  title: string;
  medium_cover_image: string;
}

interface Tweet {
  id: string;
  text: string;
  author: Author;
}

interface Author {
  fullName: string;
}

const ALL_MOVIES = gql`
  query data {
    allMovies {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(170, 170, 170, 1);
  padding: 10px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 60px;
  text-align: center;
  margin-bottom: 20px;
`;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const MovieBox = styled.div<{ image: string }>`
  display: flex;
  width: 100%;
  aspect-ratio: 2/3;
  background-color: red;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;

export default function Movies() {
  const { data, loading, error } = useQuery<Data>(ALL_MOVIES);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Could not fetch...</h1>;
  }
  return (
    <Container>
      <Title>Movies</Title>
      <MovieContainer>
        {data?.allMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieBox image={movie.medium_cover_image} />
          </Link>
        ))}
      </MovieContainer>
    </Container>
  );
}

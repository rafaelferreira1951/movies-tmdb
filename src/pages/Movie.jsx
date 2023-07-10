import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsFillFileEarmarkTextFill, BsGraphUp, BsHourglassSplit, BsWallet2 } from "react-icons/bs/index.esm";

import MovieCard from "../components/MovieCard"

import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
  
    const getMovie = async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovie(data);
    };
  
    const formatCurrency = (number) => {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    };
  
    useEffect(() => {
      const movieUrl = `${moviesURL}${id}?${apiKey}`;
      getMovie(movieUrl);
    }, []);
  
    if (!movie) {
      return <p>Carregando...</p>;
    }
  
    return (
      <div>
        <MovieCard movie={movie} showLink={false} />
        <p className="tagline">{movie.tagline}</p>
        <div className="tagline">
          <h3>
            <BsWallet2 /> Orçamento
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className="tagline">
          <h3>
            <BsGraphUp /> Receita
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className="tagline">
          <h3>
            <BsHourglassSplit /> Duração
          </h3>
          <p>{movie.runtime}</p>
        </div>
        <div className="description">
          <h3>
            <BsFillFileEarmarkTextFill /> Descrição
          </h3>
          <p>{movie.overview}</p>
        </div>
        {/* {movie && <>{movie.title}</>} */}
      </div>
    );
  };
  
  export default Movie;
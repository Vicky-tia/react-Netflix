import axios from "../api/axios";
import React, { useState, useEffect } from 'react'
import "./Row.css";
import MovieModal from "./MovieModal";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({isLargeRow, title, id, fetchUrl}) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelection]= useState({});

    useEffect(() => {
        fetchMovieData();
    // eslint-disable-next-line
    }, [fetchUrl]);

        const fetchMovieData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log('request', request);
        };

       const handClick =(movie)=>{
        setModalOpen(true)
        setMovieSelection(movie);
       }

    return (
        <section className="row">
            <h2>{title}</h2>
        
            <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
        },
        998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
        },
        625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
        0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
      }}
    >


        <div id={id} className="row_posters">
            {movies.map((movie) => (
                <SwiperSlide>
                <img
                key={movie.id}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                loading="lazy"
                alt={movie.name}
                onClick={() => handClick(movie)}
                 />
                 </SwiperSlide>
            ))}
        </div>
        </Swiper>

            {
                modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
                
            }
        </section>
    )
}

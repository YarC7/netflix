import { useState } from "react";
import Movie from "./interface/movie";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import YouTube, { YouTubeProps } from 'react-youtube';
import Modal from 'react-modal';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

export default function MovieList({title, data} : {title: string, data: Movie[]}) {
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("");
  const handleTrailer = async (id: number) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const movie = await fetch(url,options);
      const data = await movie.json();
      setKey(data.results[0].key)
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="bg-black text-white p-10 mb-1">
      <h2 className="uppercase text-2xl font-bold ">
        {title}
        <Carousel responsive={responsive} className="flex items-center space-x-4 mt-3">
          {data.length > 0 && data.map((item) => (
              <div key={item.id} className="w-[200px] h-[300px] relative group" 
                onClick={() => {
                  handleTrailer(item.id)
                  
                }}>
                <div className="w-full h-full group-hover:scale-105 transition-transform ease-in-out duration-500">
                  <div className="absolute w-full h-full bg-black/30 top-0 left-0"/>
                  <img src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`} alt={item.title} className="rounded-md w-full h-full object-cover"/>
                  <div className="absolute left-5 bottom-4">
                    <p className="uppercase text-sm">
                      {item.title || item.original_title}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </Carousel>
        <Modal
          isOpen={isOpen}
          onRequestClose={()=> setIsOpen(false)}
          style={
            {
              overlay: {
                position: 'fixed',
                zIndex: 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: 0,
                borderRadius: 16
              },
            }
          }
          contentLabel="Trailer"
        >
          <YouTube videoId={key} opts={opts} />
        </Modal>
      </h2>
    </div>
  )
}


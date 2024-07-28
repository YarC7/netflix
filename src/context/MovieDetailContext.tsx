import { createContext, useState, ReactNode, FC, useContext } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

// Define types for context values
export type MovieContextType = {
  handleTrailer: (movieId: number) => void;
}
const MovieContext = createContext<MovieContextType>({
  handleTrailer: () => {},
})

export const useGlobalContext = () => useContext(MovieContext)
// Create context with default value

// Define options for YouTube player
const opts = {  
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

// Define the props type for MovieProvider
interface MovieProviderProps {
  children: ReactNode;
}

const MovieProvider: FC<MovieProviderProps> = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const handleTrailer = async (movieId: number) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );

      const data = await response.json();
      setTrailerUrl(data.results[0]?.key || "");
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MovieContext.Provider value={{ handleTrailer }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
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
            borderRadius: 16,
            border: '1px solid black'
          },
        }}
        contentLabel="Example Modal"
      >
        {trailerUrl && (
          <div className="flex items-center justify-center">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};

export { MovieProvider, MovieContext };

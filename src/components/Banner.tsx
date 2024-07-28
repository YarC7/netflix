import IconRating from '../assets/rating.png'
import IconHalfRating from '../assets/rating-half.png'
import ImageTemp from '../assets/temp-1.jpeg'
import PlayButton from '../assets/play-button.png'
const Banner = () => {
    return (
        <div className="w-full h-[700px] bg-banner bg-center bg-no-repeat bg-cover relative">
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-30"></div>
            <div className="p-4 w-full h-full flex items-center 
            justify-center space-x-[30px] relative z-20">
                <div className='flex flex-col space-y-5 space-x-4 items-baseline w-[50%]'>
                    <p className="rounded-xl text-white bg-gradient-to-r from-red-600 to-red-300 text-md py-2 px-3">
                        TV Show
                    </p>
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-white text-4xl font-bold">Nghe nói em thích tôi</h2>
                        <div className="flex items-center space-x-3">
                            <img src={IconRating} alt="IconRating" className='w-8 h-8'/>
                            <img src={IconRating} alt="IconRating" className='w-8 h-8'/>
                            <img src={IconRating} alt="IconRating" className='w-8 h-8'/>
                            <img src={IconRating} alt="IconRating" className='w-8 h-8'/>
                            <img src={IconHalfRating} alt="IconHalfRating" className='w-8 h-8'/>
                        </div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                            Similique fugiat neque reprehenderit? Quod repellendus blanditiis iste soluta possimus reiciendis omnis ipsam quos error. 
                            Ad natus nulla sequi, ducimus repellat ullam!
                        </p>
                        <div className='flex items-center space-x-4'>
                            <button className='p-3 rounded-xl text-white bg-black'>Chi tiet</button>
                            <button className='p-3 rounded-xl text-white bg-red-600'>Xem phim</button>
                        </div>
                    </div>
                </div>
                <div className='w-[50%] items-center flex justify-center'>
                    <div className='w-[300px] h-[400px] relative group cursor-pointer'>
                        <img src={ImageTemp} alt="Image Teaser" className='w-full h-full object-cover rounded-xl'/>
                        <div className='w-full h-full flex absolute top-0 left-0 items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'>
                           <img src={PlayButton} alt="playbutton" className='w-16 h-16 relative z-20'/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner;
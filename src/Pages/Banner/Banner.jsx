import React, { use } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from 'react-simple-typewriter';
import { AuthContext } from '../../Context/AuthContext';

const Banner = () => {
    const loading =use(AuthContext);
    console.log(loading);
   
    return (
        <div>
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div className=' text-start py-20 md:py-40 bg-cover bg-center  px-5 md:px-20 text-white space-y-2 md:space-y-8  bg-c2' >
                


                </div>
                <div className='text-start bg-c1 py-20 md:py-40 bg-cover bg-center  px-5 md:px-20 text-white space-y-2 md:space-y-8' >
                    


                </div>
                <div className=' text-start py-20  bg-c3 md:py-40 bg-cover bg-center  px-5 md:px-20 text-white space-y-2 md:space-y-8'  >
                   

                  
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
import React, {ReactNode} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ImageSliderProps = {
    images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    console.log("ImageSlider: ", images)
    const settings = {
        dots: true,
        infinite: images.length > 1,
        speed: 500,
        slidesToShow: 1,  // 한 번에 한 개씩 표시
        slidesToScroll: 1, // 한 번에 한 개씩 넘김
        arrows: images.length > 1,      // 좌우 화살표 표시
    };

    return (
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            className="w-full h-96 object-cover"
                            alt={`slide-${index}`}
                        />
                    </div>
                ))}
            </Slider>
    );
};

export default ImageSlider;

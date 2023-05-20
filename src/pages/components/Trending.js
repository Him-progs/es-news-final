import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment/moment";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            }
          },
        {
            breakpoint: 420,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
    ]
  };

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch("/api/trending");
      const data = await res.json();
      console.log(data);
      setTrending(data);
    };
    fetchTrending();
  }, []);

  return (
    <div className="trending-cards">
    {/* <div className="col-md-12"> */}
    <h3 className="trending-title"><span class="iconify" data-icon="gridicons:trending"></span>Trending</h3>
    <Slider {...settings}>
      {trending?.map((item) => (
        item?.urlToImage ?
        <div className="card">
          <img
            className="card-img-top"
            src={item.urlToImage}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title" title={item.title}>{item.title}</h5>
            <p className="card-date">{moment(item.publishedAt).format("MMMM DD, YYYY hh:mm A")}</p>
          </div>
        </div>:null
      ))}
       </Slider>
    </div>
   
  );
};

export default Trending;

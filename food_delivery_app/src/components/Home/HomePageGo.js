import React, { useEffect, useState } from "react";
import classes from "./HomePageGo.module.css";
import { carousel } from "./Carousal/Carousal";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => sliderControler(), 5000);
    return () => clearInterval(id);
  }, []);

  const sliderControler = () => {
    setSliderIndex((prev) => (prev + 1) % carousel.length);
  };

  const showOptionHandler = () => {
    navigate("/menu");
  };

  return (
    <Card style={{ height: "84vh", paddingBottom: "0" }}>
      <div className={classes.mainContainer}></div>
      <div className={classes.hero}>
        <img src={carousel[sliderIndex].img} alt="homepage_img" />
        <div className={classes.blackLayer}></div>
        <div className={classes.hero_content}>
          <h2>{carousel[sliderIndex].text}</h2>
          <button onClick={showOptionHandler}>
            {carousel[sliderIndex].button}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default HomePage;

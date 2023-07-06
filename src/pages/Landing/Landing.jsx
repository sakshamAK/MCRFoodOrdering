import React, { useState } from "react";
import { cuisinesData } from "../../data";
import style from "./Landing.module.css"
import { Restaurant } from "../components/Restaurant/Restaurant";
import { useMyContext } from "../../context/myContext";

export const Landing = () => {

  const { setSelectedCuisine, setSelectedRestaurant, selectedCuisine } = useMyContext();

  const handleCuisineSelect = (cuisineId) => {
    setSelectedCuisine(cuisineId);
    setSelectedRestaurant(null);
  };

  return (
    <div className={style.foodmenu}>
      <h1>Food Ordering App</h1>
      <h2>Select Your Cuisine:</h2>
      <div className={style["cuisine-list"]}>
        {cuisinesData.map((cuisine) => (
          <div
            key={cuisine.id}
            className={`${style["cuisine"]} ${selectedCuisine === cuisine.id ? style["active"] : ""}`}
            onClick={() => handleCuisineSelect(cuisine.id)}
          >
            {cuisine.name}
          </div>
        ))}
      </div>
      <Restaurant cuisineSelect = {{selectedCuisine, setSelectedCuisine}} />
    </div>
  );
};

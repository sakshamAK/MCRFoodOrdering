import React, { useState } from 'react'
import { restaurantsData } from '../../../data';
import style from "./Restaurant.module.css"
import { useMyContext } from '../../../context/myContext';
import { Link } from 'react-router-dom';

export const Restaurant = () => {

    const { selectedCuisine, setSelectedRestaurant } = useMyContext();

    const handleRestaurantSelect = (restaurantId) => {
        setSelectedRestaurant(restaurantId);
    };

    return (
        <div>
            <div className={style["restaurant-list"]}>
                <h2>Restaurants</h2>
                {selectedCuisine ? (
                    restaurantsData
                        .filter((restaurant) => restaurant.cuisine_id === selectedCuisine)
                        .map((restaurant, idx) => (
                            <div
                                key={restaurant.id}
                                className={`${style["restaurant"]}`}
                                onClick={() => handleRestaurantSelect(restaurant.id)}
                            >
                                <Link to = {`/restaurant/${idx}`} className={style["restaurant-menu"]}>
                                    {restaurant.menu.map((menuItem, index) => (
                                        <div key={index} className={style["menu-item"]}>
                                            <img src={`https://picsum.photos/20${index}/20${index}`} />
                                            <div className={style["menu-content"]}>
                                                <div className={style["menu-details"]}>
                                                    <b>{menuItem}</b>
                                                    <span>{restaurant.name}</span>
                                                </div>
                                                <div className={style.price}>Rs. 500</div>
                                            </div>
                                        </div>
                                    ))}
                                </Link>
                            </div>
                        ))
                ) : (
                    <p>Please select a cuisine</p>
                )}
            </div>
        </div>
    )
}

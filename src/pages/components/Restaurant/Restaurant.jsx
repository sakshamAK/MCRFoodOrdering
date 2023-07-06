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
                {selectedCuisine && (
                    <>
                        {restaurantsData
                            .filter((restaurant) => restaurant.cuisine_id === selectedCuisine)
                            .map((restaurant, idx) => (
                                <div
                                    key={restaurant.id}
                                    className={`${style["restaurant"]}`}
                                    onClick={() => handleRestaurantSelect(restaurant.id)}
                                >
                                    <h2>Dishes by {restaurant.name}</h2>

                                    <Link to={`/restaurant/${idx}`} className={style["restaurant-menu"]}>
                                        {restaurant.menu.map((menuItem, index) => (
                                            <div key={index} className={style["menu-item"]}>
                                                <div className={style["menu-image"]}><img src={menuItem.imgSrc} /></div>
                                                <div className={style["menu-content"]}>
                                                    <div className={style["menu-details"]}>
                                                        <b>{menuItem.name}</b>
                                                        <div className={style.price}>Rs. {menuItem.price} for {menuItem.qty}</div>
                                                        <span className={style.price}>{restaurant.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Link>
                                </div>
                            ))}
                    </>
                )}
            </div>
        </div>
    )
}

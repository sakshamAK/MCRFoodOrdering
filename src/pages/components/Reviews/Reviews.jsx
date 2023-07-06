import React, { useState } from 'react'
import { useMyContext } from '../../../context/myContext';
import { cuisinesData, restaurantsData } from '../../../data';
import { Link, useParams } from 'react-router-dom';
import style from "./Reviews.module.css"

export const Reviews = () => {

    const [toggle, setToggle] = useState(false);
    const [avgRating, setAvgRating] = useState("no reviews yet");
    const { selectedRestaurant, comment, setComment, rating, setRating } = useMyContext();

    const handleRatingChange = (e) => {
        setRating(Number(e.target.value));
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddReview = () => {
        if (comment.trim() !== "" && rating !== 0) {
            const newReview = {
                revName: "John Doe",
                pp: "https://picsum.photos/30/30",
                comment,
                rating
            };

            if (selectedRestaurant) {
                const restaurant = restaurantsData.find((r) => r.id === selectedRestaurant);
                restaurant.ratings.push(newReview);
                restaurant.averageRating =
                    restaurant.ratings.reduce((acc, curr) => acc + curr.rating, 0) / restaurant.ratings.length;
            }

            setComment("");
            setRating(0);
        }
    };
    return (
        <div className={style.reviewContainer}>
            <Link to="/" className={`${style.back} material-symbols-outlined`}>
                arrow_back
            </Link>
            <div className={style["reviews-section"]}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                    <div className={style["restaurant-details"]}>
                        <h1>{restaurantsData.find(({ id }) => id === selectedRestaurant)?.name}</h1>
                        <span>{restaurantsData.find(({ id }) => id === selectedRestaurant)?.menu.map(item => item.name).join(",  ")}</span>
                        <span>{restaurantsData.find(({ id }) => id === selectedRestaurant)?.address}</span>
                        {/* <span>({restaurantsData.find(({ id }) => id === selectedRestaurant)?.phone})</span> */}
                        <span>Average Rating: {restaurantsData.find((restaurant) => restaurant.id === selectedRestaurant).averageRating.toFixed(1)}</span>
                    </div>

                    <button className={style.openReviewBox} onClick={() => setToggle(true)}>Add Review</button>
                </div>
                <hr />
                {selectedRestaurant ? (
                    <div className={style["review-section"]}>
                        <div style={{ width: "100%" }}>
                            <h2>Reviews</h2>
                            <div className={style["restaurant-reviews"]}>
                                {selectedRestaurant &&
                                    restaurantsData
                                        .filter((restaurant) => restaurant.id === selectedRestaurant)
                                        .map((restaurant) =>
                                            restaurant.ratings.length > 0 ? (
                                                <div key={restaurant.id}>
                                                    {restaurant.ratings.map(({ rating, comment, pp, revName }, index) => (
                                                        <>
                                                            <p key={index} style={{ display: "flex", gap: "1rem", flexDirection: "column", alignItems: "flex-start" }}>
                                                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%" }}>
                                                                    <img
                                                                        src={pp}
                                                                        style={{ borderRadius: "99px", height: "30px" }}
                                                                    /> <b>{revName}</b>
                                                                    <b className={style.rating}>
                                                                        <h3 style={{ margin: "0" }}>{rating}</h3>
                                                                        <span class="material-symbols-outlined" style={{ fontSize: "14px" }} >
                                                                            star
                                                                        </span>
                                                                    </b>
                                                                </div>
                                                                <span>{comment}</span>
                                                            </p>
                                                            <hr />
                                                        </>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>No reviews yet.</p>
                                            )
                                        )}
                            </div>
                        </div>
                        <div className={style["add-review"]} style={{ display: toggle ? "flex" : "none" }}>
                            <span className={`${style.close} material-symbols-outlined`} onClick={() => setToggle(false)}>
                                cancel
                            </span>
                            <h2>Add Your Review</h2>
                            <div className={style["set-rating"]}>
                                <label htmlFor="rating">Rating:</label>
                                <select id="rating" value={rating} onChange={handleRatingChange}>
                                    <option value={0}>Select Rating</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>
                            <div className={style["set-comment"]}>
                                <label htmlFor="comment">Comment:</label>
                                <textarea id="comment" value={comment} onChange={handleCommentChange}></textarea>
                            </div>
                            <button onClick={() => { handleAddReview(); setToggle(false); setAvgRating(); }}>Submit</button>
                        </div>
                    </div>
                ) : (
                    <p>Please select a restaurant</p>
                )}
            </div>
        </div>
    )
}

import { createContext, useContext, useState } from "react";

const MyContext = createContext(null)

export const useMyContext = () => useContext(MyContext);

export const MyContextProvider = ({ children }) => {
    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);


    return (
        <MyContext.Provider value = {{selectedCuisine, setSelectedCuisine, selectedRestaurant, setSelectedRestaurant, comment, setComment, rating, setRating}}>
            {children}
        </MyContext.Provider>
    )
}

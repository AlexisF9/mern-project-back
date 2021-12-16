import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const Card = ({post}) => {

    const [isLoading, setIsLoading] = useState(true);

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false); // dès qu'on a toutes les infos de nos users, on fait apparaitre les posts
    }, [usersData])

    return(
        <li key={post._id}>
            {isLoading ?
                <i className="fas fa-spinner fa-spin"></i>
            :
                <>
                    <div className="card-left">
                        <img 
                            src={
                                !isEmpty(usersData[0]) && // si il y a des users de chargé 
                                usersData.map((user) => {
                                    if (user._id === post.posterId) return user.picture; // si l'id de l'user et le posterid du post correspondent
                                }).join('')       
                            }
                        alt="poster-picture"/>
                    </div>
                    <div className="card-right">
                        <h2>{post._id}</h2>
                    </div>
                </>
            }
        </li>
    );
};

export default Card;
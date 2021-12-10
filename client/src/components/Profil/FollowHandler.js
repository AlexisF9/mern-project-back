import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const FollowHandler = ({idToFollow}) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollow = () => {

    }

    const handleUnFollow = () => {
        
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) { // si userData n'est pas vide
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        }
    }, [userData, idToFollow]) // relance le useEffect à chaque modif de userData

    return (
        <>
            {isFollowed && <button>Abonné</button>}
            {isFollowed === false && <button>Suivre</button>}
        </>
    )
};

export default FollowHandler;
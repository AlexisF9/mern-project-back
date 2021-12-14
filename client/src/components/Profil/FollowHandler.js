import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { followUser, unFollowUser } from "../../actions/user.actions";

const FollowHandler = ({idToFollow}) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow)); // on envoi au reducer l'action avec les 2 params
        setIsFollowed(true);
    }

    const handleUnFollow = () => {
        dispatch(unFollowUser(userData._id, idToFollow)); // idToFollow devient idToUnFollow dans l'action
        setIsFollowed(false);
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
            {isFollowed && !isEmpty(userData) && <button onClick={handleUnFollow}>Abonné</button>}
            {isFollowed === false && !isEmpty(userData) && <button onClick={handleFollow}>Suivre</button>}
        </>
    )
};

export default FollowHandler;
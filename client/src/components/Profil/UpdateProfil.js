import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { updateBio } from "../../actions/user.actions";
import UploadImg from "./UploadImg";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateFormBio, setUpdateFormBio] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);
    const [followingPopup, setFollowingPopup] = useState(false);

    // infos de l'user
    const userData = useSelector((state) => state.userReducer);
    // infos des users
    const usersData = useSelector((state) => state.usersReducer);

    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio)) // on envoi à updateBio l'id de l'user et la nouvelle bio
        setUpdateFormBio(false); 
    }

    return (
        <>
        <div className="profil-container">
            <div className="profil-left">
                <h1>Profil de {userData.pseudo}</h1>
                <img src={userData.picture}/>
                <UploadImg/>
            </div>
            <div className="profil-right">
                <h3>Ma bio</h3>
                {updateFormBio === false && 
                    <>
                        <p onClick={() => setUpdateFormBio(true)}>{userData.bio}</p>
                        <button onClick={() => setUpdateFormBio(true)}>Modifier ma bio</button>
                    </>
                }
                {updateFormBio && 
                    <>
                        <textarea defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                        <button onClick={handleUpdate}>Valider</button>
                    </>
                }
                <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                <div>
                    <button className="followersBtn" onClick={() => setFollowersPopup(true)}>Abonnés : {userData.followers ? userData.followers.length : 0}</button>
                    <button className="followingBtn" onClick={() => setFollowingPopup(true)}>Abonnements : {userData.following ? userData.following.length : 0}</button>
                </div>
            </div>
        </div>
        {followersPopup &&
            <>
            <div className="overlay" onClick={() => setFollowersPopup(false)}></div>
            <div className="followersPopup">
                <span onClick={() => setFollowersPopup(false)}>&#10005;</span>
                <h3>Abonnés :</h3>
                <ul>
                    {usersData.map((users) => { // on test tout nos users un par un 
                        for (let i = 0; i < userData.followers.length; i++) { // on liste tout les followers et on regarde si un match avec la laiste complete des users
                            if (users._id === userData.followers[i]) { // si l'user est dans la liste des followers 
                                return (
                                    <li>
                                        <div>
                                            <img src={users.picture} alt=""/>
                                            <h4>{users.pseudo}</h4>
                                        </div>
                                        <FollowHandler idToFollow={users._id}/>
                                    </li>
                                )
                            }
                        }
                    })}
                </ul>
            </div> </>}
        {followingPopup && 
            <>
            <div className="overlay" onClick={() => setFollowingPopup(false)}></div>
            <div className="followingPopup">
            <span onClick={() => setFollowingPopup(false)}>&#10005;</span>
            <h3>Abonnements :</h3>
            <ul>
                {usersData.map((users) => {
                    for (let i = 0; i < userData.following.length; i++) {
                        if (users._id === userData.following[i]) {
                            return (
                                <li>
                                    <div>
                                        <img src={users.picture} alt=""/>
                                        <h4>{users.pseudo}</h4>
                                    </div>
                                    <FollowHandler idToFollow={users._id}/>
                                </li>
                            )
                        }
                    }
                })}
            </ul>
        </div></>}
        </>
    )
};

export default UpdateProfil;
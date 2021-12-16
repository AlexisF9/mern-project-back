import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
    const [loadPosts, setLoadPosts] = useState(true);

    const dispatch = useDispatch();
    const postsData = useSelector((state) => state.postsReducer);

    useEffect(() => {
        if (loadPosts) {
            dispatch(getPosts());
            setLoadPosts(false);
        }
    }, [loadPosts, dispatch])

    return(
        <div>
            <ul>
                {!isEmpty(postsData[0]) &&
                    postsData.map((posts) => {
                        return <Card post={posts} key={posts._id}/>
                    })
                }
            </ul>
        </div>
    );
};

export default Thread;
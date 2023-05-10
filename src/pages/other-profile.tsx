import React, {FC, useEffect} from "react";
import { useSelector, useDispatch } from "../services/types/store";
import { Redirect, useParams } from 'react-router-dom'
import './profile.scss'
import Navigation from "../components/navigation/navigation";
import { getOtherUserProfile } from "../services/actions/other-profile";
import noProfilePic from '../images/no-profile-pic.svg'
import filledHeart from '../images/filled-heart.svg'
import heart from '../images/heart.svg'
import { likeOther } from "../services/actions/other-profile";
import { addFriend, cancelFriendReq, deleteFriendReq, sendFriendReq } from "../services/actions/friends";
import { TFriends } from "../services/types/friends";

const OtherProfile: FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{id: string}>();
    const { userInfo, posts, isRequest, isFailed } = useSelector((store) => store.otherUser)
    const { user } = useSelector((store) => store.user)
    const {friends, friends_req, friends_pending} = useSelector((store) => store.friends)

    const handleLike = (id: string) => {
        dispatch(likeOther(id, user!._id))
    }

    const addToFriends = (id: string) => {
        dispatch(addFriend(id))
    }

    const cancelFriendRequest = (id: string) => {
        dispatch(cancelFriendReq(id))
    }

    const deleteFriend = (id: string) => {
        dispatch(deleteFriendReq(id))
    }

    const sendFriendRequest = (person: TFriends) => {
        dispatch(sendFriendReq(person))
    }
    
    useEffect(() => {
        dispatch(getOtherUserProfile(id))
    }, [dispatch, id])

    if(id === user?._id) {
        return <Redirect to="/profile"/>
    }

    if(!userInfo) {
        return null
    }
    return (
        <div className="profile-container">
            <Navigation />
            <div className="profile-content-container">
                {
                    isRequest ?
                    <p className="p-center">Loading...</p> :
                    isFailed ?
                    <p className="p-center">Что-то пошло не так. Пожалуйста, перезагрузите страницу.</p> :
                    <>
                        <section className='user-info'>
                            {
                                userInfo?.profilePicture ?
                                    <img src={`https://fair-gold-crane-tie.cyclic.app/${userInfo.profilePicture}`} alt="profile"/> :
                                    <img src={noProfilePic} alt="no profile"/>
                            }
                            <div>
                                <p className='username'>{userInfo?.username}</p>
                                <p className='description'>Город: {userInfo?.city}</p>
                                <p className='description'>Возраст: {userInfo?.age}</p>
                                <p className='description'>Место обучения: {userInfo?.university}</p>
                            </div> 
                            {
                                friends?.find(item => item._id === userInfo._id) ? 
                                    <button type="button" onClick={() => deleteFriend(userInfo._id)}>Удалить из друзей</button> :
                                    friends_req?.find(item=>item._id===userInfo._id) ?
                                    <button type="button" onClick={() => addToFriends(userInfo._id)}>Принять заявку</button> :
                                    friends_pending?.find(item=>item._id===userInfo._id) ? 
                                    <button type="button" onClick={() => cancelFriendRequest(userInfo._id)}>Отменить заявку</button> :
                                    <button type="button" onClick={() => sendFriendRequest(userInfo)}>Добавить в друзья</button>
                            }
                        </section>
                        <section className='user-posts'>
                            <h1>Посты {userInfo.username}:</h1>
                            {posts && posts.map((item) => {
                                return (
                                    <div key={item._id} className='post'>
                                        <p>{item.description}</p>
                                        {item.image && <img src={`https://fair-gold-crane-tie.cyclic.app/${item.image}`} alt="post"/>}
                                        <div className='likes'>
                                            <span>{item.likes.length}</span>
                                            <img
                                                src={item.likes.includes(user!._id) ? filledHeart : heart}
                                                alt="like"
                                                onClick={() => handleLike(item._id)}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                    </>
                }
            </div>
        </div>
    )
}

export default OtherProfile;
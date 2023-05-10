import React, {FC, useEffect} from "react";
import { useDispatch, useSelector } from "../services/types/store";
import Navigation from "../components/navigation/navigation";
import './friends.scss'
import { deleteFriendReq, getAllFriends } from "../services/actions/friends";
import noProfilePic from '../images/no-profile-pic.svg'
import { Link } from "react-router-dom";

const Friends: FC = () => {
    const dispatch = useDispatch()
    const { friends, isFriendsRequest, isFriendsFailed } = useSelector((store) => store.friends)

    const deleteFriend = (friendId: string) => {
        dispatch(deleteFriendReq(friendId))
    }

    useEffect(() => {
        dispatch(getAllFriends())
    }, [dispatch])

    return (
        <div className="friends-container">
            <Navigation />
            <div className="friends-content-container">
                {
                    isFriendsRequest ?
                    <p className="p-center">Loading...</p> :
                    isFriendsFailed ?
                    <p className="p-center">Не удалось загрузить список друзей. Пожалуйста, перезагрузите страницу.</p> :
                    friends?.length === 0 ? 
                    <p className="p-center">Пока нет друзей.</p> : 
                    friends?.map((friend) => {
                        return(
                            <div className="friend-info" key={friend._id}>
                                {
                                    friend?.profilePicture ?
                                        <img src={`http://st:8800/${friend.profilePicture}`} alt="profile"/> :
                                        <img src={noProfilePic} alt="no profile"/>
                                }
                                <Link to={`/${friend._id}/profile`}><p>{friend.username}</p></Link>
                                <button type="button" onClick={() => deleteFriend(friend._id)}>Удалить из друзей</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Friends
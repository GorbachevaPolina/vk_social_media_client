import React, {FC, useEffect} from "react";
import { useDispatch, useSelector } from "../services/types/store";
import Navigation from "../components/navigation/navigation";
import './friends.scss'
import { deleteFriendReq, getAllFriends } from "../services/actions/friends";
import noProfilePic from '../images/no-profile-pic.svg'

const Friends: FC = () => {
    const dispatch = useDispatch()
    const { friends } = useSelector((store) => store.friends)

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
                    friends?.map((friend) => {
                        return(
                            <div className="friend-info" key={friend._id}>
                                {
                                    friend?.profilePicture ?
                                        <img src={`http://localhost:8800/${friend.profilePicture}`} alt="profile"/> :
                                        <img src={noProfilePic} alt="no profile"/>
                                }
                                <p>{friend.username}</p>
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
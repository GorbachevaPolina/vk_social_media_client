import React, {FC, useEffect} from 'react'
import { useSelector, useDispatch } from '../services/types/store'
import Navigation from '../components/navigation/navigation'
import './profile.scss'
import noProfilePic from '../images/no-profile-pic.svg'
import { getUserPosts, like } from '../services/actions/user-posts'
import CreatePost from '../components/create-post/create-post'
import filledHeart from '../images/filled-heart.svg'
import heart from '../images/heart.svg'

const Profile: FC = () => {
    const { user } = useSelector((store) => store.user)
    const { posts } = useSelector((store) => store.userPosts)
    const dispatch = useDispatch()

    const handleLike = (id: string) => {
        dispatch(like(id))
    }

    useEffect(() => {
        dispatch(getUserPosts())
    }, [dispatch])

    if(!user) {
        return null
    }
    return(
        <div className='profile-container'>
            <Navigation />
            <div className='profile-content-container'>
                <section className='user-info'>
                    {
                        user?.profilePicture ?
                            <img src={`http://localhost:8800/${user.profilePicture}`} alt="profile"/> :
                            <img src={noProfilePic} alt="no profile"/>
                    }
                    <div>
                        <p className='username'>{user?.username}</p>
                        <p className='description'>Город: {user?.city}</p>
                        <p className='description'>Возраст: {user?.age}</p>
                        <p className='description'>Место обучения: {user?.university}</p>
                    </div>
                </section>
                <section className='user-posts'>
                    <h1>Ваши посты:</h1>
                    <CreatePost />
                    {posts && posts.map((item) => {
                        return (
                            <div key={item._id} className='post'>
                                <p>{item.description}</p>
                                {item.image && <img src={`http://localhost:8800/${item.image}`} alt="post"/>}
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
            </div>
        </div>
    )
}

export default Profile
import React, {FC, useEffect} from 'react'
import { useSelector, useDispatch } from '../services/types/store'
import Navigation from '../components/navigation/navigation'
import './profile.scss'
import noProfilePic from '../images/no-profile-pic.svg'
import { getUserPosts } from '../services/actions/user-posts'

const Profile: FC = () => {
    const { user } = useSelector((store) => store.user)
    const { posts } = useSelector((store) => store.userPosts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserPosts())
    }, [dispatch])

    return(
        <div className='profile-container'>
            <Navigation />
            <div className='profile-content-container'>
                <section className='user-info'>
                    <img src={noProfilePic} alt="no profile picture"/>
                    <div>
                        <p className='username'>{user?.username}</p>
                        <p className='description'>Город: {user?.city}</p>
                        <p className='description'>Возраст: {user?.age}</p>
                        <p className='description'>Место обучения: {user?.university}</p>
                    </div>
                </section>
                <section className='user-posts'>
                    <h1>Ваши посты:</h1>
                    {posts && posts.map((item) => {
                        return (
                            <div key={item._id} className='post'>
                                <p>{item.description}</p>
                                {item.image && <img src={item.image} alt="post"/>}
                                <span>{item.likes.length}</span>
                            </div>
                        )
                    })}
                </section>
            </div>
        </div>
    )
}

export default Profile
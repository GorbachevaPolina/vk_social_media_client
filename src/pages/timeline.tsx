import React, {FC, useEffect} from 'react'
import Navigation from '../components/navigation/navigation'
import { useDispatch, useSelector } from '../services/types/store'
import './timeline.scss'
import { getTimelineReq } from '../services/actions/timeline'
import filledHeart from '../images/filled-heart.svg'
import heart from '../images/heart.svg'
import noProfilePic from '../images/no-profile-pic.svg'
import { likeTimeline } from '../services/actions/timeline'
import { Link } from 'react-router-dom'

const Timeline: FC = () => {
    const dispatch = useDispatch()
    const { timeline } = useSelector((store) => store.timeline)
    const { user } = useSelector((store) => store.user)

    const handleLike = (id: string) => {
        dispatch(likeTimeline(id, user!._id))
    }

    useEffect(() => {
        dispatch(getTimelineReq())
    }, [dispatch])

    return(
        <div className='timeline-container'>
            <Navigation />
            <div className='timeline-content-container'>
                {
                    timeline && timeline.map((item) => {
                        return(
                            <div key={item._id} className='post'>
                                <div className='user-info'>
                                    {
                                        item?.profilePicture ?
                                            <img src={`http://localhost:8800/${item.profilePicture}`} alt="profile"/> :
                                            <img src={noProfilePic} alt="no profile"/>
                                    }
                                    <Link to={`/${item.userId}/profile`}><p>{item.username}</p></Link>
                                </div>
                                <p className='description'>{item.description}</p>
                                {item.image && <img src={`http://localhost:8800/${item.image}`} alt="post" className='post-image'/>}
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
                    })
                }
            </div>
        </div>
    )
}

export default Timeline
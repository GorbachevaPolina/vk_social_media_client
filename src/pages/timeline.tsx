import React, {FC, useEffect, useState} from 'react'
import Navigation from '../components/navigation/navigation'
import { useDispatch, useSelector } from '../services/types/store'
import './timeline.scss'
import filledHeart from '../images/filled-heart.svg'
import heart from '../images/heart.svg'
import noProfilePic from '../images/no-profile-pic.svg'
// import { likeTimeline } from '../services/actions/timeline'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import { TTimelinePost } from '../services/types/timeline'
import { getTimeline, likeTimeline } from '../services/utils/timeline'

const Timeline: FC = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)
    const [offset, setOffset] = useState(0)
    // const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [posts, setPosts] = useState<TTimelinePost[]>([])

    const handleLike = (id: string) => {
        // dispatch(likeTimeline(id, user!._id))
        likeTimeline(id);
        setPosts(posts.map((item) => {
            if (item._id === id) {
                if(!item.likes.includes(user!._id))
                    item.likes.push(user!._id)
                else item.likes = item.likes.filter(item => item !== user!._id)
            }
            return item
        }))
    }

    const fetchPosts = async () => {
        // setOffset(prev=>prev+5)
        // dispatch(getTimelineReq(offset))
        let res = await getTimeline(offset);
        console.log(res.length)
        setPosts([...posts, ...res])
        setOffset(prev=>prev+5)
        setHasMore(res.length > 0)
    }

    useEffect(() => {
        // dispatch(getTimelineReq(offset))
        // setOffset(5)
        fetchPosts()
    }, [])

    return(
        <div className='timeline-container'>
            <Navigation />
            <div className='timeline-content-container'>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={hasMore}
                    loader={<p style={{textAlign: "center"}}>Loading...</p>}
                >
                {
                    posts && posts.map((item) => {
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
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Timeline
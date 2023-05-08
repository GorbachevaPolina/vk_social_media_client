import React, {FC, useState, useEffect} from 'react'
import Navigation from '../components/navigation/navigation';
import { useDispatch, useSelector } from '../services/types/store';
import './people.scss'
import { getAllPeople } from '../services/actions/friends';
import noProfilePic from '../images/no-profile-pic.svg'

const People: FC = () => {
    const dispatch = useDispatch();
    const { friends_req, friends_pending } = useSelector((store) => store.friends)
    const [isRequests, setIsRequests] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        dispatch(getAllPeople())
    }, [dispatch])

    return(
        <div className='people-container'>
            <Navigation />
            <div className='people-content-container'>
                <section className='incoming-requests-container'>
                    <p className='dropdown' onClick={() => setIsRequests(!isRequests)}>
                        Заявки в друзья
                        <span className='number'>
                            {friends_req && friends_req.length}
                        </span>
                        <span className='arrow-down'>
                            &#8744;
                        </span>
                    </p>
                    {
                        isRequests && friends_req ? 
                        friends_req.length > 1 ? 
                        friends_req.map((person) => {
                            return(
                                <div key={person._id} className='person'>
                                    {
                                        person?.profilePicture ?
                                            <img src={`http://localhost:8800/${person.profilePicture}`} alt="profile"/> :
                                            <img src={noProfilePic} alt="no profile"/>
                                    }
                                    <p>{person.username}</p>
                                    <button type="button">Добавить в друзья</button>
                                </div>
                            )
                        }) : <p className='person'>Нет входящих заявок в друзья</p> : null
                    }
                </section>
                <section className='pending-requests-container'>
                    <p className='dropdown' onClick={() => setIsPending(!isPending)}>
                        Отправленные заявки
                        <span className='number'>
                            {friends_pending && friends_pending.length}
                        </span>
                        <span className='arrow-down'>
                            &#8744;
                        </span>
                    </p>
                    {
                        isPending && friends_pending ? 
                        friends_pending.length > 1 ? 
                        friends_pending.map((person) => {
                            return(
                                <div key={person._id} className='person'>
                                    {
                                        person?.profilePicture ?
                                            <img src={`http://localhost:8800/${person.profilePicture}`} alt="profile"/> :
                                            <img src={noProfilePic} alt="no profile"/>
                                    }
                                    <p>{person.username}</p>
                                    <button type="button">Добавить в друзья</button>
                                </div>
                            )
                        }) : <p className='person'>Нет исходящих заявок в друзья</p> : null
                    }
                </section>
            </div>
        </div>
    )
}

export default People;
import React, {FC, useState, useEffect} from 'react'
import Navigation from '../components/navigation/navigation';
import { useDispatch, useSelector } from '../services/types/store';
import './people.scss'
import { addFriend, getAllPeople, cancelFriendReq, deleteFriendReq, sendFriendReq } from '../services/actions/friends';
import noProfilePic from '../images/no-profile-pic.svg'
import { URL } from '../services/utils/URL';
import { TFriends } from '../services/types/friends';
import { Link } from 'react-router-dom';

const People: FC = () => {
    const dispatch = useDispatch();
    const { friends, friends_req, friends_pending } = useSelector((store) => store.friends)
    const { user } = useSelector((store) => store.user)
    const [isRequests, setIsRequests] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [input, setInput] = useState("")
    const [users, setUsers] = useState<null | TFriends[]>(null)

    const addToFriends = (id: string) => {
        dispatch(addFriend(id))
    }

    const cancelFriendRequest = (id: string) => {
        dispatch(cancelFriendReq(id))
    }

    const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        const response = await fetch(`${URL}/api/users/people/search?search=${e.target.value}`)
        const result = await response.json()
        setUsers(result)
    }

    const deleteFriend = (id: string) => {
        dispatch(deleteFriendReq(id))
    }

    const sendFriendRequest = (person: TFriends) => {
        dispatch(sendFriendReq(person))
    }

    useEffect(() => {
        dispatch(getAllPeople())
    }, [dispatch])

    return(
        <div className='people-container'>
            <Navigation />
            <div className='people-content-container'>
                <section className='search-bar'>
                    <input 
                        value={input}
                        onChange={(e) => onSearch(e)}
                        placeholder='Искать людей'
                    />
                </section>
                {
                    input === "" ?
                    (<>
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
                                friends_req.length > 0 ? 
                                friends_req.map((person) => {
                                    return(
                                        <div key={person._id} className='person'>
                                            {
                                                person?.profilePicture ?
                                                    <img src={`${URL}/${person.profilePicture}`} alt="profile"/> :
                                                    <img src={noProfilePic} alt="no profile"/>
                                            }
                                            <Link to={`/${person._id}/profile`}><p>{person.username}</p></Link>
                                            <button type="button" onClick={() => addToFriends(person._id)}>Добавить в друзья</button>
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
                                friends_pending.length > 0 ? 
                                friends_pending.map((person) => {
                                    return(
                                        <div key={person._id} className='person'>
                                            {
                                                person?.profilePicture ?
                                                    <img src={`${URL}/${person.profilePicture}`} alt="profile"/> :
                                                    <img src={noProfilePic} alt="no profile"/>
                                            }
                                            <Link to={`/${person._id}/profile`}><p>{person.username}</p></Link>
                                            <button type="button" onClick={() => cancelFriendRequest(person._id)}>Отменить</button>
                                        </div>
                                    )
                                }) : <p className='person'>Нет исходящих заявок в друзья</p> : null
                            }
                        </section>
                    </>) : users !== null && users.length > 0 ? (<div>
                        {users.map((person) => {
                            return(
                                <div key={person._id} className='person'>
                                    {
                                        person?.profilePicture ?
                                            <img src={`${URL}/${person.profilePicture}`} alt="profile"/> :
                                            <img src={noProfilePic} alt="no profile"/>
                                    }
                                    <Link to={`/${person._id}/profile`}><p>{person.username}</p></Link>
                                    {
                                        friends?.find(item => item._id === person._id) ? 
                                            <button type="button" onClick={() => deleteFriend(person._id)}>Удалить из друзей</button> :
                                            friends_req?.find(item=>item._id===person._id) ?
                                            <button type="button" onClick={() => addToFriends(person._id)}>Принять заявку</button> :
                                            friends_pending?.find(item=>item._id===person._id) ? 
                                            <button type="button" onClick={() => cancelFriendRequest(person._id)}>Отменить</button> :
                                            user?._id === person._id ? 
                                            <span>Это вы</span> :
                                            <button type="button" onClick={() => sendFriendRequest(person)}>Добавить в друзья</button>
                                    }
                                </div>
                            )
                        })}
                    </div>) : <p>Не найдено</p>
                }
            </div>
        </div>
    )
}

export default People;
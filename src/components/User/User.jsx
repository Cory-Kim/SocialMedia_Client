import React from 'react'
import { useDispatch } from 'react-redux';
import { followUser } from '../../actions/userAction';
import { useSelector } from 'react-redux';
import { unFollowUser } from '../../actions/userAction';
import { useState } from 'react';

const User = ({ person }) =>
{
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(person.followers.includes(user._id));
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollow = () =>
  {
    following ? dispatch(unFollowUser(person._id, user)) : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  }

  return (
    <div className="follower">
      <div>
        <img src={person.coverPicture ? serverPublic + person.profilePicture : serverPublic + "user.png"} alt="" className="followerImage" />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button className={following ? "button fc-button UnfollowButton" : "button fc-button"} onClick={handleFollow}>{following ? "Unfollow" : "Follow"}</button>
    </div>
  );
};

export default User;
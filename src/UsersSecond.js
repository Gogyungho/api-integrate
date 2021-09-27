import React, {useState} from 'react';
// import axios from 'axios';
// import {useAsync} from 'react-async';
import User from './User';
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';

// async function getUsers() {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
//     return response.data;
// }

function UsersSecond() {

    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();
    // const {data: users, error, isLoading, reload} = useAsync({
    //     promiseFn: getUsers,
    // })

    const {loading, data: users, error} = state.users;

    const fetchData = () => {
        getUsers(dispatch);
    }
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러가 발생했습니다. </div>
    if(!users) return <button onClick={fetchData}>불러오기</button>;
    return  (
        <>
    <ul>
       {users.map(user =>( <li key={user.id} onClick={() => setUserId(user.id)}>
             {user.username} {(user.name)}
       </li>
       ))}
    </ul>
    <button onClick = {fetchData}>다시 불러오기</button>
       { userId && <User id={userId} /> }
    </>
    );
}

export default UsersSecond;

/*
react-async의 장단점 
장점으로는 필요할때 바로 설치해서 사용할 수 있다. 컴포넌트에서 비동기 작업할때 필요한 기능들도 가지고있다. 
특정 promise를 기다리는 작업을 도중에 취소할수 있다. 
단점은 옵션이 복잡하다. 
*/
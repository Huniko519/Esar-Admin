import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getUsers = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllUsers(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchUsers(pageNo+1,pageSize,search);
        } catch(err) {
            return {
                data:[],
                total:0
            }
        }
    }
    if (
    res &&
    res.data &&
    res.data.data &&
    res.data.data.data &&
    res.data.data.data.length > 0) {
    return res.data.data;
    } else {
        return {
            data:[],
            total:0
        }
    }
}


const addUsers = (data) => {
return api.post(`/users`,data)
}
const updateUsers = (id,data) => {
return api.put(`/users/${id}`,data)
}
const getAllUsers = (page,paginator) => {
return api.get(`/users/?page=${page}&paginator=${paginator}`)
}
const getOneUsers = (id) => {
return api.get(`/users/${id}`)
}
const searchUsers = (page,paginator,searchKey) => {
return api.get(`/users/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteUsers = (id) => {
return api.delete(`/users/${id}`)
}
export {getUsers,addUsers,updateUsers,getAllUsers,getOneUsers,searchUsers,deleteUsers}



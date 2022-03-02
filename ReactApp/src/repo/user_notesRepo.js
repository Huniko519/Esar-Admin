import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getUser_Notes = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllUser_Notes(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchUser_Notes(pageNo+1,pageSize,search);
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


const addUser_Notes = (data) => {
return api.post(`/user_notes`,data)
}
const updateUser_Notes = (id,data) => {
return api.put(`/user_notes/${id}`,data)
}
const getAllUser_Notes = (page,paginator) => {
return api.get(`/user_notes/?page=${page}&paginator=${paginator}`)
}
const getOneUser_Notes = (id) => {
return api.get(`/user_notes/${id}`)
}
const searchUser_Notes = (page,paginator,searchKey) => {
return api.get(`/user_notes/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteUser_Notes = (id) => {
return api.delete(`/user_notes/${id}`)
}
export {getUser_Notes,addUser_Notes,updateUser_Notes,getAllUser_Notes,getOneUser_Notes,searchUser_Notes,deleteUser_Notes}



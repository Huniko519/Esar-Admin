import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getChats = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllChats(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchChats(pageNo+1,pageSize,search);
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


const addChats = (data) => {
return api.post(`/chats`,data)
}
const updateChats = (id,data) => {
return api.put(`/chats/${id}`,data)
}
const getAllChats = (page,paginator) => {
return api.get(`/chats/?page=${page}&paginator=${paginator}`)
}
const getOneChats = (id) => {
return api.get(`/chats/${id}`)
}
const searchChats = (page,paginator,searchKey) => {
return api.get(`/chats/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteChats = (id) => {
return api.delete(`/chats/${id}`)
}
export {getChats,addChats,updateChats,getAllChats,getOneChats,searchChats,deleteChats}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getChat_Messages = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllChat_Messages(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchChat_Messages(pageNo+1,pageSize,search);
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


const addChat_Messages = (data) => {
return api.post(`/chat_messages`,data)
}
const updateChat_Messages = (id,data) => {
return api.put(`/chat_messages/${id}`,data)
}
const getAllChat_Messages = (page,paginator) => {
return api.get(`/chat_messages/?page=${page}&paginator=${paginator}`)
}
const getOneChat_Messages = (id) => {
return api.get(`/chat_messages/${id}`)
}
const searchChat_Messages = (page,paginator,searchKey) => {
return api.get(`/chat_messages/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteChat_Messages = (id) => {
return api.delete(`/chat_messages/${id}`)
}
export {getChat_Messages,addChat_Messages,updateChat_Messages,getAllChat_Messages,getOneChat_Messages,searchChat_Messages,deleteChat_Messages}



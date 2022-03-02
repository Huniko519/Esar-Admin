import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getResponse_Messages = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllResponse_Messages(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchResponse_Messages(pageNo+1,pageSize,search);
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


const addResponse_Messages = (data) => {
return api.post(`/response_messages`,data)
}
const updateResponse_Messages = (id,data) => {
return api.put(`/response_messages/${id}`,data)
}
const getAllResponse_Messages = (page,paginator) => {
return api.get(`/response_messages/?page=${page}&paginator=${paginator}`)
}
const getOneResponse_Messages = (id) => {
return api.get(`/response_messages/${id}`)
}
const searchResponse_Messages = (page,paginator,searchKey) => {
return api.get(`/response_messages/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteResponse_Messages = (id) => {
return api.delete(`/response_messages/${id}`)
}
export {getResponse_Messages,addResponse_Messages,updateResponse_Messages,getAllResponse_Messages,getOneResponse_Messages,searchResponse_Messages,deleteResponse_Messages}



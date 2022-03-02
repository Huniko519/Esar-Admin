import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTemp_Messages = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTemp_Messages(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTemp_Messages(pageNo+1,pageSize,search);
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


const addTemp_Messages = (data) => {
return api.post(`/temp_messages`,data)
}
const updateTemp_Messages = (id,data) => {
return api.put(`/temp_messages/${id}`,data)
}
const getAllTemp_Messages = (page,paginator) => {
return api.get(`/temp_messages/?page=${page}&paginator=${paginator}`)
}
const getOneTemp_Messages = (id) => {
return api.get(`/temp_messages/${id}`)
}
const searchTemp_Messages = (page,paginator,searchKey) => {
return api.get(`/temp_messages/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTemp_Messages = (id) => {
return api.delete(`/temp_messages/${id}`)
}
export {getTemp_Messages,addTemp_Messages,updateTemp_Messages,getAllTemp_Messages,getOneTemp_Messages,searchTemp_Messages,deleteTemp_Messages}



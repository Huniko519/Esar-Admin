import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getError_Logs = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllError_Logs(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchError_Logs(pageNo+1,pageSize,search);
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


const addError_Logs = (data) => {
return api.post(`/error_logs`,data)
}
const updateError_Logs = (id,data) => {
return api.put(`/error_logs/${id}`,data)
}
const getAllError_Logs = (page,paginator) => {
return api.get(`/error_logs/?page=${page}&paginator=${paginator}`)
}
const getOneError_Logs = (id) => {
return api.get(`/error_logs/${id}`)
}
const searchError_Logs = (page,paginator,searchKey) => {
return api.get(`/error_logs/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteError_Logs = (id) => {
return api.delete(`/error_logs/${id}`)
}
export {getError_Logs,addError_Logs,updateError_Logs,getAllError_Logs,getOneError_Logs,searchError_Logs,deleteError_Logs}



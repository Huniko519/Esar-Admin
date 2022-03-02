import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getActivity_Requests = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllActivity_Requests(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchActivity_Requests(pageNo+1,pageSize,search);
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


const addActivity_Requests = (data) => {
return api.post(`/activity_requests`,data)
}
const updateActivity_Requests = (id,data) => {
return api.put(`/activity_requests/${id}`,data)
}
const getAllActivity_Requests = (page,paginator) => {
return api.get(`/activity_requests/?page=${page}&paginator=${paginator}`)
}
const getOneActivity_Requests = (id) => {
return api.get(`/activity_requests/${id}`)
}
const searchActivity_Requests = (page,paginator,searchKey) => {
return api.get(`/activity_requests/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteActivity_Requests = (id) => {
return api.delete(`/activity_requests/${id}`)
}
export {getActivity_Requests,addActivity_Requests,updateActivity_Requests,getAllActivity_Requests,getOneActivity_Requests,searchActivity_Requests,deleteActivity_Requests}



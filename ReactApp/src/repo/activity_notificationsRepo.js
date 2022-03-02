import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getActivity_Notifications = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllActivity_Notifications(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchActivity_Notifications(pageNo+1,pageSize,search);
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


const addActivity_Notifications = (data) => {
return api.post(`/activity_notifications`,data)
}
const updateActivity_Notifications = (id,data) => {
return api.put(`/activity_notifications/${id}`,data)
}
const getAllActivity_Notifications = (page,paginator) => {
return api.get(`/activity_notifications/?page=${page}&paginator=${paginator}`)
}
const getOneActivity_Notifications = (id) => {
return api.get(`/activity_notifications/${id}`)
}
const searchActivity_Notifications = (page,paginator,searchKey) => {
return api.get(`/activity_notifications/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteActivity_Notifications = (id) => {
return api.delete(`/activity_notifications/${id}`)
}
export {getActivity_Notifications,addActivity_Notifications,updateActivity_Notifications,getAllActivity_Notifications,getOneActivity_Notifications,searchActivity_Notifications,deleteActivity_Notifications}



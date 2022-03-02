import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTrip_Histories = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTrip_Histories(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTrip_Histories(pageNo+1,pageSize,search);
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


const addTrip_Histories = (data) => {
return api.post(`/trip_histories`,data)
}
const updateTrip_Histories = (id,data) => {
return api.put(`/trip_histories/${id}`,data)
}
const getAllTrip_Histories = (page,paginator) => {
return api.get(`/trip_histories/?page=${page}&paginator=${paginator}`)
}
const getOneTrip_Histories = (id) => {
return api.get(`/trip_histories/${id}`)
}
const searchTrip_Histories = (page,paginator,searchKey) => {
return api.get(`/trip_histories/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTrip_Histories = (id) => {
return api.delete(`/trip_histories/${id}`)
}
export {getTrip_Histories,addTrip_Histories,updateTrip_Histories,getAllTrip_Histories,getOneTrip_Histories,searchTrip_Histories,deleteTrip_Histories}



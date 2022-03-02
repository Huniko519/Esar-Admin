import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTrip_Cancellations = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTrip_Cancellations(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTrip_Cancellations(pageNo+1,pageSize,search);
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


const addTrip_Cancellations = (data) => {
return api.post(`/trip_cancellations`,data)
}
const updateTrip_Cancellations = (id,data) => {
return api.put(`/trip_cancellations/${id}`,data)
}
const getAllTrip_Cancellations = (page,paginator) => {
return api.get(`/trip_cancellations/?page=${page}&paginator=${paginator}`)
}
const getOneTrip_Cancellations = (id) => {
return api.get(`/trip_cancellations/${id}`)
}
const searchTrip_Cancellations = (page,paginator,searchKey) => {
return api.get(`/trip_cancellations/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTrip_Cancellations = (id) => {
return api.delete(`/trip_cancellations/${id}`)
}
export {getTrip_Cancellations,addTrip_Cancellations,updateTrip_Cancellations,getAllTrip_Cancellations,getOneTrip_Cancellations,searchTrip_Cancellations,deleteTrip_Cancellations}



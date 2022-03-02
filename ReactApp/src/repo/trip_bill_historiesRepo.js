import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTrip_Bill_Histories = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTrip_Bill_Histories(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTrip_Bill_Histories(pageNo+1,pageSize,search);
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


const addTrip_Bill_Histories = (data) => {
return api.post(`/trip_bill_histories`,data)
}
const updateTrip_Bill_Histories = (id,data) => {
return api.put(`/trip_bill_histories/${id}`,data)
}
const getAllTrip_Bill_Histories = (page,paginator) => {
return api.get(`/trip_bill_histories/?page=${page}&paginator=${paginator}`)
}
const getOneTrip_Bill_Histories = (id) => {
return api.get(`/trip_bill_histories/${id}`)
}
const searchTrip_Bill_Histories = (page,paginator,searchKey) => {
return api.get(`/trip_bill_histories/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTrip_Bill_Histories = (id) => {
return api.delete(`/trip_bill_histories/${id}`)
}
export {getTrip_Bill_Histories,addTrip_Bill_Histories,updateTrip_Bill_Histories,getAllTrip_Bill_Histories,getOneTrip_Bill_Histories,searchTrip_Bill_Histories,deleteTrip_Bill_Histories}



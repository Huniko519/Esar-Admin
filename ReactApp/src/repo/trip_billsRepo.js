import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTrip_Bills = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTrip_Bills(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTrip_Bills(pageNo+1,pageSize,search);
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


const addTrip_Bills = (data) => {
return api.post(`/trip_bills`,data)
}
const updateTrip_Bills = (id,data) => {
return api.put(`/trip_bills/${id}`,data)
}
const getAllTrip_Bills = (page,paginator) => {
return api.get(`/trip_bills/?page=${page}&paginator=${paginator}`)
}
const getOneTrip_Bills = (id) => {
return api.get(`/trip_bills/${id}`)
}
const searchTrip_Bills = (page,paginator,searchKey) => {
return api.get(`/trip_bills/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTrip_Bills = (id) => {
return api.delete(`/trip_bills/${id}`)
}
export {getTrip_Bills,addTrip_Bills,updateTrip_Bills,getAllTrip_Bills,getOneTrip_Bills,searchTrip_Bills,deleteTrip_Bills}



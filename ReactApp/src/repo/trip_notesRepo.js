import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTrip_Notes = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTrip_Notes(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTrip_Notes(pageNo+1,pageSize,search);
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


const addTrip_Notes = (data) => {
return api.post(`/trip_notes`,data)
}
const updateTrip_Notes = (id,data) => {
return api.put(`/trip_notes/${id}`,data)
}
const getAllTrip_Notes = (page,paginator) => {
return api.get(`/trip_notes/?page=${page}&paginator=${paginator}`)
}
const getOneTrip_Notes = (id) => {
return api.get(`/trip_notes/${id}`)
}
const searchTrip_Notes = (page,paginator,searchKey) => {
return api.get(`/trip_notes/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTrip_Notes = (id) => {
return api.delete(`/trip_notes/${id}`)
}
export {getTrip_Notes,addTrip_Notes,updateTrip_Notes,getAllTrip_Notes,getOneTrip_Notes,searchTrip_Notes,deleteTrip_Notes}



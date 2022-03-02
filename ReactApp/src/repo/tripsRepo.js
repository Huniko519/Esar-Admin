import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTrips = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTrips(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTrips(pageNo+1,pageSize,search);
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


const addTrips = (data) => {
return api.post(`/trips`,data)
}
const updateTrips = (id,data) => {
return api.put(`/trips/${id}`,data)
}
const getAllTrips = (page,paginator) => {
return api.get(`/trips/?page=${page}&paginator=${paginator}`)
}
const getOneTrips = (id) => {
return api.get(`/trips/${id}`)
}
const searchTrips = (page,paginator,searchKey) => {
return api.get(`/trips/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTrips = (id) => {
return api.delete(`/trips/${id}`)
}
export {getTrips,addTrips,updateTrips,getAllTrips,getOneTrips,searchTrips,deleteTrips}



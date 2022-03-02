import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTrip_Images = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTrip_Images(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTrip_Images(pageNo+1,pageSize,search);
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


const addTrip_Images = (data) => {
return api.post(`/trip_images`,data)
}
const updateTrip_Images = (id,data) => {
return api.put(`/trip_images/${id}`,data)
}
const getAllTrip_Images = (page,paginator) => {
return api.get(`/trip_images/?page=${page}&paginator=${paginator}`)
}
const getOneTrip_Images = (id) => {
return api.get(`/trip_images/${id}`)
}
const searchTrip_Images = (page,paginator,searchKey) => {
return api.get(`/trip_images/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTrip_Images = (id) => {
return api.delete(`/trip_images/${id}`)
}
export {getTrip_Images,addTrip_Images,updateTrip_Images,getAllTrip_Images,getOneTrip_Images,searchTrip_Images,deleteTrip_Images}



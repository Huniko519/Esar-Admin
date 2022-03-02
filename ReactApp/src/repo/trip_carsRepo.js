import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTrip_Cars = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTrip_Cars(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTrip_Cars(pageNo+1,pageSize,search);
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


const addTrip_Cars = (data) => {
return api.post(`/trip_cars`,data)
}
const updateTrip_Cars = (id,data) => {
return api.put(`/trip_cars/${id}`,data)
}
const getAllTrip_Cars = (page,paginator) => {
return api.get(`/trip_cars/?page=${page}&paginator=${paginator}`)
}
const getOneTrip_Cars = (id) => {
return api.get(`/trip_cars/${id}`)
}
const searchTrip_Cars = (page,paginator,searchKey) => {
return api.get(`/trip_cars/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTrip_Cars = (id) => {
return api.delete(`/trip_cars/${id}`)
}
export {getTrip_Cars,addTrip_Cars,updateTrip_Cars,getAllTrip_Cars,getOneTrip_Cars,searchTrip_Cars,deleteTrip_Cars}



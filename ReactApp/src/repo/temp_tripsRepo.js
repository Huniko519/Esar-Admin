import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTemp_Trips = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTemp_Trips(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTemp_Trips(pageNo+1,pageSize,search);
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


const addTemp_Trips = (data) => {
return api.post(`/temp_trips`,data)
}
const updateTemp_Trips = (id,data) => {
return api.put(`/temp_trips/${id}`,data)
}
const getAllTemp_Trips = (page,paginator) => {
return api.get(`/temp_trips/?page=${page}&paginator=${paginator}`)
}
const getOneTemp_Trips = (id) => {
return api.get(`/temp_trips/${id}`)
}
const searchTemp_Trips = (page,paginator,searchKey) => {
return api.get(`/temp_trips/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTemp_Trips = (id) => {
return api.delete(`/temp_trips/${id}`)
}
export {getTemp_Trips,addTemp_Trips,updateTemp_Trips,getAllTemp_Trips,getOneTemp_Trips,searchTemp_Trips,deleteTemp_Trips}



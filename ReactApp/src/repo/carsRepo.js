import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCars = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCars(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCars(pageNo+1,pageSize,search);
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


const addCars = (data) => {
return api.post(`/cars`,data)
}
const updateCars = (id,data) => {
return api.put(`/cars/${id}`,data)
}
const getAllCars = (page,paginator) => {
return api.get(`/cars/?page=${page}&paginator=${paginator}`)
}
const getOneCars = (id) => {
return api.get(`/cars/${id}`)
}
const searchCars = (page,paginator,searchKey) => {
return api.get(`/cars/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCars = (id) => {
return api.delete(`/cars/${id}`)
}
export {getCars,addCars,updateCars,getAllCars,getOneCars,searchCars,deleteCars}



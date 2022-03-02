import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Unlisteds = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Unlisteds(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Unlisteds(pageNo+1,pageSize,search);
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


const addCar_Unlisteds = (data) => {
return api.post(`/car_unlisteds`,data)
}
const updateCar_Unlisteds = (id,data) => {
return api.put(`/car_unlisteds/${id}`,data)
}
const getAllCar_Unlisteds = (page,paginator) => {
return api.get(`/car_unlisteds/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Unlisteds = (id) => {
return api.get(`/car_unlisteds/${id}`)
}
const searchCar_Unlisteds = (page,paginator,searchKey) => {
return api.get(`/car_unlisteds/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Unlisteds = (id) => {
return api.delete(`/car_unlisteds/${id}`)
}
export {getCar_Unlisteds,addCar_Unlisteds,updateCar_Unlisteds,getAllCar_Unlisteds,getOneCar_Unlisteds,searchCar_Unlisteds,deleteCar_Unlisteds}



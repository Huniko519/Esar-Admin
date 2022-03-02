import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Features = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Features(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Features(pageNo+1,pageSize,search);
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


const addCar_Features = (data) => {
return api.post(`/car_features`,data)
}
const updateCar_Features = (id,data) => {
return api.put(`/car_features/${id}`,data)
}
const getAllCar_Features = (page,paginator) => {
return api.get(`/car_features/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Features = (id) => {
return api.get(`/car_features/${id}`)
}
const searchCar_Features = (page,paginator,searchKey) => {
return api.get(`/car_features/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Features = (id) => {
return api.delete(`/car_features/${id}`)
}
export {getCar_Features,addCar_Features,updateCar_Features,getAllCar_Features,getOneCar_Features,searchCar_Features,deleteCar_Features}



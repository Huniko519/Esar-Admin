import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Images = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Images(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Images(pageNo+1,pageSize,search);
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


const addCar_Images = (data) => {
return api.post(`/car_images`,data)
}
const updateCar_Images = (id,data) => {
return api.put(`/car_images/${id}`,data)
}
const getAllCar_Images = (page,paginator) => {
return api.get(`/car_images/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Images = (id) => {
return api.get(`/car_images/${id}`)
}
const searchCar_Images = (page,paginator,searchKey) => {
return api.get(`/car_images/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Images = (id) => {
return api.delete(`/car_images/${id}`)
}
export {getCar_Images,addCar_Images,updateCar_Images,getAllCar_Images,getOneCar_Images,searchCar_Images,deleteCar_Images}



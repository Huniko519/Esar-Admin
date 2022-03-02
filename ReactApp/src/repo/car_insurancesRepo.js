import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Insurances = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Insurances(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Insurances(pageNo+1,pageSize,search);
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


const addCar_Insurances = (data) => {
return api.post(`/car_insurances`,data)
}
const updateCar_Insurances = (id,data) => {
return api.put(`/car_insurances/${id}`,data)
}
const getAllCar_Insurances = (page,paginator) => {
return api.get(`/car_insurances/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Insurances = (id) => {
return api.get(`/car_insurances/${id}`)
}
const searchCar_Insurances = (page,paginator,searchKey) => {
return api.get(`/car_insurances/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Insurances = (id) => {
return api.delete(`/car_insurances/${id}`)
}
export {getCar_Insurances,addCar_Insurances,updateCar_Insurances,getAllCar_Insurances,getOneCar_Insurances,searchCar_Insurances,deleteCar_Insurances}



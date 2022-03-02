import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Registrations = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Registrations(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Registrations(pageNo+1,pageSize,search);
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


const addCar_Registrations = (data) => {
return api.post(`/car_registrations`,data)
}
const updateCar_Registrations = (id,data) => {
return api.put(`/car_registrations/${id}`,data)
}
const getAllCar_Registrations = (page,paginator) => {
return api.get(`/car_registrations/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Registrations = (id) => {
return api.get(`/car_registrations/${id}`)
}
const searchCar_Registrations = (page,paginator,searchKey) => {
return api.get(`/car_registrations/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Registrations = (id) => {
return api.delete(`/car_registrations/${id}`)
}
export {getCar_Registrations,addCar_Registrations,updateCar_Registrations,getAllCar_Registrations,getOneCar_Registrations,searchCar_Registrations,deleteCar_Registrations}



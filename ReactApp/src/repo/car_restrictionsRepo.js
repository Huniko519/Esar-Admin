import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Restrictions = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Restrictions(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Restrictions(pageNo+1,pageSize,search);
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


const addCar_Restrictions = (data) => {
return api.post(`/car_restrictions`,data)
}
const updateCar_Restrictions = (id,data) => {
return api.put(`/car_restrictions/${id}`,data)
}
const getAllCar_Restrictions = (page,paginator) => {
return api.get(`/car_restrictions/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Restrictions = (id) => {
return api.get(`/car_restrictions/${id}`)
}
const searchCar_Restrictions = (page,paginator,searchKey) => {
return api.get(`/car_restrictions/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Restrictions = (id) => {
return api.delete(`/car_restrictions/${id}`)
}
export {getCar_Restrictions,addCar_Restrictions,updateCar_Restrictions,getAllCar_Restrictions,getOneCar_Restrictions,searchCar_Restrictions,deleteCar_Restrictions}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Airports = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Airports(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Airports(pageNo+1,pageSize,search);
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


const addCar_Airports = (data) => {
return api.post(`/car_airports`,data)
}
const updateCar_Airports = (id,data) => {
return api.put(`/car_airports/${id}`,data)
}
const getAllCar_Airports = (page,paginator) => {
return api.get(`/car_airports/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Airports = (id) => {
return api.get(`/car_airports/${id}`)
}
const searchCar_Airports = (page,paginator,searchKey) => {
return api.get(`/car_airports/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Airports = (id) => {
return api.delete(`/car_airports/${id}`)
}
export {getCar_Airports,addCar_Airports,updateCar_Airports,getAllCar_Airports,getOneCar_Airports,searchCar_Airports,deleteCar_Airports}



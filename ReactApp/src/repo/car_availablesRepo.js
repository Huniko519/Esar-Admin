import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Availables = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Availables(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Availables(pageNo+1,pageSize,search);
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


const addCar_Availables = (data) => {
return api.post(`/car_availables`,data)
}
const updateCar_Availables = (id,data) => {
return api.put(`/car_availables/${id}`,data)
}
const getAllCar_Availables = (page,paginator) => {
return api.get(`/car_availables/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Availables = (id) => {
return api.get(`/car_availables/${id}`)
}
const searchCar_Availables = (page,paginator,searchKey) => {
return api.get(`/car_availables/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Availables = (id) => {
return api.delete(`/car_availables/${id}`)
}
export {getCar_Availables,addCar_Availables,updateCar_Availables,getAllCar_Availables,getOneCar_Availables,searchCar_Availables,deleteCar_Availables}



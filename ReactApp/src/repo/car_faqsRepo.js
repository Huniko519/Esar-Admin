import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCar_Faqs = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCar_Faqs(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCar_Faqs(pageNo+1,pageSize,search);
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


const addCar_Faqs = (data) => {
return api.post(`/car_faqs`,data)
}
const updateCar_Faqs = (id,data) => {
return api.put(`/car_faqs/${id}`,data)
}
const getAllCar_Faqs = (page,paginator) => {
return api.get(`/car_faqs/?page=${page}&paginator=${paginator}`)
}
const getOneCar_Faqs = (id) => {
return api.get(`/car_faqs/${id}`)
}
const searchCar_Faqs = (page,paginator,searchKey) => {
return api.get(`/car_faqs/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCar_Faqs = (id) => {
return api.delete(`/car_faqs/${id}`)
}
export {getCar_Faqs,addCar_Faqs,updateCar_Faqs,getAllCar_Faqs,getOneCar_Faqs,searchCar_Faqs,deleteCar_Faqs}



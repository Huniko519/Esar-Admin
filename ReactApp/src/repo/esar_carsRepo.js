import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getEsar_Cars = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllEsar_Cars(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchEsar_Cars(pageNo+1,pageSize,search);
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


const addEsar_Cars = (data) => {
return api.post(`/esar_cars`,data)
}
const updateEsar_Cars = (id,data) => {
return api.put(`/esar_cars/${id}`,data)
}
const getAllEsar_Cars = (page,paginator) => {
return api.get(`/esar_cars/?page=${page}&paginator=${paginator}`)
}
const getOneEsar_Cars = (id) => {
return api.get(`/esar_cars/${id}`)
}
const searchEsar_Cars = (page,paginator,searchKey) => {
return api.get(`/esar_cars/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteEsar_Cars = (id) => {
return api.delete(`/esar_cars/${id}`)
}
export {getEsar_Cars,addEsar_Cars,updateEsar_Cars,getAllEsar_Cars,getOneEsar_Cars,searchEsar_Cars,deleteEsar_Cars}



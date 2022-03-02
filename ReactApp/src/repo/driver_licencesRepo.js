import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getDriver_Licences = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllDriver_Licences(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchDriver_Licences(pageNo+1,pageSize,search);
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


const addDriver_Licences = (data) => {
return api.post(`/driver_licences`,data)
}
const updateDriver_Licences = (id,data) => {
return api.put(`/driver_licences/${id}`,data)
}
const getAllDriver_Licences = (page,paginator) => {
return api.get(`/driver_licences/?page=${page}&paginator=${paginator}`)
}
const getOneDriver_Licences = (id) => {
return api.get(`/driver_licences/${id}`)
}
const searchDriver_Licences = (page,paginator,searchKey) => {
return api.get(`/driver_licences/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteDriver_Licences = (id) => {
return api.delete(`/driver_licences/${id}`)
}
export {getDriver_Licences,addDriver_Licences,updateDriver_Licences,getAllDriver_Licences,getOneDriver_Licences,searchDriver_Licences,deleteDriver_Licences}



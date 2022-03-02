import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAdditional_Features = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAdditional_Features(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAdditional_Features(pageNo+1,pageSize,search);
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


const addAdditional_Features = (data) => {
return api.post(`/additional_features`,data)
}
const updateAdditional_Features = (id,data) => {
return api.put(`/additional_features/${id}`,data)
}
const getAllAdditional_Features = (page,paginator) => {
return api.get(`/additional_features/?page=${page}&paginator=${paginator}`)
}
const getOneAdditional_Features = (id) => {
return api.get(`/additional_features/${id}`)
}
const searchAdditional_Features = (page,paginator,searchKey) => {
return api.get(`/additional_features/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteAdditional_Features = (id) => {
return api.delete(`/additional_features/${id}`)
}
export {getAdditional_Features,addAdditional_Features,updateAdditional_Features,getAllAdditional_Features,getOneAdditional_Features,searchAdditional_Features,deleteAdditional_Features}



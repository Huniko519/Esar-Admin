import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getIos_Versions = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllIos_Versions(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchIos_Versions(pageNo+1,pageSize,search);
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


const addIos_Versions = (data) => {
return api.post(`/ios_versions`,data)
}
const updateIos_Versions = (id,data) => {
return api.put(`/ios_versions/${id}`,data)
}
const getAllIos_Versions = (page,paginator) => {
return api.get(`/ios_versions/?page=${page}&paginator=${paginator}`)
}
const getOneIos_Versions = (id) => {
return api.get(`/ios_versions/${id}`)
}
const searchIos_Versions = (page,paginator,searchKey) => {
return api.get(`/ios_versions/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteIos_Versions = (id) => {
return api.delete(`/ios_versions/${id}`)
}
export {getIos_Versions,addIos_Versions,updateIos_Versions,getAllIos_Versions,getOneIos_Versions,searchIos_Versions,deleteIos_Versions}



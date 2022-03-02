import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAndroid_Versions = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAndroid_Versions(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAndroid_Versions(pageNo+1,pageSize,search);
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


const addAndroid_Versions = (data) => {
return api.post(`/android_versions`,data)
}
const updateAndroid_Versions = (id,data) => {
return api.put(`/android_versions/${id}`,data)
}
const getAllAndroid_Versions = (page,paginator) => {
return api.get(`/android_versions/?page=${page}&paginator=${paginator}`)
}
const getOneAndroid_Versions = (id) => {
return api.get(`/android_versions/${id}`)
}
const searchAndroid_Versions = (page,paginator,searchKey) => {
return api.get(`/android_versions/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteAndroid_Versions = (id) => {
return api.delete(`/android_versions/${id}`)
}
export {getAndroid_Versions,addAndroid_Versions,updateAndroid_Versions,getAllAndroid_Versions,getOneAndroid_Versions,searchAndroid_Versions,deleteAndroid_Versions}



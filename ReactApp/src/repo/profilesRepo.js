import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getProfiles = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllProfiles(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchProfiles(pageNo+1,pageSize,search);
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


const addProfiles = (data) => {
return api.post(`/profiles`,data)
}
const updateProfiles = (id,data) => {
return api.put(`/profiles/${id}`,data)
}
const getAllProfiles = (page,paginator) => {
return api.get(`/profiles/?page=${page}&paginator=${paginator}`)
}
const getOneProfiles = (id) => {
return api.get(`/profiles/${id}`)
}
const searchProfiles = (page,paginator,searchKey) => {
return api.get(`/profiles/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteProfiles = (id) => {
return api.delete(`/profiles/${id}`)
}
export {getProfiles,addProfiles,updateProfiles,getAllProfiles,getOneProfiles,searchProfiles,deleteProfiles}



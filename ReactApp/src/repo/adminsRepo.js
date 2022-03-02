import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAdmins = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAdmins(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAdmins(pageNo+1,pageSize,search);
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


const addAdmins = (data) => {
return api.post(`/admins`,data)
}
const updateAdmins = (id,data) => {
return api.put(`/admins/${id}`,data)
}
const getAllAdmins = (page,paginator) => {
return api.get(`/admins/?page=${page}&paginator=${paginator}`)
}
const getOneAdmins = (id) => {
return api.get(`/admins/${id}`)
}
const searchAdmins = (page,paginator,searchKey) => {
return api.get(`/admins/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteAdmins = (id) => {
return api.delete(`/admins/${id}`)
}
export {getAdmins,addAdmins,updateAdmins,getAllAdmins,getOneAdmins,searchAdmins,deleteAdmins}



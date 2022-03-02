import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPermissions = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPermissions(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPermissions(pageNo+1,pageSize,search);
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


const addPermissions = (data) => {
return api.post(`/permissions`,data)
}
const updatePermissions = (id,data) => {
return api.put(`/permissions/${id}`,data)
}
const getAllPermissions = (page,paginator) => {
return api.get(`/permissions/?page=${page}&paginator=${paginator}`)
}
const getOnePermissions = (id) => {
return api.get(`/permissions/${id}`)
}
const searchPermissions = (page,paginator,searchKey) => {
return api.get(`/permissions/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deletePermissions = (id) => {
return api.delete(`/permissions/${id}`)
}
export {getPermissions,addPermissions,updatePermissions,getAllPermissions,getOnePermissions,searchPermissions,deletePermissions}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPermission_Role = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPermission_Role(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPermission_Role(pageNo+1,pageSize,search);
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


const addPermission_Role = (data) => {
return api.post(`/permission_role`,data)
}
const updatePermission_Role = (id,data) => {
return api.put(`/permission_role/${id}`,data)
}
const getAllPermission_Role = (page,paginator) => {
return api.get(`/permission_role/?page=${page}&paginator=${paginator}`)
}
const getOnePermission_Role = (id) => {
return api.get(`/permission_role/${id}`)
}
const searchPermission_Role = (page,paginator,searchKey) => {
return api.get(`/permission_role/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deletePermission_Role = (id) => {
return api.delete(`/permission_role/${id}`)
}
export {getPermission_Role,addPermission_Role,updatePermission_Role,getAllPermission_Role,getOnePermission_Role,searchPermission_Role,deletePermission_Role}



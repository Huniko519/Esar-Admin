import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPermission_User = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPermission_User(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPermission_User(pageNo+1,pageSize,search);
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


const addPermission_User = (data) => {
return api.post(`/permission_user`,data)
}
const updatePermission_User = (id,data) => {
return api.put(`/permission_user/${id}`,data)
}
const getAllPermission_User = (page,paginator) => {
return api.get(`/permission_user/?page=${page}&paginator=${paginator}`)
}
const getOnePermission_User = (id) => {
return api.get(`/permission_user/${id}`)
}
const searchPermission_User = (page,paginator,searchKey) => {
return api.get(`/permission_user/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deletePermission_User = (id) => {
return api.delete(`/permission_user/${id}`)
}
export {getPermission_User,addPermission_User,updatePermission_User,getAllPermission_User,getOnePermission_User,searchPermission_User,deletePermission_User}



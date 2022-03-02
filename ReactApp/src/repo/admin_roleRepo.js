import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getAdmin_Role = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllAdmin_Role(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchAdmin_Role(pageNo+1,pageSize,search);
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


const addAdmin_Role = (data) => {
return api.post(`/admin_role`,data)
}
const updateAdmin_Role = (id,data) => {
return api.put(`/admin_role/${id}`,data)
}
const getAllAdmin_Role = (page,paginator) => {
return api.get(`/admin_role/?page=${page}&paginator=${paginator}`)
}
const getOneAdmin_Role = (id) => {
return api.get(`/admin_role/${id}`)
}
const searchAdmin_Role = (page,paginator,searchKey) => {
return api.get(`/admin_role/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteAdmin_Role = (id) => {
return api.delete(`/admin_role/${id}`)
}
export {getAdmin_Role,addAdmin_Role,updateAdmin_Role,getAllAdmin_Role,getOneAdmin_Role,searchAdmin_Role,deleteAdmin_Role}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRoles = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRoles(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRoles(pageNo+1,pageSize,search);
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


const addRoles = (data) => {
return api.post(`/roles`,data)
}
const updateRoles = (id,data) => {
return api.put(`/roles/${id}`,data)
}
const getAllRoles = (page,paginator) => {
return api.get(`/roles/?page=${page}&paginator=${paginator}`)
}
const getOneRoles = (id) => {
return api.get(`/roles/${id}`)
}
const searchRoles = (page,paginator,searchKey) => {
return api.get(`/roles/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteRoles = (id) => {
return api.delete(`/roles/${id}`)
}
export {getRoles,addRoles,updateRoles,getAllRoles,getOneRoles,searchRoles,deleteRoles}



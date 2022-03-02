import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getSocial_Connections = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllSocial_Connections(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchSocial_Connections(pageNo+1,pageSize,search);
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


const addSocial_Connections = (data) => {
return api.post(`/social_connections`,data)
}
const updateSocial_Connections = (id,data) => {
return api.put(`/social_connections/${id}`,data)
}
const getAllSocial_Connections = (page,paginator) => {
return api.get(`/social_connections/?page=${page}&paginator=${paginator}`)
}
const getOneSocial_Connections = (id) => {
return api.get(`/social_connections/${id}`)
}
const searchSocial_Connections = (page,paginator,searchKey) => {
return api.get(`/social_connections/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteSocial_Connections = (id) => {
return api.delete(`/social_connections/${id}`)
}
export {getSocial_Connections,addSocial_Connections,updateSocial_Connections,getAllSocial_Connections,getOneSocial_Connections,searchSocial_Connections,deleteSocial_Connections}



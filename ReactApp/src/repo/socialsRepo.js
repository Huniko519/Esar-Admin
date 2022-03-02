import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getSocials = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllSocials(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchSocials(pageNo+1,pageSize,search);
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


const addSocials = (data) => {
return api.post(`/socials`,data)
}
const updateSocials = (id,data) => {
return api.put(`/socials/${id}`,data)
}
const getAllSocials = (page,paginator) => {
return api.get(`/socials/?page=${page}&paginator=${paginator}`)
}
const getOneSocials = (id) => {
return api.get(`/socials/${id}`)
}
const searchSocials = (page,paginator,searchKey) => {
return api.get(`/socials/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteSocials = (id) => {
return api.delete(`/socials/${id}`)
}
export {getSocials,addSocials,updateSocials,getAllSocials,getOneSocials,searchSocials,deleteSocials}



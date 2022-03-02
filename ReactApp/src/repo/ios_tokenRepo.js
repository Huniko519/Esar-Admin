import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getIos_Token = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllIos_Token(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchIos_Token(pageNo+1,pageSize,search);
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


const addIos_Token = (data) => {
return api.post(`/ios_token`,data)
}
const updateIos_Token = (id,data) => {
return api.put(`/ios_token/${id}`,data)
}
const getAllIos_Token = (page,paginator) => {
return api.get(`/ios_token/?page=${page}&paginator=${paginator}`)
}
const getOneIos_Token = (id) => {
return api.get(`/ios_token/${id}`)
}
const searchIos_Token = (page,paginator,searchKey) => {
return api.get(`/ios_token/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteIos_Token = (id) => {
return api.delete(`/ios_token/${id}`)
}
export {getIos_Token,addIos_Token,updateIos_Token,getAllIos_Token,getOneIos_Token,searchIos_Token,deleteIos_Token}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getSupports = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllSupports(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchSupports(pageNo+1,pageSize,search);
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


const addSupports = (data) => {
return api.post(`/supports`,data)
}
const updateSupports = (id,data) => {
return api.put(`/supports/${id}`,data)
}
const getAllSupports = (page,paginator) => {
return api.get(`/supports/?page=${page}&paginator=${paginator}`)
}
const getOneSupports = (id) => {
return api.get(`/supports/${id}`)
}
const searchSupports = (page,paginator,searchKey) => {
return api.get(`/supports/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteSupports = (id) => {
return api.delete(`/supports/${id}`)
}
export {getSupports,addSupports,updateSupports,getAllSupports,getOneSupports,searchSupports,deleteSupports}



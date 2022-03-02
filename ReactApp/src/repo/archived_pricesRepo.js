import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getArchived_Prices = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllArchived_Prices(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchArchived_Prices(pageNo+1,pageSize,search);
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


const addArchived_Prices = (data) => {
return api.post(`/archived_prices`,data)
}
const updateArchived_Prices = (id,data) => {
return api.put(`/archived_prices/${id}`,data)
}
const getAllArchived_Prices = (page,paginator) => {
return api.get(`/archived_prices/?page=${page}&paginator=${paginator}`)
}
const getOneArchived_Prices = (id) => {
return api.get(`/archived_prices/${id}`)
}
const searchArchived_Prices = (page,paginator,searchKey) => {
return api.get(`/archived_prices/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteArchived_Prices = (id) => {
return api.delete(`/archived_prices/${id}`)
}
export {getArchived_Prices,addArchived_Prices,updateArchived_Prices,getAllArchived_Prices,getOneArchived_Prices,searchArchived_Prices,deleteArchived_Prices}



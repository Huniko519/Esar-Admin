import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCurrencies = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCurrencies(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCurrencies(pageNo+1,pageSize,search);
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


const addCurrencies = (data) => {
return api.post(`/currencies`,data)
}
const updateCurrencies = (id,data) => {
return api.put(`/currencies/${id}`,data)
}
const getAllCurrencies = (page,paginator) => {
return api.get(`/currencies/?page=${page}&paginator=${paginator}`)
}
const getOneCurrencies = (id) => {
return api.get(`/currencies/${id}`)
}
const searchCurrencies = (page,paginator,searchKey) => {
return api.get(`/currencies/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCurrencies = (id) => {
return api.delete(`/currencies/${id}`)
}
export {getCurrencies,addCurrencies,updateCurrencies,getAllCurrencies,getOneCurrencies,searchCurrencies,deleteCurrencies}



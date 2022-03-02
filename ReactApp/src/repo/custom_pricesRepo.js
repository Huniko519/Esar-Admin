import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCustom_Prices = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCustom_Prices(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCustom_Prices(pageNo+1,pageSize,search);
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


const addCustom_Prices = (data) => {
return api.post(`/custom_prices`,data)
}
const updateCustom_Prices = (id,data) => {
return api.put(`/custom_prices/${id}`,data)
}
const getAllCustom_Prices = (page,paginator) => {
return api.get(`/custom_prices/?page=${page}&paginator=${paginator}`)
}
const getOneCustom_Prices = (id) => {
return api.get(`/custom_prices/${id}`)
}
const searchCustom_Prices = (page,paginator,searchKey) => {
return api.get(`/custom_prices/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCustom_Prices = (id) => {
return api.delete(`/custom_prices/${id}`)
}
export {getCustom_Prices,addCustom_Prices,updateCustom_Prices,getAllCustom_Prices,getOneCustom_Prices,searchCustom_Prices,deleteCustom_Prices}



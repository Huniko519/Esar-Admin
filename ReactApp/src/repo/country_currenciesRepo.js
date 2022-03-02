import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCountry_Currencies = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCountry_Currencies(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCountry_Currencies(pageNo+1,pageSize,search);
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


const addCountry_Currencies = (data) => {
return api.post(`/country_currencies`,data)
}
const updateCountry_Currencies = (id,data) => {
return api.put(`/country_currencies/${id}`,data)
}
const getAllCountry_Currencies = (page,paginator) => {
return api.get(`/country_currencies/?page=${page}&paginator=${paginator}`)
}
const getOneCountry_Currencies = (id) => {
return api.get(`/country_currencies/${id}`)
}
const searchCountry_Currencies = (page,paginator,searchKey) => {
return api.get(`/country_currencies/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCountry_Currencies = (id) => {
return api.delete(`/country_currencies/${id}`)
}
export {getCountry_Currencies,addCountry_Currencies,updateCountry_Currencies,getAllCountry_Currencies,getOneCountry_Currencies,searchCountry_Currencies,deleteCountry_Currencies}



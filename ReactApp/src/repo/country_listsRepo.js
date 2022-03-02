import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCountry_Lists = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCountry_Lists(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCountry_Lists(pageNo+1,pageSize,search);
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


const addCountry_Lists = (data) => {
return api.post(`/country_lists`,data)
}
const updateCountry_Lists = (id,data) => {
return api.put(`/country_lists/${id}`,data)
}
const getAllCountry_Lists = (page,paginator) => {
return api.get(`/country_lists/?page=${page}&paginator=${paginator}`)
}
const getOneCountry_Lists = (id) => {
return api.get(`/country_lists/${id}`)
}
const searchCountry_Lists = (page,paginator,searchKey) => {
return api.get(`/country_lists/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCountry_Lists = (id) => {
return api.delete(`/country_lists/${id}`)
}
export {getCountry_Lists,addCountry_Lists,updateCountry_Lists,getAllCountry_Lists,getOneCountry_Lists,searchCountry_Lists,deleteCountry_Lists}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getEsar_Airports = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllEsar_Airports(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchEsar_Airports(pageNo+1,pageSize,search);
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


const addEsar_Airports = (data) => {
return api.post(`/esar_airports`,data)
}
const updateEsar_Airports = (id,data) => {
return api.put(`/esar_airports/${id}`,data)
}
const getAllEsar_Airports = (page,paginator) => {
return api.get(`/esar_airports/?page=${page}&paginator=${paginator}`)
}
const getOneEsar_Airports = (id) => {
return api.get(`/esar_airports/${id}`)
}
const searchEsar_Airports = (page,paginator,searchKey) => {
return api.get(`/esar_airports/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteEsar_Airports = (id) => {
return api.delete(`/esar_airports/${id}`)
}
export {getEsar_Airports,addEsar_Airports,updateEsar_Airports,getAllEsar_Airports,getOneEsar_Airports,searchEsar_Airports,deleteEsar_Airports}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getReports = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllReports(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchReports(pageNo+1,pageSize,search);
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


const addReports = (data) => {
return api.post(`/reports`,data)
}
const updateReports = (id,data) => {
return api.put(`/reports/${id}`,data)
}
const getAllReports = (page,paginator) => {
return api.get(`/reports/?page=${page}&paginator=${paginator}`)
}
const getOneReports = (id) => {
return api.get(`/reports/${id}`)
}
const searchReports = (page,paginator,searchKey) => {
return api.get(`/reports/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteReports = (id) => {
return api.delete(`/reports/${id}`)
}
export {getReports,addReports,updateReports,getAllReports,getOneReports,searchReports,deleteReports}



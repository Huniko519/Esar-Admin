import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getFailed_Jobs = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllFailed_Jobs(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchFailed_Jobs(pageNo+1,pageSize,search);
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


const addFailed_Jobs = (data) => {
return api.post(`/failed_jobs`,data)
}
const updateFailed_Jobs = (id,data) => {
return api.put(`/failed_jobs/${id}`,data)
}
const getAllFailed_Jobs = (page,paginator) => {
return api.get(`/failed_jobs/?page=${page}&paginator=${paginator}`)
}
const getOneFailed_Jobs = (id) => {
return api.get(`/failed_jobs/${id}`)
}
const searchFailed_Jobs = (page,paginator,searchKey) => {
return api.get(`/failed_jobs/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteFailed_Jobs = (id) => {
return api.delete(`/failed_jobs/${id}`)
}
export {getFailed_Jobs,addFailed_Jobs,updateFailed_Jobs,getAllFailed_Jobs,getOneFailed_Jobs,searchFailed_Jobs,deleteFailed_Jobs}



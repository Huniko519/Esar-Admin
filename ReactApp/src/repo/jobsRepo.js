import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getJobs = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllJobs(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchJobs(pageNo+1,pageSize,search);
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


const addJobs = (data) => {
return api.post(`/jobs`,data)
}
const updateJobs = (id,data) => {
return api.put(`/jobs/${id}`,data)
}
const getAllJobs = (page,paginator) => {
return api.get(`/jobs/?page=${page}&paginator=${paginator}`)
}
const getOneJobs = (id) => {
return api.get(`/jobs/${id}`)
}
const searchJobs = (page,paginator,searchKey) => {
return api.get(`/jobs/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteJobs = (id) => {
return api.delete(`/jobs/${id}`)
}
export {getJobs,addJobs,updateJobs,getAllJobs,getOneJobs,searchJobs,deleteJobs}



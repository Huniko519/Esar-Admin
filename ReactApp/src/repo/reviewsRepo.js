import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getReviews = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllReviews(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchReviews(pageNo+1,pageSize,search);
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


const addReviews = (data) => {
return api.post(`/reviews`,data)
}
const updateReviews = (id,data) => {
return api.put(`/reviews/${id}`,data)
}
const getAllReviews = (page,paginator) => {
return api.get(`/reviews/?page=${page}&paginator=${paginator}`)
}
const getOneReviews = (id) => {
return api.get(`/reviews/${id}`)
}
const searchReviews = (page,paginator,searchKey) => {
return api.get(`/reviews/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteReviews = (id) => {
return api.delete(`/reviews/${id}`)
}
export {getReviews,addReviews,updateReviews,getAllReviews,getOneReviews,searchReviews,deleteReviews}



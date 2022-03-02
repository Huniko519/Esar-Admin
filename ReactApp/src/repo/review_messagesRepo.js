import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getReview_Messages = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllReview_Messages(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchReview_Messages(pageNo+1,pageSize,search);
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


const addReview_Messages = (data) => {
return api.post(`/review_messages`,data)
}
const updateReview_Messages = (id,data) => {
return api.put(`/review_messages/${id}`,data)
}
const getAllReview_Messages = (page,paginator) => {
return api.get(`/review_messages/?page=${page}&paginator=${paginator}`)
}
const getOneReview_Messages = (id) => {
return api.get(`/review_messages/${id}`)
}
const searchReview_Messages = (page,paginator,searchKey) => {
return api.get(`/review_messages/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteReview_Messages = (id) => {
return api.delete(`/review_messages/${id}`)
}
export {getReview_Messages,addReview_Messages,updateReview_Messages,getAllReview_Messages,getOneReview_Messages,searchReview_Messages,deleteReview_Messages}



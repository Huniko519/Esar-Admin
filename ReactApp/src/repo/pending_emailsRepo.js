import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getPending_Emails = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllPending_Emails(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchPending_Emails(pageNo+1,pageSize,search);
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


const addPending_Emails = (data) => {
return api.post(`/pending_emails`,data)
}
const updatePending_Emails = (id,data) => {
return api.put(`/pending_emails/${id}`,data)
}
const getAllPending_Emails = (page,paginator) => {
return api.get(`/pending_emails/?page=${page}&paginator=${paginator}`)
}
const getOnePending_Emails = (id) => {
return api.get(`/pending_emails/${id}`)
}
const searchPending_Emails = (page,paginator,searchKey) => {
return api.get(`/pending_emails/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deletePending_Emails = (id) => {
return api.delete(`/pending_emails/${id}`)
}
export {getPending_Emails,addPending_Emails,updatePending_Emails,getAllPending_Emails,getOnePending_Emails,searchPending_Emails,deletePending_Emails}



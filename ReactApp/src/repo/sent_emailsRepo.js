import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getSent_Emails = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllSent_Emails(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchSent_Emails(pageNo+1,pageSize,search);
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


const addSent_Emails = (data) => {
return api.post(`/sent_emails`,data)
}
const updateSent_Emails = (id,data) => {
return api.put(`/sent_emails/${id}`,data)
}
const getAllSent_Emails = (page,paginator) => {
return api.get(`/sent_emails/?page=${page}&paginator=${paginator}`)
}
const getOneSent_Emails = (id) => {
return api.get(`/sent_emails/${id}`)
}
const searchSent_Emails = (page,paginator,searchKey) => {
return api.get(`/sent_emails/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteSent_Emails = (id) => {
return api.delete(`/sent_emails/${id}`)
}
export {getSent_Emails,addSent_Emails,updateSent_Emails,getAllSent_Emails,getOneSent_Emails,searchSent_Emails,deleteSent_Emails}



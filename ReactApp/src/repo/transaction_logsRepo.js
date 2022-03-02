import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTransaction_Logs = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTransaction_Logs(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTransaction_Logs(pageNo+1,pageSize,search);
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


const addTransaction_Logs = (data) => {
return api.post(`/transaction_logs`,data)
}
const updateTransaction_Logs = (id,data) => {
return api.put(`/transaction_logs/${id}`,data)
}
const getAllTransaction_Logs = (page,paginator) => {
return api.get(`/transaction_logs/?page=${page}&paginator=${paginator}`)
}
const getOneTransaction_Logs = (id) => {
return api.get(`/transaction_logs/${id}`)
}
const searchTransaction_Logs = (page,paginator,searchKey) => {
return api.get(`/transaction_logs/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTransaction_Logs = (id) => {
return api.delete(`/transaction_logs/${id}`)
}
export {getTransaction_Logs,addTransaction_Logs,updateTransaction_Logs,getAllTransaction_Logs,getOneTransaction_Logs,searchTransaction_Logs,deleteTransaction_Logs}



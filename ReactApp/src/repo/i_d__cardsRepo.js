import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getI_D__Cards = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllI_D__Cards(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchI_D__Cards(pageNo+1,pageSize,search);
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


const addI_D__Cards = (data) => {
return api.post(`/i_d__cards`,data)
}
const updateI_D__Cards = (id,data) => {
return api.put(`/i_d__cards/${id}`,data)
}
const getAllI_D__Cards = (page,paginator) => {
return api.get(`/i_d__cards/?page=${page}&paginator=${paginator}`)
}
const getOneI_D__Cards = (id) => {
return api.get(`/i_d__cards/${id}`)
}
const searchI_D__Cards = (page,paginator,searchKey) => {
return api.get(`/i_d__cards/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteI_D__Cards = (id) => {
return api.delete(`/i_d__cards/${id}`)
}
export {getI_D__Cards,addI_D__Cards,updateI_D__Cards,getAllI_D__Cards,getOneI_D__Cards,searchI_D__Cards,deleteI_D__Cards}



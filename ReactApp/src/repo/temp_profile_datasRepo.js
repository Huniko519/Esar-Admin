import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getTemp_Profile_Datas = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllTemp_Profile_Datas(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchTemp_Profile_Datas(pageNo+1,pageSize,search);
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


const addTemp_Profile_Datas = (data) => {
return api.post(`/temp_profile_datas`,data)
}
const updateTemp_Profile_Datas = (id,data) => {
return api.put(`/temp_profile_datas/${id}`,data)
}
const getAllTemp_Profile_Datas = (page,paginator) => {
return api.get(`/temp_profile_datas/?page=${page}&paginator=${paginator}`)
}
const getOneTemp_Profile_Datas = (id) => {
return api.get(`/temp_profile_datas/${id}`)
}
const searchTemp_Profile_Datas = (page,paginator,searchKey) => {
return api.get(`/temp_profile_datas/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteTemp_Profile_Datas = (id) => {
return api.delete(`/temp_profile_datas/${id}`)
}
export {getTemp_Profile_Datas,addTemp_Profile_Datas,updateTemp_Profile_Datas,getAllTemp_Profile_Datas,getOneTemp_Profile_Datas,searchTemp_Profile_Datas,deleteTemp_Profile_Datas}



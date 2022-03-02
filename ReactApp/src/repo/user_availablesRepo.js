import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getUser_Availables = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllUser_Availables(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchUser_Availables(pageNo+1,pageSize,search);
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


const addUser_Availables = (data) => {
return api.post(`/user_availables`,data)
}
const updateUser_Availables = (id,data) => {
return api.put(`/user_availables/${id}`,data)
}
const getAllUser_Availables = (page,paginator) => {
return api.get(`/user_availables/?page=${page}&paginator=${paginator}`)
}
const getOneUser_Availables = (id) => {
return api.get(`/user_availables/${id}`)
}
const searchUser_Availables = (page,paginator,searchKey) => {
return api.get(`/user_availables/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteUser_Availables = (id) => {
return api.delete(`/user_availables/${id}`)
}
export {getUser_Availables,addUser_Availables,updateUser_Availables,getAllUser_Availables,getOneUser_Availables,searchUser_Availables,deleteUser_Availables}



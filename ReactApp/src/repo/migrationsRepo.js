import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getMigrations = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllMigrations(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchMigrations(pageNo+1,pageSize,search);
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


const addMigrations = (data) => {
return api.post(`/migrations`,data)
}
const updateMigrations = (id,data) => {
return api.put(`/migrations/${id}`,data)
}
const getAllMigrations = (page,paginator) => {
return api.get(`/migrations/?page=${page}&paginator=${paginator}`)
}
const getOneMigrations = (id) => {
return api.get(`/migrations/${id}`)
}
const searchMigrations = (page,paginator,searchKey) => {
return api.get(`/migrations/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteMigrations = (id) => {
return api.delete(`/migrations/${id}`)
}
export {getMigrations,addMigrations,updateMigrations,getAllMigrations,getOneMigrations,searchMigrations,deleteMigrations}



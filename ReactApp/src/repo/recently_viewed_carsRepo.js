import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRecently_Viewed_Cars = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRecently_Viewed_Cars(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRecently_Viewed_Cars(pageNo+1,pageSize,search);
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


const addRecently_Viewed_Cars = (data) => {
return api.post(`/recently_viewed_cars`,data)
}
const updateRecently_Viewed_Cars = (id,data) => {
return api.put(`/recently_viewed_cars/${id}`,data)
}
const getAllRecently_Viewed_Cars = (page,paginator) => {
return api.get(`/recently_viewed_cars/?page=${page}&paginator=${paginator}`)
}
const getOneRecently_Viewed_Cars = (id) => {
return api.get(`/recently_viewed_cars/${id}`)
}
const searchRecently_Viewed_Cars = (page,paginator,searchKey) => {
return api.get(`/recently_viewed_cars/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteRecently_Viewed_Cars = (id) => {
return api.delete(`/recently_viewed_cars/${id}`)
}
export {getRecently_Viewed_Cars,addRecently_Viewed_Cars,updateRecently_Viewed_Cars,getAllRecently_Viewed_Cars,getOneRecently_Viewed_Cars,searchRecently_Viewed_Cars,deleteRecently_Viewed_Cars}



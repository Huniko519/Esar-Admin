import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getFavorite_Cars = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllFavorite_Cars(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchFavorite_Cars(pageNo+1,pageSize,search);
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


const addFavorite_Cars = (data) => {
return api.post(`/favorite_cars`,data)
}
const updateFavorite_Cars = (id,data) => {
return api.put(`/favorite_cars/${id}`,data)
}
const getAllFavorite_Cars = (page,paginator) => {
return api.get(`/favorite_cars/?page=${page}&paginator=${paginator}`)
}
const getOneFavorite_Cars = (id) => {
return api.get(`/favorite_cars/${id}`)
}
const searchFavorite_Cars = (page,paginator,searchKey) => {
return api.get(`/favorite_cars/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteFavorite_Cars = (id) => {
return api.delete(`/favorite_cars/${id}`)
}
export {getFavorite_Cars,addFavorite_Cars,updateFavorite_Cars,getAllFavorite_Cars,getOneFavorite_Cars,searchFavorite_Cars,deleteFavorite_Cars}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCoupons = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCoupons(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCoupons(pageNo+1,pageSize,search);
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


const addCoupons = (data) => {
return api.post(`/coupons`,data)
}
const updateCoupons = (id,data) => {
return api.put(`/coupons/${id}`,data)
}
const getAllCoupons = (page,paginator) => {
return api.get(`/coupons/?page=${page}&paginator=${paginator}`)
}
const getOneCoupons = (id) => {
return api.get(`/coupons/${id}`)
}
const searchCoupons = (page,paginator,searchKey) => {
return api.get(`/coupons/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCoupons = (id) => {
return api.delete(`/coupons/${id}`)
}
export {getCoupons,addCoupons,updateCoupons,getAllCoupons,getOneCoupons,searchCoupons,deleteCoupons}



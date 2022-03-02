import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getCoupon_User = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllCoupon_User(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchCoupon_User(pageNo+1,pageSize,search);
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


const addCoupon_User = (data) => {
return api.post(`/coupon_user`,data)
}
const updateCoupon_User = (id,data) => {
return api.put(`/coupon_user/${id}`,data)
}
const getAllCoupon_User = (page,paginator) => {
return api.get(`/coupon_user/?page=${page}&paginator=${paginator}`)
}
const getOneCoupon_User = (id) => {
return api.get(`/coupon_user/${id}`)
}
const searchCoupon_User = (page,paginator,searchKey) => {
return api.get(`/coupon_user/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteCoupon_User = (id) => {
return api.delete(`/coupon_user/${id}`)
}
export {getCoupon_User,addCoupon_User,updateCoupon_User,getAllCoupon_User,getOneCoupon_User,searchCoupon_User,deleteCoupon_User}



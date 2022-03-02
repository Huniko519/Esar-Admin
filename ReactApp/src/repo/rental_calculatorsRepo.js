import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getRental_Calculators = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllRental_Calculators(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchRental_Calculators(pageNo+1,pageSize,search);
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


const addRental_Calculators = (data) => {
return api.post(`/rental_calculators`,data)
}
const updateRental_Calculators = (id,data) => {
return api.put(`/rental_calculators/${id}`,data)
}
const getAllRental_Calculators = (page,paginator) => {
return api.get(`/rental_calculators/?page=${page}&paginator=${paginator}`)
}
const getOneRental_Calculators = (id) => {
return api.get(`/rental_calculators/${id}`)
}
const searchRental_Calculators = (page,paginator,searchKey) => {
return api.get(`/rental_calculators/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteRental_Calculators = (id) => {
return api.delete(`/rental_calculators/${id}`)
}
export {getRental_Calculators,addRental_Calculators,updateRental_Calculators,getAllRental_Calculators,getOneRental_Calculators,searchRental_Calculators,deleteRental_Calculators}



import api from "../api/axios";


//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getBook_Instantlies = async (pageNo,pageSize,search) => {
    let res;
    if(search.length===0) {
        res = await getAllBook_Instantlies(pageNo+1,pageSize);
    }

    else{
        try {
            res = await searchBook_Instantlies(pageNo+1,pageSize,search);
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


const addBook_Instantlies = (data) => {
return api.post(`/book_instantlies`,data)
}
const updateBook_Instantlies = (id,data) => {
return api.put(`/book_instantlies/${id}`,data)
}
const getAllBook_Instantlies = (page,paginator) => {
return api.get(`/book_instantlies/?page=${page}&paginator=${paginator}`)
}
const getOneBook_Instantlies = (id) => {
return api.get(`/book_instantlies/${id}`)
}
const searchBook_Instantlies = (page,paginator,searchKey) => {
return api.get(`/book_instantlies/search/${searchKey}/?page=${page}&paginator=${paginator}`)
}
const deleteBook_Instantlies = (id) => {
return api.delete(`/book_instantlies/${id}`)
}
export {getBook_Instantlies,addBook_Instantlies,updateBook_Instantlies,getAllBook_Instantlies,getOneBook_Instantlies,searchBook_Instantlies,deleteBook_Instantlies}



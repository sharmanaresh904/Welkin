import axios from "axios"

export const getApi = async () => {
  const data= await axios.get('http://localhost:8080/posts')
  return data
    
  };
export const updateApi = async(id,form)=>{
   await  axios.patch(`http://localhost:8080/posts/${id}`,form)
}
   
export const deleteApi = async(id)=>{
   await axios.delete(`http://localhost:8080/posts/${id}`)
}

export const postApi =(form)=>{
  axios.post(`http://localhost:8080/posts`,form)
}
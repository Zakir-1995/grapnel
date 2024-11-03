const url = `https://api.cloudinary.com/v1_1/dnbsmtmem/image/upload`;
const uploadImage = async (image) => {
    const formData = new FormData() 
    formData.append("file", image)
    formData.append("upload_preset","grapnel_mern")
    const dataResponse = await fetch(url, {
      method: "post",
      body: formData,
    });

 const data =await dataResponse.json()
        console.log(data);
}

export default uploadImage
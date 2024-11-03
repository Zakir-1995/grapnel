import {toast} from 'react-hot-toast'
import summeryApi from '../common/index'

const addToCart = async (e, id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(summeryApi.addToCart.url, {
        method: summeryApi.addToCart.method,
        headers: {
            "content-type":"application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            productId:id
        })
    })
    const fetchData = await response.json()
    if (fetchData.success) {
        toast.success(fetchData.message)
    }
        if (fetchData.error) {
          toast.error(fetchData.message);
        }
        return fetchData
}

export default addToCart
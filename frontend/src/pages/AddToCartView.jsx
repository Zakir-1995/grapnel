import { useContext, useEffect, useState } from "react";
import summeryApi from "../common";
import { toast } from "react-hot-toast";
import displayCurrency from "../helper/displayCurrency";
import { countries } from "countries-list";
import { FaRegTrashAlt } from "react-icons/fa";
import Context from "../context";

const AddToCartView = () => {
  const [addToCartProduct, setAddToCartProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const countriesList = Object.values(countries);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
    const { getCountAddToCart } = useContext(Context);
  const viewAddToCart = async () => {

    setLoading(true);
    const response = await fetch(summeryApi.addToCartView.url, {
      method: summeryApi.addToCartView.method,
      credentials: "include",
    });
    setLoading(false);
    const fetchResponse = await response.json();
    if (fetchResponse?.success) {
      setAddToCartProduct(fetchResponse?.data);
    }
    if (fetchResponse?.error) {
      toast.error(fetchResponse?.message);
    }
  };

  const increaseQty = async (id, qty) => {
    const response = await fetch(summeryApi.updateAddToCart.url, {
      method: summeryApi.updateAddToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: id,
        qty: qty + 1,
      }),
    });
    const fetchResponse = await response.json();
    if (fetchResponse.success) {
      viewAddToCart();
    }
  };

  const decreaseQty = async (id, qty) => {
    const response = await fetch(summeryApi.updateAddToCart.url, {
      method: summeryApi.updateAddToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: id,
        qty: qty - 1,
      }),
    });
    const fetchResponse = await response.json();
    if (fetchResponse.success) {
      viewAddToCart();
    }
  };

  useEffect(() => {
    viewAddToCart();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(summeryApi.deleteCartProduct.url, {
      method: summeryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: id,
      }),
    });
    const fetchResponse = await response.json();
    if (fetchResponse.success) {
      viewAddToCart()
      getCountAddToCart()
      toast.success(fetchResponse.message);
    }
  };

  const totalQty = addToCartProduct.reduce((prevValue, currentValue)=>prevValue + currentValue.qty,0)
  const totalPrice = addToCartProduct.reduce((prev, curr)=>prev + (curr?.qty*curr?.productId?.sellingPrice),0)
  const discountPrice = addToCartProduct.reduce((prev, curr) => prev + (curr?.productId?.price - curr?.productId?.sellingPrice) * curr?.qty, 0)
  
const deliveryCharge ="130.00"

  return (
    <div className="container mx-auto">
      {addToCartProduct.length <= 0 ? (
        <div className=" py-4 w-full flex justify-center items-center">
          <p className=" text-2xl font-semibold text-metal capitalize">
            No Product found in Cart
          </p>
        </div>
      ) : (
        <>
          <div className=" p-3">
            <h5 className="text-xl font-semibold text-black">Shopping Cart</h5>

            <span className="text-sm font-semibold text-metal">
              {addToCartProduct.length} item in your shopping cart
            </span>
          </div>
          <div className="flex gap-4 p-3">
            <div className=" bg-white  px-5 shadow-md rounded-md flex-1">
              <table className="w-full text-left ">
                <thead>
                  <tr className="">
                    <th className="p-2 ">Product</th>
                    <th className="p-2 ">Price</th>
                    <th className="p-2 ">Quantity</th>
                    <th className="p-2 ">Total Price</th>
                    <th className="p-2 ">Delete</th>
                  </tr>
                </thead>
                {addToCartProduct.length > 0 &&
                  addToCartProduct?.map((product) => (
                    <tr
                      key={product._id}
                      className=" border-b last:border-none"
                    >
                      <td className=" p-2  ">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product?.productId?.productImage?.flat()[0]?.url
                            }
                            alt=""
                            className="w-24 h-28  rounded mt-3 object-contain"
                          />
                          <div className="">
                            <span className="text-metal font-semibold text-xs ">
                              {product?.productId?.category}
                            </span>
                            <h5 className="text-black font-semibold text-xl ">
                              {product?.productId?.productName}
                            </h5>
                            <span className="text-metal font-semibold text-xs ">
                              {product?.productId?.brandName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className=" p-2  ">
                        {displayCurrency(product?.productId?.sellingPrice)}
                      </td>
                      <td className=" p-2  ">
                        <button
                          className="border border-slate-400 px-2 rounded-md "
                          onClick={() =>
                            decreaseQty(product?._id, product?.qty)
                          }
                        >
                          -
                        </button>
                        <span className="px-2">{product?.qty}</span>
                        <button
                          className="border border-slate-400 px-2 rounded-md "
                          onClick={() =>
                            increaseQty(product?._id, product?.qty)
                          }
                        >
                          +
                        </button>
                      </td>
                      <td className=" p-2  ">
                        {displayCurrency(
                          product?.qty * product?.productId?.sellingPrice
                        )}
                      </td>
                      <td className=" p-2  ">
                        <button
                          className="text-red-700 "
                          onClick={() => handleDelete(product?._id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
            <div className="bg-white shadow-md rounded-md p-4 h-fit">
              <div>
                <h6 className="text-lg font-semibold text-black">
                  Calculated Shopping
                </h6>
                <form className="py-2 space-y-2 flex flex-col">
                  <select
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 "
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    <option value={"country"} disabled>
                      Country
                    </option>
                    {countriesList.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                  />
                  <input
                    className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                    type="number"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address Line"
                  />
                  <div className="mb-4 flex items-center gap-3 ">
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                    />
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="number"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="ZIP Code"
                    />
                  </div>
                  <div className="bg-gray-100 shadow-md rounded-md p-3 ">
                    <p className="text-lg font-semibold text-black">
                      Cart Total
                    </p>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm font-semibold text-metal">
                        {" "}
                        Quantity:
                      </span>
                      <span className="text-sm font-semibold text-metal">
                        {totalQty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-metal">
                        Cart Subtotal:
                      </span>
                      <span className="text-sm font-semibold text-metal">
                        {displayCurrency(totalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-metal">
                        Delivery Fee:
                      </span>
                      <span className="text-sm font-semibold text-metal">
                        BDT130.00
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm font-semibold text-metal">
                        Discount:
                      </span>
                      <span className="text-sm font-semibold text-metal">
                        {displayCurrency(discountPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-metal">
                        Cart Total:
                      </span>
                      <span className="text-sm font-semibold text-metal">
                        {displayCurrency(
                          (totalPrice + discountPrice) - deliveryCharge
                        )}
                      </span>
                    </div>
                  </div>
                  <button className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
                    Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCartView;

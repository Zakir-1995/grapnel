import { useLocation } from "react-router-dom";
import summeryApi from "../common";
import { useEffect, useState } from "react";
import SearchProductCard from "../components/SearchProductCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const response = await fetch(summeryApi.searchQuery.url + query.search);
      const dataResponse = await response.json();
      if (dataResponse.success) {
        setLoading(false)
        setData(dataResponse.data);
      }
    };
    fetchProduct();
  }, [query]);
  return (
    <div>
      {
        
        data.length <= 0 && (
        <div className="flex justify-center items-center mt-5 ">
          <p className=" text-2xl font-semibold">No Product Found!</p>
        </div>
        )
      
      }

      {!loading && data.length > 0 && (
        <SearchProductCard data={ data} />
      )}
    </div>
  );
};

export default SearchProduct;

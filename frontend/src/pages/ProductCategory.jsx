import productCategory from "../helper/ProductCategory";
import { useEffect, useState } from "react";
import CategoryProductCard from "../components/CategoryProductCard";
import summeryApi from "../common";
import { useLocation, useNavigate } from "react-router-dom";
const ProductCategory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((el) => (urlCategoryListObject[el] = true));
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(summeryApi.filterCategory.url, {
        method: summeryApi.filterCategory.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          filterCategory: filterCategoryList,
        }),
      });
      const fetchRes = await res.json();
      setLoading(false);
      setData(fetchRes?.data || []);
    };
    fetchData();
  }, [filterCategoryList]);

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    const arrayOfObject = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfObject);

    // format for the Url change when check the Checkbox
    const URLFormate = arrayOfObject.map((el, index) => {
      if (arrayOfObject.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate(`/product-category?` + URLFormate.join(""));
  }, [selectCategory, navigate]);

  const handleSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value)
    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
       if (value === "dsc") {
         setData((prev) =>
           prev.sort((a, b) => b.sellingPrice - a.sellingPrice)
         );
       }
  };
  useEffect(() => {
  },[sortBy])

  return (
    <div className="grid grid-cols-12 min-h-[calc(100vh-120px)] gap-4">
      <div className="bg-white p-4 col-span-2 h-full shadow overflow-y-scroll">
        <form>
          <h5 className="text-lg font-semibold text-metal border-b py-2">
            Sort By
          </h5>
          <div className="py-4 flex gap-2 items-center">
            <input
              type="radio"
              name="sort by"
              className="cursor-pointer"
              onChange={handleSortBy}
              value={"asc"}
              checked={sortBy === "asc"}
            />
            <span className="text-sm font-semibold text-metal">
              Low to High
            </span>
          </div>
          <div className=" flex gap-2 items-center">
            <input
              type="radio"
              value={"dsc"}
              checked={sortBy === "dsc"}
              name="sort by"
              className="cursor-pointer"
              onChange={handleSortBy}
            />
            <span className="text-sm font-semibold text-metal">
              High to Low
            </span>
          </div>
        </form>
        <form>
          <h5 className="text-lg font-semibold text-metal border-b py-2">
            Catagory
          </h5>
          <ul className="flex flex-col gap-2 py-2">
            {productCategory.map((cat) => (
              <li key={cat.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  value={cat?.value}
                  checked={selectCategory[cat?.value]}
                  id={cat?.value}
                  onChange={handleSelectCategory}
                  className="cursor-pointer"
                />
                <label
                  htmlFor={cat?.value}
                  className="text-sm font-semibold text-metal"
                >
                  {cat?.label}
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
      <div className="w-full col-span-10">
        {data?.length !== 0 && !loading && (
          <CategoryProductCard data={data} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default ProductCategory;

import BannerProduct from "../components/BannerProduct";
import GetCategoryProductOne from "../components/GetCategoryProductOne";
import HorizontalCategoryProduct from "../components/HorizontalCategoryProduct";
import VerticalCategoryProduct from "../components/VerticalCategoryProduct";

const Home = () => {
  return (
    <div>
      <GetCategoryProductOne />
      <BannerProduct />
      <HorizontalCategoryProduct
        category={"Airdopes"}
        heading={"Top Airdopes"}
      />
      <HorizontalCategoryProduct
        category={"camera"}
        heading={"Popular Cameras"}
      />
      <VerticalCategoryProduct category={"earphones"} heading={"Earphones"} />

      <VerticalCategoryProduct
        category={"mobiles"}
        heading={"Mobiles And Accessories"}
      />
      <VerticalCategoryProduct category={"mouse"} heading={"Mouses"} />
      <VerticalCategoryProduct category={"printers"} heading={"Printers"} />
      <VerticalCategoryProduct category={"processor"} heading={"Processor"} />
      <VerticalCategoryProduct category={"speckers"} heading={"Speckers"} />
      <VerticalCategoryProduct category={"trimmers"} heading={"Trimmers"} />
      <VerticalCategoryProduct category={"watches"} heading={"Watches"} />
      <VerticalCategoryProduct
        category={"televisions"}
        heading={"Televisions"}
      />
      <VerticalCategoryProduct
        category={"refrigerator"}
        heading={"Refrigerator"}
      />
    </div>
  );
};

export default Home;

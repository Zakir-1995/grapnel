const express = require("express");

const router = express.Router();
const userSignupController = require("../controllers/user/userSignup");
const userSignInController = require("../controllers/user/userSignin");
const userDetailsControllers = require("../controllers/user/userDetails");
const authTokenController = require("../middleware/authToken");
const userLogout = require("../controllers/user/userLogout");
const allUser = require("../controllers/user/allUser");
const updateUser = require("../controllers/user/updateUser");
const uploadProductController = require("../controllers/product/uploadProduct");
const getProductController = require("../controllers/product/getProduct");
const editProductController = require("../controllers/product/editProduct");
const deleteProductController = require("../controllers/product/deleteProduct");
const deleteUserController = require("../controllers/user/deleteUser");
const getCategoryProduct = require("../controllers/product/getCategoryProductOne");
const categoryWiseProduct = require("../controllers/product/categoryWiseProduct");
const detailsProduct = require("../controllers/product/detailsProduct");
const addToCart = require("../controllers/user/addToCartController");
const countAddToCart = require("../controllers/user/countAddToCart");
const addToCartViewProduct = require("../controllers/user/addToCartViewProduct");
const updateAddToCart = require("../controllers/user/updateAddToCartProduct");
const deleteCartProduct = require("../controllers/user/deleteCartProduct");
const searchQuery = require("../controllers/product/searchQuery");
const filterCategoryList = require("../controllers/product/filterCategoryList");
const uploadImages = require("../controllers/uploadImages");

// all user routes
router.post("/signup", userSignupController);
router.post("/signin", userSignInController);
router.get("/user-details", authTokenController, userDetailsControllers);
router.get("/user-logout", userLogout);

// admin panel routes

// user routes
router.get("/all-user", authTokenController, allUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUserController);
router.post("/add-to-cart",authTokenController, addToCart);
router.post("/count-add-to-cart",authTokenController, countAddToCart);
router.post("/add-to-cart-view",authTokenController, addToCartViewProduct);
router.post("/update-add-to-cart", updateAddToCart);
router.post("/delete-cart-product", deleteCartProduct);
router.post("/filter-category-list", filterCategoryList);

//All product Routes
router.post("/upload-product", uploadProductController);
router.get("/get-product", getProductController);
router.put("/edit-product", editProductController);
router.delete("/delete-product", deleteProductController);
router.get("/getCategory-product", getCategoryProduct);
router.post("/getCategoryWise-product", categoryWiseProduct);
router.post("/details-product", detailsProduct);
router.get("/search", searchQuery);
router.post("/upload-images", uploadImages);

module.exports = router;

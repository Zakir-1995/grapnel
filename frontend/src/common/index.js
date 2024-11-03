const backendDomain = "http://localhost:8080";

const summeryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  userDetails: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  userLogout: {
    url: `${backendDomain}/api/user-logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "put",
  },

  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  getProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  editProduct: {
    url: `${backendDomain}/api/edit-product`,
    method: "put",
  },
  deleteProduct: {
    url: `${backendDomain}/api/delete-product`,
    method: "delete",
  },
  deleteUser: {
    url: `${backendDomain}/api/delete-user`,
    method: "delete",
  },
  getCategoryProductOne: {
    url: `${backendDomain}/api/getCategory-product`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/getCategoryWise-product`,
    method: "post",
  },
  detailsProduct: {
    url: `${backendDomain}/api/details-product`,
    method: "post",
  },
  addToCart: {
    url: `${backendDomain}/api/add-to-cart`,
    method: "post",
  },
  countAddToCart: {
    url: `${backendDomain}/api/count-add-to-cart`,
    method: "post",
  },
  addToCartView: {
    url: `${backendDomain}/api/add-to-cart-view`,
    method: "post",
  },
  updateAddToCart: {
    url: `${backendDomain}/api/update-add-to-cart`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },
  searchQuery: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterCategory: {
    url: `${backendDomain}/api/filter-category-list`,
    method: "post",
  },

  uploadImages: {
    url: `${backendDomain}/api/upload-images`,
    method: "post",
  },
};

export default summeryApi;

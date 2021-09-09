export enum Endpoints {

  AUTHENTICATION = '/auth',
  GET_PRODUCT_CATEGORIES = '/get-product-categories',
  GET_PRODUCTS = '/get-products',
  GET_COMMUNITIES = '/get-community',
  GET_RECOMMENDED_COMMUNITIES = '/get-recomend-communities',
  SEARCH_COMMUNITIES = '/get-search-community',
  GET_MY_COMMUNITIES = '/get-my-communities',
  GET_USER_COMMUNITY = "/get-user-community",
  SOCIAL_LOGIN = "/social-login",
  CREATE_ACCOUNT = "/create-account",
  GET_PRODUCT_DETAILS = "/get-product-details",
  GET_SKILLS_CATEGORIES = '/get-skill-categories',
  LIKE_PRODUCT = "/like-product",
  GET_SIMILAR_PRODUCTS = "/get-similar-products",
  GET_USER_GOODS = "/get-user-goods",
  GET_USER_SKILLS = "/get-user-skills",
  GET_USER_SPECIFIC_SKILLS = "/get-user-specific-skills",
  GET_USER_DATA = "/get-user-data",
  // google url for getting lat and lng from location, location form lat and lng
  GET_COMMUNITY_PROFILE = "/get-group-data",
  // google url for getting lat and lng from location, location form lat and lng
  GET_LAT_LNG = "https://maps.googleapis.com/maps/api/geocode/json",
  SEARCH_PRODUCTS = "/search-products",
  SEARCH_ON_ALL_COMMUNITIES = '/get-all-communities',
  //forget password
  FORGOT_PASSWORD = "/forgot-password",
  //forget password change
  FORGOT_PASSWORD_CHANGE = "/reset-password"
}

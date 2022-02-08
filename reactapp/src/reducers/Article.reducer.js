export default function (product = null, action) {
  if (action.type === "productSelectedFromHomeScreen") {
    console.log("----ACTION.PRODUCT DANS ARTICLE REDUCER PROVENANT DU HOMESCREEN----", action.product);

    return action.product;
  }
  if (action.type === "productSelectedFromResultScreen") {
    console.log("----ACTION.PRODUCT DANS ARTICLE REDUCER PROVENANT DU RESULTSCREEN----", action.product);

    return action.product;
  } else {
    return product;
  }
}

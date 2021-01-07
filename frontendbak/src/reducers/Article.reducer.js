export default function(product = null, action) {
    if(action.type == 'productSelectedFromHomeScreen') {
        console.log("product from reducer",action.product);

        return action.product;
    }
    if(action.type == 'productSelectedFromResultScreen') {
        console.log("product from reducer",action.product);

        return action.product;
    }
    else 
    {
        return product
    }
}
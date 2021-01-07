export default function (subcat = '', action){
    if(action.type == 'subCatFromFilter'){
        var newSubcat = action.subcat
        console.log("test subcat selected", newSubcat)
        return newSubcat;
    } else{
        return subcat

    }
}
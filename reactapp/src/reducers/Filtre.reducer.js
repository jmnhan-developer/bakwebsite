export default function (subcat = "", action) {
  if (action.type === "subCatFromFilter") {
    var newSubcat = action.subcat;

		console.log("---ACTION.SUBCAT---", action.subcat)
    
    return newSubcat;
  } else {
    return subcat;
  }
}

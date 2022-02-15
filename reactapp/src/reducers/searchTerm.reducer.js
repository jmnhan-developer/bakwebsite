export default function (searchTerm = "", action) {
  if (action.type === "searchTermFromSearchBar") {
    var newSearchTerm = action.searchTerm;
		console.log("---QUEL EST LA VALEUR DE NEWSEARCHTERM DANS SEARCHTERM REDUCER---", newSearchTerm );
		return newSearchTerm
  } else {
		console.log("---QUEL EST LA VALEUR DE SEARCHTERM DANS SEARCHTERM REDUCER---", searchTerm);
    return searchTerm;
  }
}

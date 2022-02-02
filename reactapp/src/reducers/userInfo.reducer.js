export default function (datas = {}, action) {
  if (action.type === "userInfoFromSignIn") {
    var newDatas = action.user;

    console.log("----DATAS DANS USERINFO REDUCER FROM SIGNIN----", datas);
    console.log("----NEWDATAS DANS USERINFO REDUCER FROM SIGNIN----", newDatas);
    console.log("----ACTION.USER DANS USERINFO REDUCER FROM SIGNIN----",action.user);

    return newDatas;
  }
  if (action.type === "userInfoFromSignUp") {
    var newDatas = action.user;

		console.log("----DATAS DANS USERINFO REDUCER FROM SIGNUP----", datas);
    console.log("----NEWDATAS DANS USERINFO REDUCER FROM SIGNUP----", newDatas);
    console.log("----ACTION.USER DANS USERINFO REDUCER FROM SIGNUP----",action.user);
		
    return newDatas;
  } else {
    return datas;
  }
}

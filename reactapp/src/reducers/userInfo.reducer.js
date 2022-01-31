export default function (datas = {}, action) {

    if (action.type === 'getUserInfo') {

        var newDatas = action.user;

        console.log ("---- QU'EST CE QUE DATAS DANS USERINFO REDUCER----", datas)
        console.log ("---- QU'EST CE QUE NEW DATAS DANS USERINFO REDUCER----", newDatas)

        return newDatas;
    }
    else {
        return datas;
    }
}
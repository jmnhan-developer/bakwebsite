export default function( userStatus = "",action) {
  
    if(action.type === 'userisabuyer') {

        var newUserStatus =action.userStatus;
        console.log("---QUEL EST LA VALEUR DE NEWUSERSTATUS DE L'UTILISATEUR---",newUserStatus);
        return newUserStatus;
      
    }
    if(action.type === 'userisaseller') {

        var newUserStatus =action.userStatus;
        console.log("---QUEL EST LA VALEUR DE NEWUSERSTATUS DE L'UTILISATEUR---",newUserStatus);
        return newUserStatus;
      
    }
    else 
    {    
        return userStatus; 
    }
    
  }
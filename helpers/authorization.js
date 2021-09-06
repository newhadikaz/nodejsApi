

const getToken = (req) => {
    var geToken = req.get('Authorization')
    var token = {}
    // check if this token is valid
    if(geToken == "Token 219be80504a7fcac11d5fb2e2aaada9d0c6be6d15b2497241a5f2d262012043d"){
        // get user info and permission from database
         token = {
             // info
           name : 'hadi',
           // permissions
           role : 'one'
         }
         return token
    }
}

const allow  = (req, role, token) => {
    if(token.role == role){
        req.token = token
        return true
      }else {
          return false
      }
}

module.exports = {
    getToken,
    allow
  }
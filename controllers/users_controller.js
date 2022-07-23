module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : 'User Profile'
    })
}

//add some actions
//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : "Chatting Engine | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title : "Chatting Engine | Sign In"
    })
}
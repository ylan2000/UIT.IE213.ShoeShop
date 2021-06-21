function ensureAuthenicated(req, res, next){
    if(!req.session.user){
        res.status("403");
        res.redirect('/signInFirst');
    }
    else
        console.log("Logged in OK");
    next();
}

function authRole(req, res, next){
    if(!req.session.user){
        console.log("Logged in user Failed");
        res.status("403");
        res.redirect('/signInFirst');
    }else {
        if(req.session.user.role != 1){
            res.status("401");
            res.redirect('/permissiondenied');
            console.log("Logged in admin failed. This is a client");
        } else{
            res.status("200");
            console.log("Logged in admin OK");
        }
    }
    next();
}

module.exports ={
    ensureAuthenicated,
    authRole,
}
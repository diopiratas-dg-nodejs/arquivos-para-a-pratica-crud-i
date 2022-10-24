function admin(req, res, next){
    let user = req.session.userLogged;
    if (user){               
        next();        
    }else{
        const error = new Error('Usuario não tem privilegios para acessar esta pagina')        
        error.status = "401";
        throw error;
    }
}

module.exports = admin;
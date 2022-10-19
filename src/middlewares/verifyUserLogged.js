let admins = ['Luciana', 'Guilherme', 'Jonatas', 'Diogenes', 'Manuela', 'Alberto']

function admin(req, res, next){
    let user = req.query.user;

    let authorizedUser = false;
    if (user){
        admins.forEach(usr => {
            if (user == usr){
               authorizedUser = true;
            }
        });

        if (authorizedUser){
            next();
        }else{    
            const error = new Error('Usuario não tem privilegios para acessar esta pagina')        
            error.status = "401";
            throw error;
        }
    }else{
        const error = new Error('Usuario não tem privilegios para acessar esta pagina')        
        error.status = "401";
        throw error;
    }
}

module.exports = admin;
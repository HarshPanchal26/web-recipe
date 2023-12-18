const { checkUserCredential } = require('../services/serviceForLogIn')

const controllerForLogIn = async (req, res) => {
    const Obj = req.body;
    console.log("Obj" , Obj)
    try {
        const result = await checkUserCredential({
            email: Obj.email,
            password: Obj.password
        });
        res.cookie('access_token', result.token, {
            httpOnly: true,      // To prevent access from javascript 
            secure: true,       // For secure connection 
            sameSite: true,    // To limit cross site request 
            maxAge: (1800000) // vanish after 1 hour 
        })
        res.status(201).json({
            authenticated: true,
            message: 'Welcome Back'
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

module.exports = controllerForLogIn
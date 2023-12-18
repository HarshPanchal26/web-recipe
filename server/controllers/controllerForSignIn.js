const ServiceForSignIn = require('../services/serviceForSignIn')
const {encryptedPassword} = require('../services/servicesForAuthentication')

const controllerForSignIn = async (req, res) => {
    const objForSiginData = req.body
    try {
        const hashpassword = await encryptedPassword(objForSiginData.password)
        const result = await ServiceForSignIn.createUser({...objForSiginData , password : hashpassword});
        console.log("Data is " , result)
        if (result?.token) {
            const session_token = result.token;
            res.cookie('access_token', session_token, {
                httpOnly: true, // To prevent access from javascript 
                secure: true,   //For secure connection 
                sameSite: true, //To limit cross site request 
                maxAge: (1800000) // vanish after 1 hour 
            })
        }
        res.status(200).json({
            status: true,
            authorization: true,
            message: 'Sign In Completed'
        })
    } catch (error) {
        // Handle error if needed
        console.error("================>" ,error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = controllerForSignIn;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTA4NTU1OTU3MTIyZTg5ZTkwYTAzZTYiLCJ0eXBlIjoicHJvZHVjdCIsImlhdCI6MTcwMjAzNDEyMSwiZXhwIjoxNzAyMDM1OTIxfQ.ugVfry9SG60HdE9TIdFJO8Z5K8rIJNF4jOQbxHYqRmw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTA4NTU1OTU3MTIyZTg5ZTkwYTAzZTYiLCJ0eXBlIjoicHJvZHVjdCIsImlhdCI6MTcwMjAzNDEyMSwiZXhwIjoxNzAyMDM1OTIxfQ.ugVfry9SG60HdE9TIdFJO8Z5K8rIJNF4jOQbxHYqRmw

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTdiZjc0MWFjZjc2NTJhOGFkNjE1NGIiLCJpYXQiOjE3MDI2MjMwNDEsImV4cCI6MTcwMjYyNDg0MX0.wv3RONODn8n75rOMYM7b375WI5zB2o5KhvcNqzTum1E
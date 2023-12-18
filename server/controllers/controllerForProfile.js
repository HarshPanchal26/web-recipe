const {fetchProfile , fetchCommanUserData} = require('../services/serviceForProfile')

const controllerForPerosnalProfile = async(req , res)=>{
    try {
        const user = await fetchCommanUserData(res.locals.uid);
        const profile = await fetchProfile(res.locals.uid);
        res.status(201).json({
            message : 'Fetch Completed',
            userData : user,
            profile : profile
        })
    } catch (error) {
        res.status(402).json({
            message : error
        })
    }
}

module.exports = {controllerForPerosnalProfile}
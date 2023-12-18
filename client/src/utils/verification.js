
export const verifyAllFeilds = (Obj) => {
    return new Promise((resolve, reject) => {
        const values = Object.values(Obj);
        for (var x in values) {
            if (!values[x]) {
                // reject(new Error(`${Object.keys(Obj)[x]} should not be empty`))
                reject(new Error(`${Object.keys(Obj)[x]} should not be empty`))
            }
        }
        resolve({
            type: 'None',
            message: `All Feilds are Feiled`,
            Verified: true
        })
    })
}

export const checkEmail = (email) => {
    return new Promise((resolve, reject) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            reject(new Error('Invalid email Address , Please Enter valid one'))
        }

        resolve({
            type: 'None',
            message: `Email is proper`,
            Verified: true
        })

    })
}

const checkPasswordMatch = (password, cpassword) => {
    return new Promise((resolve, reject) => {
        if (password !== cpassword) {
            console.log("Inavlid Password")
            reject(new Error('Password are not matching'))
        }
        resolve({
            type: 'None',
            message: `Passowrds are proper`,
            Verified: true
        })

    })
}

const checkValidString = (obj) => {
    const stringRegx = /^[^0-9]*$/;
    let vlaues = Object.values(obj);
    return new Promise((resolve, reject) => {

        for (var x in vlaues) {
            if (!stringRegx.test(vlaues[x])) {
                reject(new Error(`No Special charachter or Numeric value is allowed for ${Object.keys(obj)[x]}`))
            }
        }
        resolve({
            type: 'None',
            message: `Ebverything is Up to date`,
            Verified: true
        })
    })

}

export const verifyDataForLogIn = (Obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            await checkEmail(Obj.email)
            resolve({
                type: 'None',
                message: `Everything is Ohk`,
                Verified: true
            })
        } catch (error) {
            reject({
                type: 'error',
                message: `${error.message}`,
                Verified: false
            })
        }
    })
}

export const verifyDataForSignIn = (Obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            await verifyAllFeilds(Obj);
            checkValidString({ Name :Obj.fname , Suername : Obj.lname})
            await checkEmail(Obj.email);
            await checkPasswordMatch(Obj.password , Obj.cpassword)
            resolve({
                type: 'None',
                message: `Everything is Ohk`,
                Verified: true
            })
        } catch (error) {
            reject({
                type: 'error',
                message: `${error.message}`,
                Verified: false
            })
        }
    })
}






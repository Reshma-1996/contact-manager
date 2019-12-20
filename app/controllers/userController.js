const User=require('../models/User')
const _=require('lodash')


//register
module.exports.register = (req, res)=>{
    //serialize requests objects / inputs
    const body = _.pick(req.body,['username','email','password','mobile'])
    const user = new User(body)
    user.save()
        .then(user=>{
            // const { _id, username, email } = user
            // res.json({ _id, username, email })
            //serialize requests objects / outputs
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//login
// module.exports.login = (req, res)=>{
//     const body = req.body
//     User.findByCredentials(body.email, body.password)
//         .then(user=>{
//             user.generateToken()
//                 .then(token=>{
//                     res.setHeader('x-auth', token).send('Login done successfully')
//                 })
//                 .catch(err=>{
//                     res.json(err)
//                 })
//         })
//         .catch(err=>{
//             res.json(err)
//         })
// }

module.exports.login=(req, res)=>{
    const body=_.pick(req.body,['email','password'])
    //console.log(body)
    User.findByCredentials(body.email, body.password)
    .then(user=>{
        //console.log(user)
        user.generateToken()
     .then(token=>{
                console.log(token)
                res.send(token)
            })
            .catch(err=>{
                res.json(err)
            })
        })
         .catch(err=>{
             res.json(err)
         })
    }

//account
module.exports.account = (req, res)=>{
    const {user}= req
    // const{ _id, username, email} = user
    // res.json({
    //     _id, username, email
   // })
   res.json(_.pick(user,['id', 'username', 'email']))
}

//logout
// module.exports.destroy = (req, res)=>{
//     const body = req.body
//     User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
//         .then(user=>{
//             user.generateToken()
//                 .then(token=>{
//                     res.setHeader('x-auth', token).send('Logged out successfully')
//                 })
//                 .catch(err=>{
//                     res.json(err)
//                 })
//         })
//         .catch(err=>{
//             res.json(err)
//         })
// }
module.exports.logout=(req, res)=>{
    const { user, token } = req
    User.findByIdAndUpdate(user._id,{$pull:{'tokens':{'token':token}}})
    .then(()=>{
        res.json({notice:'successfully logged out'})
    })
    .catch((err)=>{
        res.json(err)
    })
}

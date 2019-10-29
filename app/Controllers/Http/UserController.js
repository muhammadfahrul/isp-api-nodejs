'use strict'

const User = use('App/Models/User')
const {validate} = use('Validator')

class UserController {
    async showUsers({request, response}) {
        const user = await User.query().with('user_role').fetch()

        return response.json({
            status: true,
            message: 'Data User',
            data: user
        })
    }

    async usersId({request, response}) {
        const user = await User.find(request.params.id)

        return response.json({
            status: true,
            message: 'User Id',
            data: user
        })
    }

    async addUsers({request, response}) {
        const rules = {
            nama : 'required',
            email : 'required',
            password : 'required'
        }

        const user_req = request.only(['nama','email','password'])
        const validation = await validate(user_req, rules)
        
        if (validation.fails()) {
            return response.json({
                message : validation.message()
            })
        }

        const user = new User()
        user.user_role_id = user_req.user_role_id
        user.nama = user_req.nama
        user.email = user_req.email
        user.password = user_req.password

        await user.save();

        return response.json({
            message : 'Success',
            data : user
        })
    }

    async editUsers({request, response}) {
        const user = await User.find(params.id)
        if (!user){
            return response.status(404).json({data : 'Data User Not Found'})
        }

        user.user_role_id = user_req.user_role.id
        await user_role.save()

        return response.json({
            message : 'Succces',
            status : 200,
            data : user
        })
    }

    async deleteUsers({request, response}) {
        const user = await User.find(request.params.id)
        await user.delete()

        return response.json({
            message: 'Success',
            status: 200,
            data = user
        })
    }
}

module.exports = UserController

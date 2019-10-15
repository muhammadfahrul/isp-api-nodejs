'use strict'
const UserRole = use('App/Models/UserRole')
const { validate } = use('Validator')

class UserRoleController {
    async showUserRole({request, response}) {
        const user_role = await UserRole.all()

        return response.json(user_role);
    }

    async userRoleId({request, response, params}) {
        const user_role = await UserRole.find(params.id)

        return response.json(user_role);
    }

    async addUserRole({request, response}) {
        const rules = {
            nama : 'required'
        }

        const user_role_req = request.only(['nama'])
        const validation = await validate(user_role_req, rules)

        if (validation.fails()) {
            return response.json({
                message : validation.messages()
        })
        }

        const user_role = new UserRole()
        user_role.nama = user_role_req.nama

        await user_role.save();

        return response.json({
            message : 'Success',
            data : user_role
        });
    }

    async editUserRole({request, response, params}) {
        const user_role_req = request.only(['nama'])
        const user_role = await UserRole.find(params.id)
        if (!user_role) {
            return response.status(404).json({data: 'Role not found'})
        }
        user_role.nama = user_role_req.nama
        await user_role.save()

        return response.json({
            message : 'Succces',
            status : 200,
            data : user_role
        })

    }

    async deleteUserRole({request, response, params}) {
        const user_role = await UserRole.find(params.id)
        if (!user_role) {
            return response.status(404).json({data: 'Role not found'})
        }
        await user_role.delete()

        return response.json({
            message : 'Success',
            status : 204
        })
    }
}

module.exports = UserRoleController

'use strict'

const User = use('App/Models/User')
const {validate} = use('Validator')
const Helpers = use('Helpers')
const Hash = use('Hash')

class UserController {
    async showUsers({request, response}) {
        const users = await User.all()

        return response.json({
            message: 'Data User',
            data: users
        })
    }

    async usersId({request, response}) {
        const user = await User.find(request.params.id)

        return response.json({
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
        user.user_role_id = request.body.user_role_id
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
        const rules = {
            facebook_id: 'required',
            nama: 'required',
            email: 'required',
        }

        const validation = await validate(request.all(), rules);

        if(validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        let facebook_id = request.body.facebook_id;
        let facebook_name = request.body.nama;
        let facebook_email = request.body.email;
        
        let google_id = request.body.google_id;
        let google_name = request.body.nama;
        let google_email = request.body.email;


        // FACEBOOK PHOTO
        const facebook_photo = request.file('photo_profile', {
            types: ['image'],
            size: '2mb'
        });
        let imageName = `${facebook_id}.jpg`;
        await facebook_photo.move(Helpers.tmpPath('images/users'), {
            name: `${facebook_id}.jpg`,
            overwrite: true
        });

        // let checkUser = await User.query().where('facebook_id', facebook_id).first();

        const apiToken = await Hash.make(facebook_id);

        
            // return checkEmail;
            // if(checkEmail.length >= 1) {
            //     return response.status(422).json({message: [{message: 'Email telah terdaftar',field:'email',validation:'unique'}]});
            // }
            
            // DAFTAR USER BARU
            const createUser = await User.find(request.params.id);
            createUser.nama = facebook_name;
            createUser.facebook_id = facebook_id;
            createUser.email = facebook_email;
            createUser.nama = google_name;
            createUser.google_id = google_id;
            createUser.email = google_email;
            createUser.photo_profile = imageName;
            createUser.api_token = apiToken;
            createUser.user_role_id = 2; // 1 = ADMIN, 2 = USER
            createUser.save();
            
            response.json({
                'status': true,
                'message': 'Sukses Update',
                'token': apiToken,
                'data': createUser
            });
            
            
        
    }

    async deleteUsers({request, response}) {
        const user = await User.find(request.params.id)
        await user.delete()

        return response.json({
            message: 'Success Delete',
            status: 200,
            data: user
        })
    }
}

module.exports = UserController

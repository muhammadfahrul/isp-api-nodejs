const User = use("App/Models/User");
const Hash = use('Hash')
const Helpers = use('Helpers')
const { validate } = use('Validator');
'use strict'

class LoginController {
    async facebook({ request, response }) {
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

        let checkUser = await User.query().where('facebook_id', facebook_id).first();

        const apiToken = await Hash.make(facebook_id);

        if (!checkUser) {
            
            let checkEmail = User.query().where('email', facebook_email).fetch();
            // return checkEmail;
            if(checkEmail.length >= 1) {
                return response.status(422).json({message: [{message: 'Email telah terdaftar',field:'email',validation:'unique'}]});
            }
            
            // DAFTAR USER BARU
            const createUser = new User();
            createUser.nama = facebook_name;
            createUser.facebook_id = facebook_id;
            createUser.email = facebook_email;
            createUser.photo_profile = imageName;
            createUser.api_token = apiToken;
            createUser.user_role_id = 2; // 1 = ADMIN, 2 = USER
            createUser.save();

            response.json({
                'status': true,
                'message': 'Sukses Daftar',
                'token': apiToken,
                'user': createUser
            });
        }else{
            checkUser.api_token = apiToken;
            checkUser.save();
            
            response.json({
                'status': true,
                'message': 'Sukses Login',
                'token': apiToken,
            });
        }
    }

    async google({ request, response }) {
        const rules = {
            google_id: 'required',
            nama: 'required',
            email: 'required',
        }

        const validation = await validate(request.all(), rules);

        if(validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        let google_id = request.body.google_id;
        let google_name = request.body.nama;
        let google_email = request.body.email;


        // google PHOTO
        const google_photo = request.file('photo_profile', {
            types: ['image'],
            size: '2mb'
        });
        let imageName = `${google_id}.jpg`;
        await google_photo.move(Helpers.tmpPath('images/users'), {
            name: `${google_id}.jpg`,
            overwrite: true
        });

        let checkUser = await User.query().where('google_id', google_id).first();

        const apiToken = await Hash.make(google_id);

        if (!checkUser) {
            
            let checkEmail = User.query().where('email', google_email).fetch();
            // return checkEmail;
            if(checkEmail.length >= 1) {
                return response.status(422).json({message: [{message: 'Email telah terdaftar',field:'email',validation:'unique'}]});
            }
            
            // DAFTAR USER BARU
            const createUser = new User();
            createUser.nama = google_name;
            createUser.google_id = google_id;
            createUser.email = google_email;
            createUser.photo_profile = imageName;
            createUser.api_token = apiToken;
            createUser.user_role_id = 2; // 1 = ADMIN, 2 = USER
            createUser.save();

            response.json({
                'status': true,
                'message': 'Sukses Daftar',
                'token': apiToken,
                'user': createUser
            });
        }else{
            checkUser.api_token = apiToken;
            checkUser.save();
            
            response.json({
                'status': true,
                'message': 'Sukses Login',
                'token': apiToken,
            });
        }
    }
}

module.exports = LoginController

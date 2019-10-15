const User = use("App/Models/User");
const Hash = use('Hash')
'use strict'

class LoginController {
    async facebook({ request, response }) {
        let facebook_id = request.body.facebook_id;
        let facebook_name = request.body.name;
        let facebook_email = request.body.email;


        // FACEBOOK PHOTO
        const facebook_photo = request.file('photo', {
            types: ['image'],
        });
        let imageName = `${facebook_id}.jpg`;
        await facebook_photo.move(Helpers.tmpPath('images/users'), {
            name: `${facebook_id}.jpg`,
            overwrite: true
        });





        let checkUser = await User.query().where('facebook_id', facebook_id).first();

        if (!checkUser) {
            const apiToken = await Hash.make(facebook_id);

            const createUser = new User();
            createUser.nama = facebook_name;
            createUser.email = facebook_email;
            createUser.photo_profile = imageName;
            createUser.api_token = apiToken;
            createUser.user_role_id = 2; // 1 = ADMIN, 2 = USER
            createUser.save();

            response.json({
                'status': true,
                'message': 'Sukses Login',
                'token': apiToken,
            });
        }
    }

    async google({ request, response }) {

    }
}

module.exports = LoginController

'use strict'

const Galeri = use('App/Models/Galeri')
const {validate} = use('Validator')

class GaleriController {
    async showGaleri({request, response}) {
        const galeri = await Galeri.all()

        return response.json({
            status: true,
            message: 'Data Gallery',
            data: galeri
        })
    }

    async galeriId({request, response}) {
        const galeri = await Galeri.find(request.params.id)

        return response.json({
            status: true,
            message: 'User Gallery',
            data: galeri
        })
    }

    async addGaleri({request, response}) {
        const rules = {
            user_id : 'required|exists:users,id',
            identitas_id : 'required|exists:identitas,id',
            gambar : 'required', 
            deskripsi : 'required',
            is_active : 'required'
        }

        // const galeri_req = request.only(['user_id','identitas_id','gambar','deskripsi','is_active'])
        const validation = await validate(request.all(), rules)

        if (validation.fails())
        {
            return response.json({
                message : validation.message()
            })
        }

        const galeri = new Galeri()
        galeri.user_id = request.body.user_id
        galeri.identitas_id = request.body.identitas_id
        
        const myPicture = request.file('gambar', {
            types: ['image'],
            size: '2mb'
        })
        
        await myPicture.move(Helpers.publicPath('uploads/sarana'))
        addSarana.gambar = new Date().getTime()+'.'+myPicture.subtype
        
        galeri.deskripsi = request.body.deskripsi
        galeri.is_active = request.body.is_active
        
        if(!myPicture.moved()) {
            return myPicture.error()
        }

        await addSarana.save()

        return response.json({
            status: 400,
            message: 'Created Gallery Successfully',
            data: addSarana
        })

    }

    async editGaleri({request, response}) {
        
    }

    async deleteGaleri({request, response, params}) {
        const galeri = await Galeri.find(params.id)
        await galeri.delete()

        if(!galeri){
           return response.json({
               status : 400,
               message : 'Error! Gallery Not Found'
           })
        }

        return response.json({
            status : 204,
            message : 'Success'
        })
     
    }
}

module.exports = GaleriController

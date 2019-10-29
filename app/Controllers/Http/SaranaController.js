'use strict'

const Sarana = use('App/Models/Sarana')
const User = use('App/Models/User')
const {validate} = use('Validator')

const Helpers = use('Helpers')

class SaranaController {
    async showSarana({request, response}) {
        const sarana = await Sarana.query('')
        
        return response.json({
            status: 200,
            message: 'Data Sarana',
            data: sarana
        })
    }

    async saranaId({request, response}) {
        const saranaId = await Sarana.find(request.params.id)

        return response.json({
            status: 201,
            message: 'Sarana ID',
            data: saranaId
        })
    }

    async addSarana({request, response}) {
        const rules = {
            user_id: 'required|exists:users,id',
            nama: 'required',
            deskripsi: 'required',
            is_active : 'required'
        }

        const validation = await validate(request.all(), rules)

        if(validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        const addSarana = new Sarana()
        addSarana.user_id = request.body.user_id
        addSarana.nama = request.body.nama

        const myPicture = request.file('gambar', {
            types: ['image'],
            size: '2mb'
        })
        await myPicture.move(Helpers.publicPath('uploads/sarana'))
        addSarana.gambar = new Date().getTime()+'.'+myPicture.subtype

        addSarana.deskripsi = request.body.deskripsi
        addSarana.is_active = request.body.is_active

        if(!myPicture.moved()) {
            return myPicture.error()
        }

        await addSarana.save()

        return response.json({
            status: 400,
            message: 'Created Sarana Successfully',
            data: addSarana
        })
    }

    async editSarana({request, response}) {
        const rules = {
            user_id: 'required|exists:users,id',
            nama: 'required',
            deskripsi: 'required',
            is_active : 'required'
        }

        const validation = await validate(request.all(), rules)

        if(validation.fails()) {
            return response.json({
                status: false,
                message: validation.messages()
            })
        }

        const editSarana = await Sarana.find(request.params.id)
        editSarana.user_id = request.body.user_id
        editSarana.nama = request.body.nama

        const myPicture = request.file('gambar')
        myPicture.move(Helpers.publicPath('uploads/sarana'),{
            name: editSarana.gambar
        })
        editSarana.gambar = new Date().getTime()+'.'+myPicture.subtype

        editSarana.deskripsi = request.body.deskripsi
        editSarana.is_active = request.body.is_active
        await editSarana.save()

        return response.json({
            status: 400,
            message: 'Updated Sarana Successfully',
            data: editSarana
        })
    }

    async deleteSarana({request, response}) {
        const deleteSarana = await Sarana.find(request.params.id)
        await deleteSarana.delete()

        return response.json({
            status: 400,
            message: 'Deleted Sarana Successfully',
            data: deleteSarana  
        })
    }
}

module.exports = SaranaController

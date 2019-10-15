'use strict'

const Sarana = use('App/Models/Sarana')
const {validate} = use('Validator')

class SaranaController {
    async showSarana({request, response}) {
        const sarana = await Sarana.all()
        
        return response.json({
            status: true,
            message: 'Data Sarana',
            data: sarana
        })
    }

    async saranaId({request, response}) {
        const saranaId = await Sarana.find(request.params.id)

        return response.json({
            status: true,
            message: 'Sarana Id',
            data: saranaId
        })
    }

    async addSarana({request, response}) {
        const rules = {
            nama: 'required',
            is_active : 'required'
        }

        const validation = await validate(request.all(), rules)

        if(validation.fails()) {
            return response.json({
                status: false,
                message: validation.messages()
            })
        }

        const addSarana = new Sarana()
        addSarana.nama = request.body.nama
        addSarana.is_active = request.body.is_active
        await addSarana.save()

        return response.json({
            status: true,
            message: 'Created Sarana Successfully',
            data: addSarana
        })
    }

    async editSarana({request, response}) {
        // let saranaId = request.params.id

        // if(!saranaId == request.all(id)) {

        // }

        const editSarana = await Sarana.find(request.params.id)
        editSarana.nama = request.body.nama
        editSarana.is_active = request.body.is_active
        await editSarana.save()

        return response.json({
            status: true,
            message: 'Updated Sarana Successfully',
            data: editSarana
        })
    }

    async deleteSarana({request, response}) {
        const deleteSarana = await Sarana.find(request.params.id)
        await deleteSarana.delete()

        return response.json({
            status: true,
            message: 'Deleted Sarana Successfully',
            data: deleteSarana
        })
    }
}

module.exports = SaranaController

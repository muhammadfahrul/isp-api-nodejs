'use strict'
const Identitas = use('App/Models/Identita')
const { validate } = use('Validator')

class IdentitaController {
    async showIdentitas({request, response}) {
        const identitas = await Identitas.all()

        return response.json(identitas);
    }

    async identitasId({request, response, params}) {
        const identitas = await Identitas.find(params.id)

        return response.json(identitas);
    }

    async addIdentitas({request, response}) {
        const rules = {
            klasifikasi_id : 'required|exists:klasifikasi,id',
            tahun : 'required',
            nomor_urut : 'required'
        }

        const identitas_req = request.only(['klasifikasi_id', 'tahun', 'nomor_urut'])
        const validation = await validate(identitas_req, rules)

        if (validation.fails()) {
            return response.json({
                message : validation.messages()
        })
        }

        const identitas = new Identitas()
        identitas.klasifikasi_id = identitas_req.klasifikasi_id
        identitas.tahun = identitas_req.tahun
        identitas.nomor_urut = identitas_req.nomor_urut

        await identitas.save();

        return response.json({
            message : 'Success',
            data : identitas
        });
    }

    async editIdentitas({request, response, params}) {
        const identitas_req = request.only(['klasifikasi_id', 'tahun', 'nomor_urut'])
        const identitas = await Identitas.find(params.id)
        if (!identitas) {
            return response.status(404).json({data: 'Role not found'})
        }
        identitas.klasifikasi_id = identitas_req.klasifikasi_id
        identitas.tahun = identitas_req.tahun
        identitas.nomor_urut = identitas_req.nomor_urut
        await identitas.save()

        return response.json({
            message : 'Succces',
            status : 200,
            data : identitas
        })
    }

    async deleteIdentitas({request, response, params}) {
        const identitas = await Identitas.find(params.id)
        if (!identitas) {
            return response.status(404).json({data: 'Role not found'})
        }
        await identitas.delete()

        return response.json({
            message : 'Success',
            status : 204
        })
    }
}

module.exports = IdentitaController

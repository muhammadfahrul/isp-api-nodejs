'use strict'
const Kodefikasi = use('App/Models/Kodefikasi')
const { validate } = use('Validator')
const Helpers = use('Helpers')

class KodefikasiController {
    async showKodefikasi({request, response}) {
        const kodefikasi = await Kodefikasi.query().with('users').with('sarana').orderBy('created_at', 'desc').fetch()
        return response.json({
            message: 'Success',
            result: kodefikasi
        })
    }

    async kodefikasiId({request, response, params}) {
        const kodefikasi = await Kodefikasi.find(params.id)

        return response.json({
            message : 'Success',
            result : kodefikasi
        })
    }

    async addKodefikasi({request, response}) {
        const rules = {
            user_id : 'required|exists:users,id',
            sarana_id : 'required|exists:sarana,id',
            kode : 'required',
            nama : 'required',
            jumlah_gandar : 'required',
            jumlah_bogie : 'required',
            kelas : 'required',
            gambar: 'string:allowNull',
            deskripsi: 'string:allowNull'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        const kodefikasi = new Kodefikasi()
        kodefikasi.nama = request.body.nama
        kodefikasi.user_id = request.body.user_id
        kodefikasi.sarana_id = request.body.sarana_id
        kodefikasi.kode = request.body.kode
        kodefikasi.jumlah_gandar = request.body.jumlah_gandar
        kodefikasi.jumlah_bogie = request.body.jumlah_bogie
        kodefikasi.kelas = request.body.kelas
        kodefikasi.deskripsi = request.body.deskripsi

        const pic = request.file('gambar')

        kodefikasi.gambar = new Date().getTime()+'.'+pic.subtype

        await pic.move(Helpers.publicPath('uploads/kodefikasi'), {
            name : kodefikasi.gambar
        })

        await kodefikasi.save()

        return response.json({
            message : 'Success',
            data : kodefikasi
        })
    }

    async editKodefikasi({request, response}) {
        const rules = {
            user_id : 'required|exists:users,id',
            sarana_id : 'required|exists:sarana,id',
            kode : 'required',
            nama : 'required',
            jumlah_gandar : 'required',
            jumlah_bogie : 'required',
            kelas : 'required',
            gambar: 'string:allowNull',
            deskripsi: 'string:allowNull'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        const kodefikasi = await Kodefikasi.find(request.params.id)
        kodefikasi.nama = request.body.nama
        kodefikasi.user_id = request.body.user_id
        kodefikasi.sarana_id = request.body.sarana_id
        kodefikasi.kode = request.body.kode
        kodefikasi.jumlah_gandar = request.body.jumlah_gandar
        kodefikasi.jumlah_bogie = request.body.jumlah_bogie
        kodefikasi.kelas = request.body.kelas
        kodefikasi.deskripsi = request.body.deskripsi

        const pic = request.file('gambar')

        kodefikasi.gambar = new Date().getTime()+'.'+pic.subtype

        await pic.move(Helpers.publicPath('uploads/kodefikasi'), {
            name : kodefikasi.gambar
        })

        await kodefikasi.save()

        return response.json({
            message : 'Success',
            data : kodefikasi
        })
    }

    async deleteKodefikasi({request, response}) {
        const deleteKodefikasi = await Kodefikasi.find(request.params.id)
        await deleteKodefikasi.delete()

        return response.json({
            status: true,
            message: 'Deleted Kodefikasi Successfully',
            data: deleteKodefikasi  
        })
    }
}

module.exports = KodefikasiController

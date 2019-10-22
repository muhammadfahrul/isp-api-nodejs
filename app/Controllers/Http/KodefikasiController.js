'use strict'
const Kodefikasi = use('App/Models/Kodefikasi')
const { validate } = use('Validator')
const Helpers = use('Helpers')

class KodefikasiController {
    async showKodefikasi({request, response}) {
        const kodefikasi = await Kodefikasi.query().with('klasifikasi').limit(10).orderBy('created_at', 'desc').fetch()
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
            user_id : 'required',
            sarana_id : 'required',
            kode : 'required',
            nama : 'required',
            jumlah_gandar : 'required',
            jumlah_bogie : 'required',
            kelas : 'required',
            gambar: 'string:allowNull',
            deskripsi: 'string:allowNull'
        }

        const kodefikasi_req = request.only(['nama', 'kode', 'jumlah_gandar', 'jumlah_bogie', 'user_id', 'sarana_id', 'kelas', 'gambar', 'deskripsi'])
        const validation = await validate(kodefikasi_req, rules)

        if (validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        const kodefikasi = new Kodefikasi()
        kodefikasi.nama = kodefikasi_req.nama
        kodefikasi.user_id = kodefikasi_req.user_id
        kodefikasi.sarana_id = kodefikasi_req.sarana_id
        kodefikasi.kode = kodefikasi_req.kode
        kodefikasi.jumlah_gandar = kodefikasi_req.jumlah_gandar
        kodefikasi.jumlah_bogie = kodefikasi_req.jumlah_bogie
        kodefikasi.kelas = kodefikasi_req.kelas
        kodefikasi.deskripsi = kodefikasi_req.deskripsi

        const pic = request.file('gambar')

        kodefikasi.gambar = new Date().getTime()+'.'+pic.subtype

        await pic.move(Helpers.publicPath('uploads/post'), {
            name : kodefikasi.gambar
        })

        await kodefikasi.save()

        return response.json({
            message : 'Success',
            data : kodefikasi
        })
    }

    async editKodefikasi({request, response}) {
        
    }

    async deleteKodefikasi({request, response}) {
        
    }
}

module.exports = KodefikasiController

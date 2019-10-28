'use strict'
const Klasifikasi = use('App/Models/Klasifikasi')
const { validate } = use('Validator')
const Helpers = use('Helpers')

class KlasifikasiController {
    async showKlasifikasi({request, response}) {
        const klasifikasi = await Klasifikasi.query().with('users').with('kodefikasi').fetch()
        return response.json({
            status: 200,
            message : 'Success',
            data : klasifikasi
        })
    }

    async klasifikasiId({request, response, params}) {
        const klasifikasi = await Klasifikasi.find(params.id)

        return response.json({
            status: 200,
            message : 'Success',
            result : klasifikasi
        })
    }

    async addKlasifikasi({request, response}) {
        const rules = {
            user_id: 'required|exists:users,id',
            kodefikasi_id: 'required|exists:kodefikasi,id',
            kode: 'required',
            nama: 'required',
            seri_tipe: 'required',
            deskripsi: 'required',
            is_active: 'required'
        }

        // const klasifikasi_req = request.only(['nama', 'kode', 'seri_tipe', 'is_active', 'kodefikasi_id'])
        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        const klasifikasi = new Klasifikasi()
        klasifikasi.user_id = request.body.user_id
        klasifikasi.kodefikasi_id = request.body.kodefikasi_id
        klasifikasi.kode = request.body.kode
        klasifikasi.nama = request.body.nama
        klasifikasi.seri_tipe = request.body.seri_tipe

        const myPicture = request.file('gambar', {
            types: ['image'],
            size: '2mb'
        })

        await myPicture.move(Helpers.publicPath('uploads/klasifikasi'))

        klasifikasi.gambar = new Date().getTime()+'.'+myPicture.subtype

        klasifikasi.deskripsi = request.body.deskripsi
        klasifikasi.is_active = request.body.is_active

        await klasifikasi.save();

        return response.json({
            status: 201,
            message : 'Success',
            data : klasifikasi
        })
    }

    async editKlasifikasi({request, response, params}) {
        const rules = {
            user_id: 'required|exists:users,id',
            kodefikasi_id: 'required|exists:kodefikasi,id',
            kode: 'required',
            nama: 'required',
            seri_tipe: 'required',
            deskripsi: 'required',
            is_active: 'required'
        }

        // const klasifikasi_req = request.only(['nama', 'kode', 'seri_tipe', 'is_active', 'kodefikasi_id'])
        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        const klasifikasi = await Klasifikasi.find(params.id)
        klasifikasi.user_id = request.body.user_id
        klasifikasi.kodefikasi_id = request.body.kodefikasi_id
        klasifikasi.kode = request.body.kode
        klasifikasi.nama = request.body.nama
        klasifikasi.seri_tipe = request.body.seri_tipe

        const myPicture = request.file('gambar', {
            types: ['image'],
            size: '2mb'
        })

        await myPicture.move(Helpers.publicPath('uploads/klasifikasi'))

        klasifikasi.gambar = new Date().getTime()+'.'+myPicture.subtype

        klasifikasi.deskripsi = request.body.deskripsi
        klasifikasi.is_active = request.body.is_active

        await klasifikasi.save();

        return response.json({
            status: 201,
            message : 'Success',
            data : klasifikasi
        })
    }

    async deleteKlasifikasi({request, response, params}) {
        const klasifikasi = await Klasifikasi.find(params.id)
        if (!klasifikasi) {
            return response.status(404).json({ message: 'Klasifikasi not found' })
        }
        await klasifikasi.delete()

        return response.json({
            status: 204,
            message : 'Success',
            data : klasifikasi
        })
    }
}

module.exports = KlasifikasiController

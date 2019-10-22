'use strict'
const Klasifikasi = use('App/Models/Klasifikasi')
const { validate } = use('Validator')

class KlasifikasiController {
    async showKlasifikasi({request, response}) {
        const klasifikasi = await Klasifikasi.query().with('kodefikasi').limit(10).orderBy('created_at', 'desc').fetch()
        return response.json({
            message : 'Success',
            result : klasifikasi
        })
    }

    async klasifikasiId({request, response, params}) {
        const klasifikasi = await Klasifikasi.find(params.id)

        return response.json({
            message : 'Success',
            result : klasifikasi
        })
    }

    async addKlasifikasi({request, response}) {
        const rules = {
            nama: 'required',
            kode: 'required',
            seri_tipe: 'required',
            kodefikasi_id: 'required|exists:kodefikasi,id'
        }

        const klasifikasi_req = request.only(['nama', 'kode', 'seri_tipe', 'is_active', 'kodefikasi_id'])
        const validation = await validate(klasifikasi_req, rules)

        if (validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        const klasifikasi = new Klasifikasi()
        klasifikasi.nama = klasifikasi_req.nama
        klasifikasi.kode = klasifikasi_req.kode
        klasifikasi.seri_tipe = klasifikasi_req.seri_tipe
        klasifikasi.is_active = klasifikasi_req.is_active
        klasifikasi.kodefikasi_id = klasifikasi_req.kodefikasi_id

        await klasifikasi.save();

        return response.json({
            message : 'Success',
            data : klasifikasi
        })
    }

    async editKlasifikasi({request, response, params}) {
        const rules = {
            nama: 'required',
            kode: 'required',
            seri_tipe: 'required',
            kodefikasi_id: 'required|exists:kodefikasi,id'
        }
        const klasifikasi_req = request.only(['nama', 'kode', 'seri_tipe', 'kodefikasi_id'])
        const validation = await validate(klasifikasi_req, rules)

        if (validation.fails()) {
            return response.json({
                message: validation.messages()
            })
        }

        const klasifikasi = await Klasifikasi.find(params.id)
        if (!klasifikasi) {
            return response.status(404).json({data: 'Klasifikasi not found'})
        }
        klasifikasi.nama = klasifikasi_req.nama
        klasifikasi.kode = klasifikasi_req.kode
        klasifikasi.seri_tipe = klasifikasi_req.seri_tipe
        klasifikasi.kodefikasi_id = klasifikasi_req.kodefikasi_id
        await klasifikasi.save()

        return response.json({
            message : 'Success',
            status : 200,
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
            message: 'Success',
            status: 204
        })
    }
}

module.exports = KlasifikasiController

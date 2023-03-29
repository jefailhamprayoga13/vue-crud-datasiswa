<template>
    <div class="p-10 relative max-w-full  my-20 min-w-fit rounded-xl shadow-lg m-2 bg-white">
        <button class=" absolute translate-x-5 font-mono rounded-full text-2xl -translate-y-6 top-0 right-0 bg-red-500 font-bold hover:bg-red-700 hover:ring-2 hover:ring-red-500  px-4 py-2 text-white"
                        @click="closeFormCreate">X</button>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold inline-block">Tambah Data Siswa</h1>
        </div>
        <form @submit.prevent="addData">
            <div class="block max-w-full mb-3">
                <BaseInput label="Id : " type="number" v-model="form.id" hidden />
            </div>
            <div class="block max-w-full mb-3">
                <BaseInput label="NISN : " type="number" v-model="form.nisn" :error="errors['nisn']" />
            </div>
            <div class="block max-w-full mb-3">
                <BaseInput label="Nama Lengkap : " type="text" v-model="form.nama" :error="errors['nama']" />
            </div>
            <div class="block max-w-full mb-3">
                <BaseRadio :jenisKelamin="jenisKelamin" label="Jenis Kelamin : " v-model="form.jenisKelaminId" :error="errors['jenisKelamin']" />
            </div>
            <div class="block max-w-full mb-3">
                <BaseSelect label="Jurusan : " v-model="form.jurusanId" :jurusan="jurusan" placeholder="Pilih Jurusan" :error="errors['jurusan']" />
            </div>
            <div class="block max-w-full mb-3">
                <BaseCheckbox label="Hobby : " v-model="form.hobbyId" :hobby="hobby" :error="errors['hobby']" />
            </div>
            <button type="submit" class="bg-green-500 hover:bg-green-700 hover:ring-2 hover:ring-green-500  px-2 py-2 text-white rounded-md">Submit</button>
        </form>
    </div>
</template>

<script>
import BaseInput from './form/BaseInput.vue';
import BaseRadio from './form/BaseRadio.vue';
import BaseSelect from './form/BaseSelect.vue';
import BaseCheckbox from './form/BaseCheckbox.vue';

import Swal from 'sweetalert2';

export default {
    props: ['dataSiswa', 'jenisKelamin', 'jurusan', 'hobby'],
    data() {
        return {
            form: {
                id: "",
                nisn : "",
                nama: "",
                jenisKelaminId: "",
                jurusanId: "",
                hobbyId: [],
            },
            closeForm: true,
            errors: {},

        };
    },
    methods: {
        closeFormCreate() {
            this.closeForm = false;
            const clsForm = this.closeForm;
            this.$emit('rmv-form', clsForm);
        },
        addData() {
            this.errors = {};
            if (!this.form.nisn) {
                this.errors.nisn = ["NISN tidak boleh kosong !"];
            }
            if (!this.form.nama) {
                this.errors.nama = ["Nama Lengkap tidak boleh kosong !"];
            }
            if (!this.form.jenisKelaminId) {
                this.errors.jenisKelamin = ["Jenis Kelamin tidak boleh kosong !"];
            }
            if (!this.form.jurusanId) {
                this.errors.jurusan = ["Jurusan tidak boleh kosong !"];
            }
            if (this.form.hobbyId.length === 0) {
                this.errors.hobby = ["Hobby tidak boleh kosong !"];
            }
            if (Object.keys(this.errors).length === 0) {
                this.form.jurusanId = parseInt(this.form.jurusanId);
                const datas = this.form;
                this.$emit('add-data', datas)
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil Ditambahkan',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.form = {};
            }
        },
        

    },
    components: { BaseInput, BaseRadio, BaseSelect, BaseCheckbox }
};

</script>

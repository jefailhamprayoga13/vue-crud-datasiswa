<template>
    <div class="p-10 relative max-w-full  my-20 min-w-fit rounded-xl shadow-lg m-2 bg-white">
        <button
            class=" absolute translate-x-5 font-mono rounded-full text-2xl -translate-y-6 top-0 right-0 bg-red-500 font-bold hover:bg-red-700 hover:ring-2 hover:ring-red-500  px-4 py-2 text-white"
            @click="closeFormUpdate">X</button>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold inline-block">Update Data Siswa</h1>
        </div>
        <form @submit.prevent="updateData">
            <div class="block max-w-full mb-3">
                <BaseInput label="Id : " type="number" v-model="siswaUpdate.id" hidden />
            </div>
            <div class="block max-w-full mb-3">
                <BaseInput label="NISN : " type="number" v-model="siswaUpdate.nisn" :error="errors['nisn']" />
            </div>
            <div class="block max-w-full mb-3">
                <BaseInput label="Nama Lengkap : " type="text" v-model="siswaUpdate.nama" :error="errors['nama']" />
            </div>
            <div class="block max-w-full mb-3">
                <BaseRadio :jenisKelamin="jenisKelamin" label="Jenis Kelamin : " v-model="siswaUpdate.jenisKelaminId"
                    :error="errors['jenisKelamin']" />
            </div>
            <div class="block max-w-full mb-3">
                <BaseSelect label="Jurusan : " v-model="siswaUpdate.jurusanId" :jurusan="jurusan" placeholder="Pilih Jurusan"
                    :error="errors['jurusan']" />
            </div>
            <div class="block max-w-full mb-3">
                <BaseCheckbox label="Hobby : " v-model="siswaUpdate.hobbyId" :hobby="hobby" :error="errors['hobby']" />
            </div>
            <button type="submit"
                class="bg-green-500 hover:bg-green-700 hover:ring-2 hover:ring-green-500  px-2 py-2 text-white rounded-md">Submit</button>
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
    props: ['dataSiswa', 'jenisKelamin', 'jurusan', 'hobby','siswaUpdate'],
    data() {
        return {
            closeForm: true,
            errors: {},

        };
    },
    methods: {
        closeFormUpdate() {
            this.closeForm = false;
            const clsForm = this.closeForm;
            this.$emit('rmv-form', clsForm);
        },
        updateData(){
            this.errors = {};
            if (!this.siswaUpdate.nisn) {
                this.errors.nisn = ["NISN tidak boleh kosong !"];
            }
            if (!this.siswaUpdate.nama) {
                this.errors.nama = ["Nama Lengkap tidak boleh kosong !"];
            }
            if (!this.siswaUpdate.jenisKelaminId) {
                this.errors.jenisKelamin = ["Jenis Kelamin tidak boleh kosong !"];
            }
            if (!this.siswaUpdate.jurusanId) {
                this.errors.jurusan = ["Jurusan tidak boleh kosong !"];
            }
            if (this.siswaUpdate.hobbyId.length === 0) {
                this.errors.hobby = ["Hobby tidak boleh kosong !"];
            }
            if (Object.keys(this.errors).length === 0) {
                this.siswaUpdate.jurusanId = parseInt(this.siswaUpdate.jurusanId);
                const datas = this.siswaUpdate;
                this.$emit('update-data', datas)
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil Diupdate',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.siswaUpdate.nisn = "";
                this.siswaUpdate.nama = "";
                this.siswaUpdate.jenisKelaminId = [];
                this.siswaUpdate.jurusanId = [];
                this.siswaUpdate.hobbyId = [];
                
            }
        }
    },
    components: { BaseInput, BaseRadio, BaseSelect, BaseCheckbox }
};

</script>

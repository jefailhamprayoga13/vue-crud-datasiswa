<template>
  <div
    class="p-10 relative max-w-full my-20 min-w-fit rounded-xl shadow-lg m-2 bg-white"
  >
    <button
      class="absolute translate-x-5 font-mono rounded-full text-2xl -translate-y-6 top-0 right-0 bg-red-500 font-bold hover:bg-red-700 hover:ring-2 hover:ring-red-500 px-4 py-2 text-white"
      @click="closeFormUpdate"
    >
      X
    </button>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold inline-block">Update Data Siswa</h1>
    </div>
    <form @submit.prevent="updateData">
      <div class="block max-w-full mb-3">
        <BaseInput
          label="Id : "
          type="number"
          v-model="dataSiswa.id"
          hidden
        />
      </div>
      <div class="block max-w-full mb-3">
        <BaseInput
          label="NISN : "
          type="number"
          v-model="dataSiswa.nisn"
          :error="errors['nisn']"
        />
      </div>
      <div class="block max-w-full mb-3">
        <BaseInput
          label="Nama Lengkap : "
          type="text"
          v-model="dataSiswa.nama"
          :error="errors['nama']"
        />
      </div>
      <div class="block max-w-full mb-3">
        <BaseRadio
          :jenisKelamin="jenisKelamin"
          label="Jenis Kelamin : "
          v-model="dataSiswa.jenisKelaminId"
          :error="errors['jenisKelamin']"
        />
      </div>
      <div class="block max-w-full mb-3">
        <BaseSelect
          label="Jurusan : "
          v-model="dataSiswa.jurusanId"
          :jurusan="jurusan"
          placeholder="Pilih Jurusan"
          :error="errors['jurusan']"
        />
      </div>
      <div class="block max-w-full mb-3">
        <BaseCheckbox
          label="Hobby : "
          v-model="dataSiswa.hobbyId"
          :hobby="hobby"
          :error="errors['hobby']"
        />
      </div>
      <button
        type="submit"
        class="bg-green-500 hover:bg-green-700 hover:ring-2 hover:ring-green-500 px-2 py-2 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import BaseInput from "./form/BaseInput.vue";
import BaseRadio from "./form/BaseRadio.vue";
import BaseSelect from "./form/BaseSelect.vue";
import BaseCheckbox from "./form/BaseCheckbox.vue";

import Swal from "sweetalert2";

export default {
  data() {
    return {
      closeForm: true,
      dataSiswa: {},
      jenisKelamin: [],
      jurusan: [],
      hobby: [],
      errors: {},

    };
  },
  mounted() {
        this.load();
    },
  methods: {
    closeFormUpdate() {
      this.load();
      this.$router.push('/siswa')
    },
    load() {
      Promise.all([
        this.$axios.get(`http://localhost:3000/siswa/${this.$route.params.id}`),
        this.$axios.get("http://localhost:3000/jenisKelamin"),
        this.$axios.get("http://localhost:3000/jurusan"),
        this.$axios.get("http://localhost:3000/hobby"),
      ])
        .then(([siswaRes, jenisKelaminRes, jurusanRes, hobbyRes]) => {
          this.dataSiswa = siswaRes.data;
          this.jenisKelamin = jenisKelaminRes.data;
          this.jurusan = jurusanRes.data;
          this.hobby = hobbyRes.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateData() {
      this.errors = {};
      if (!this.dataSiswa.nisn) {
        this.errors.nisn = ["NISN tidak boleh kosong !"];
      }
      if (!this.dataSiswa.nama) {
        this.errors.nama = ["Nama Lengkap tidak boleh kosong !"];
      }
      if (!this.dataSiswa.jenisKelaminId) {
        this.errors.jenisKelamin = ["Jenis Kelamin tidak boleh kosong !"];
      }
      if (!this.dataSiswa.jurusanId) {
        this.errors.jurusan = ["Jurusan tidak boleh kosong !"];
      }
      if (this.dataSiswa.hobbyId.length === 0) {
        this.errors.hobby = ["Hobby tidak boleh kosong !"];
      }
      if (Object.keys(this.errors).length === 0) {
        this.dataSiswa.jurusanId = parseInt(this.dataSiswa.jurusanId);
        const datas = this.dataSiswa;
        return this.$axios
          .put("http://localhost:3000/siswa/" + datas.id, { nisn: datas.nisn, nama: datas.nama, jenisKelaminId: datas.jenisKelaminId, jurusanId: datas.jurusanId, hobbyId: datas.hobbyId })
          .then((siswaRes) => {
            this.form = {};
            this.load();
            this.$router.push('/siswa')
            Swal.fire({
              icon: "success",
              title: "Data Berhasil Diupdate",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            console.log(err);
        });
      }
    },
  },
  components: { BaseInput, BaseRadio, BaseSelect, BaseCheckbox },
};
</script>

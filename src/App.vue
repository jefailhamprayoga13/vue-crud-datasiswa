<script setup>
import ListData from './components/ListData.vue'
import FormCreate from './components/FormCreateData.vue'
import FormUpdate from './components/FormUpdateData.vue'
</script>

<template>
  <div class="max-w-max mx-auto">
    <div class="md:flex">
      <ListData :dataSiswa="dataSiswa" :jenisKelamin="jenisKelamin" :jurusan="jurusan" :hobby="hobby" @add-form-c="addFormCreate" @add-form-u="addFormUpdate" @del-data="deleteData"></ListData>
      <FormCreate :hidden="!formCreate" :dataSiswa="dataSiswa" :jenisKelamin="jenisKelamin" :jurusan="jurusan" :hobby="hobby" @add-data="addData" @rmv-form="removeFormCreate"></FormCreate>
      <FormUpdate :hidden="!formUpdate" :siswaUpdate="siswaUpdate" :dataSiswa="dataSiswa" :jenisKelamin="jenisKelamin" :jurusan="jurusan" @update-data="updateData" :hobby="hobby"  @rmv-form="removeFormUpdate"></FormUpdate>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formCreate: false,
      formUpdate: false,
      dataSiswa:[],
      jenisKelamin: [],
      jurusan: [],
      hobby: [],
      siswaUpdate : [],
    }
  },
  mounted() {
    this.load();
  },

  methods: {
    addFormCreate(index) {
      this.formCreate = index;
    },
    removeFormCreate(index) {
      this.formCreate = index;
    },
    addFormUpdate(index,datas) {
      this.formUpdate = index;
      this.siswaUpdate = datas;
    },
    removeFormUpdate(index) {
      this.formUpdate = index;
    },
    load() {
      Promise.all([
        this.$axios.get("https://fake-restapi-datasiswa.vercel.app/siswa"),
        this.$axios.get("https://fake-restapi-datasiswa.vercel.app/jenisKelamin"),
        this.$axios.get("https://fake-restapi-datasiswa.vercel.app/jurusan"),
        this.$axios.get("https://fake-restapi-datasiswa.vercel.app/hobby"),
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
    addData(datas) {
      this.$axios.post("https://fake-restapi-datasiswa.vercel.app/siswa/", datas).then((siswaRes) => {
        this.load();
      });
    },
    updateData(datas) {
      return this.$axios
        .put("https://fake-restapi-datasiswa.vercel.app/siswa/" + datas.id, { nisn: datas.nisn, nama: datas.nama, jenisKelaminId: datas.jenisKelaminId, jurusanId: datas.jurusanId, hobbyId : datas.hobbyId })
        .then((siswaRes) => {
          this.load();
        })
        .catch((err) => {
          console.log(err);
        });
      },
      deleteData(datas){
        this.$axios.delete("https://fake-restapi-datasiswa.vercel.app/siswa/" + datas.id).then((res) => {
          this.load();
          let index = this.dataSiswa.indexOf(datas.id);
          this.dataSiswa.splice(index, 1);
        })
      }
  },
}
</script>



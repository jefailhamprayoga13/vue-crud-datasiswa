<template>
  <div>
    <NavigationBar v-if="isLoggedIn"></NavigationBar>
    <div class="bg-indigo-500 max-w-full pt-12 h-80">
      <h1 class="text-center text-2xl text-white font-bold ">{{ $route.meta.title }}</h1>
    </div>
    <div class="container max-w-5xl mx-auto">
        <router-view class="mx-auto  -mt-40 rounded-xl " />
    </div>
    <footer class="max-w-5xl py-4 text-center">
      <div class="container">
        <span class="text-lg">
          &copy; 2023 My Company. All rights reserved.
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
  data() {
    return {
      dataSiswa: [],
      jenisKelamin: [],
      jurusan: [],
      hobby: [],
      showMenu: false,
    }
  },
  mounted() {
    this.load();
  },
  components : {NavigationBar},
  computed: {
    isLoggedIn() {
      // Ambil nilai token dari Vuex store
      const token = this.$store.state.token;

      // Cek apakah token ada atau pengguna sudah login
      return !!token;
    }
  },
  methods: {
    load() {
      Promise.all([
        this.$axios.get("http://localhost:3000/siswa"),
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
  },
}
</script>


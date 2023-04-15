<template>
    <div class="p-10 max-w-full  rounded-xl shadow-lg  bg-gray-50">
        <div class="flex items-center overflow-x-auto justify-between my-4">
            <h1 class="max-w-max text-2xl font-bold inline-block">Data Siswa</h1>
            <img class="mr-2 max-w-max" src="../../public/images/student.png" alt="student">
            <span class="ml-auto max-w-max">
                <router-link :to="{ name: 'siswa.create' }" class="max-w-max bg-green-500 hover:bg-green-700 hover:ring-2 hover:ring-green-500  px-2 py-2 text-white rounded-md">Tambah Data</router-link>
            </span>
        </div>
        <div class="max-w-full overflow-x-auto border-4 rounded-lg shadow-lg mt-2 mb-4">
            <table class="min-w-full divide-y-4 divide-gray-200">
                <thead>
                    <tr>
                        <th class="px-6 py-3 text-center text-xs text-gray-800 uppercase font-bold">ID</th>
                        <th class="px-6 py-3 text-center text-xs text-gray-800 uppercase font-bold">NISN</th>
                        <th class="px-6 py-3 text-center text-xs text-gray-800 uppercase font-bold">Nama Lengkap</th>
                        <th class="px-6 py-3 text-center text-xs text-gray-800 uppercase font-bold">Jenis Kelamin</th>
                        <th class="px-6 py-3 text-center text-xs text-gray-800 uppercase font-bold">Jurusan</th>
                        <th class="px-6 py-3 text-center text-xs text-gray-800 uppercase font-bold">Hobby</th>
                        <th class="px-6 py-3 text-center text-xs text-gray-800 uppercase font-bold"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="siswa in siswaWithDetail" :key="siswa.id">
                        <td class="px-6 py-3 text-center whitespace-nowrap">{{ siswa.id }}</td>
                        <td class="px-6 py-3 text-center whitespace-nowrap">{{ siswa.nisn }}</td>
                        <td class="px-6 py-3 text-center whitespace-nowrap">{{ siswa.nama }}</td>
                        <td class="px-6 py-3 text-center whitespace-nowrap">{{ siswa.jenisKelamin }}</td>
                        <td class="px-6 py-3 text-center whitespace-nowrap">{{ siswa.jurusan }}</td>
                        <td class="px-6 py-3 text-center whitespace-nowrap"><span v-for="(hobby,index) in siswa.hobby" :key="hobby.id">{{ hobby.value }}{{ index < siswa.hobby.length - 1 ? ', ' : '' }}</span></td>
                        <td class="px-6 py-3 text-center whitespace-nowrap">
                        <router-link class="bg-blue-500 hover:bg-blue-700 hover:ring-2 hover:ring-blue-500 m-1 px-2 py-2 text-white rounded-md" :to="{ name: 'siswa.update', params: { id: siswa.id } }" >Update</router-link>
                        <button class="bg-red-500 hover:bg-red-700 hover:ring-2 hover:ring-red-500  px-2 py-2 text-white rounded-md" @click="deleteData(siswa)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import Swal from "sweetalert2";
export default {
    data() {
        return {
            dataSiswa: [],
            jenisKelamin: [],
            jurusan: [],
            hobby: [],
        };
    },
    mounted() {
        this.load();
    },
    methods : {
        deleteData(siswa) {
            const datas = siswa
            this.$axios.delete("http://localhost:3000/siswa/" + datas.id).then((res) => {
                this.load();
                let index = this.dataSiswa.indexOf(datas.id);
                this.dataSiswa.splice(index, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil Dihapus',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        }, 
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
    computed: {
    siswaWithDetail() {
        if (!this.dataSiswa) {
            return [];
        }
        return this.dataSiswa.map((siswa) => {
            const jenisKelaminData = this.jenisKelamin.find(
                (jenisKelamin) => jenisKelamin.id === siswa.jenisKelaminId
            );
            const jurusanData = this.jurusan.find(
                (jurusan) => jurusan.id === siswa.jurusanId
            );
            const hobbyData = this.hobby.filter(
                (hobby) => siswa.hobbyId.includes(hobby.id)
            );

            return {
                ...siswa,
                jenisKelamin: jenisKelaminData ? jenisKelaminData.value : "",
                jurusan: jurusanData ? jurusanData.value : "",
                hobby: hobbyData.length ? hobbyData : [],
            };
        });
    },
},
};
</script>

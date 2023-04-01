<template>
    <div class="p-10 max-w-full my-20 rounded-xl shadow-lg m-2 bg-white">
        <div class="flex items-center overflow-x-auto justify-between my-4">
            <h1 class="max-w-max text-2xl font-bold inline-block">Data Siswa</h1>
            <img class="mr-2 max-w-max" src="../../public/images/student.png" alt="student">
            <span class="ml-auto max-w-max">
                <button class=" max-w-max bg-green-500 hover:bg-green-700 hover:ring-2 hover:ring-green-500  px-2 py-2 text-white rounded-md" @click="addFormCreate">Tambah Data</button>
            </span>
        </div>
        <div class="max-w-max overflow-x-auto border-4 rounded-lg shadow-lg mt-2 mb-4">
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
                        <td class="px-6 py-3 text-center whitespace-nowrap"><button class="bg-blue-500 hover:bg-blue-700 hover:ring-2 hover:ring-blue-500  px-2 py-2 text-white rounded-md" @click="addFormUpdate(siswa)">Update</button> <button class="bg-red-500 hover:bg-red-700 hover:ring-2 hover:ring-red-500  px-2 py-2 text-white rounded-md" @click="deleteData(siswa)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        dataSiswa: {
            type: Array,
        },
        jenisKelamin: {
            type: Array,
        },
        jurusan: {
            type: Array,
        },
        hobby: {
            type: Array,
        },
    },
    data() {
        return {
            formCreate: false,
            formUpdate: false,
        };
    },
    methods : {
        addFormCreate() {
            this.formCreate = true;
            const addForm = this.formCreate;
            this.$emit('add-form-c', addForm);
        },
        addFormUpdate(siswa) {
            this.formUpdate = true;
            const addForm = this.formUpdate;
            const datas = siswa
            this.$emit('add-form-u', addForm,datas);
        },
        deleteData(siswa) {
            const datas = siswa
            this.$emit('del-data', datas);
        }
    },
    computed: {
        siswaWithDetail() {
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

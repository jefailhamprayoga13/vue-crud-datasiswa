<template>
    <div class="bg-white p-12">
        <div class="max-w-max mx-auto">
            <div class="md:flex mb-12">
                <div class="m-auto w-1/2 h-1/2">
                    <img class="hover:scale-110 duration-1000" src="../../public/images/about.png" alt="home.png">
                </div>
                <div class=" w-1/2 h-1/2 m-auto">
                    <h1 class="text-4xl font-bold mb-2">Website apa ini ?</h1>
                        <p class="text-sm">Website ini merupakan sebuah website sederhana yang berfungsi untuk melakukan operasi create, read, update, dan delete pada data siswa. Dalam program ini, pengambilan dan manipulasi data dilakukan melalui HTTP REST API dengan bantuan Axios, dan menggunakan fake API untuk memudahkan proses tersebut. Selain itu, program ini juga menggunakan reusable komponen pada form. Program ini juga menggunakan library Swal yang digunakan untuk menampilkan popup notifikasi pada saat penambahan, perubahan, dan penghapusan data.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ListData from './ListData.vue'

</script>

<style lang="scss" scoped></style>
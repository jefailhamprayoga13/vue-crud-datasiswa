<template>
    <div class="p-10 relative max-w-md  min-w-fit rounded-xl shadow-lg m-2 bg-white">
         <form @submit.prevent="login">
                <div class="block max-w-full mb-3">
                    <BaseInput label="Username : " type="text" v-model="username" :error="errors['username']"/>
                </div>
                <div class="block max-w-full mb-3">
                    <BaseInput label="Password : " type="password" v-model="password" :error="errors['password']" />
                </div>
                <button type="submit"
                    class="bg-green-500 hover:bg-green-700 hover:ring-2 hover:ring-green-500 px-2 py-2 text-white rounded-md">
                    Submit
                </button>
            </form>
    </div>
</template>

<script>

import BaseInput from './form/BaseInput.vue';
import Swal from "sweetalert2";

export default {
    data() {
        return {
            username : "",
            password : "",
            errors: {},
        };
    },
    methods: {
        async login() {
            this.errors = {};
            if (!this.username) {
                this.errors.username = ["Username tidak boleh kosong !"];
            }
            if (!this.password) {
                this.errors.password = ["Password tidak boleh kosong !"];
            }
            if (Object.keys(this.errors).length === 0) {
                try {
                    const response = await this.$axios.post("http://localhost:3001/login", {
                        username: this.username,
                        password: this.password,
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`, // Menggunakan token dari local storage
                        },
                    });
                    const token = response.data.token;
                    if (token) {
                        this.$store.dispatch("setToken", token);
                        localStorage.setItem("token", token);
                        Swal.fire({
                            icon: "success",
                            title: "Login Berhasil",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        this.$router.push("/");
                    }
                    else {
                        console.error("Invalid credentials");
                    }
                }
                catch (error) {
                    alert("Username atau Password yang anda masukkan tidak sesuai!")
                    console.error(error);
                }
            }
        },
    },
    components: { BaseInput, BaseInput }
};

</script>

<template>
    <div>
        <div class=" bg-indigo-500">
            <nav class="max-w-5xl container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                <div class="flex items-center justify-between">
                    <router-link to="/" class="text-2xl text-white font-bold inline-block">CRUD</router-link>
                    <!-- Mobile menu button -->
                    <div @click="showMenu = !showMenu" class="flex md:hidden">
                        <button type="button" class="text-gray-300 hover:text-white focus:outline-none focus:text-white">
                            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                <path fill-rule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>


                <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
                <ul :class="showMenu ? 'flex' : 'hidden'"
                    class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
                    <li class="text-sm font-bold text-gray-300 hover:text-white hover:scale-110 duration-200"><router-link to="/"
                            exact-active-class="text-white bg-blue-800 px-4 py-2 rounded-md ">Home</router-link></li>
                    <li class="text-sm font-bold text-gray-300 hover:text-white hover:scale-110 duration-200"><router-link :to="{ name: 'about' }"
                            exact-active-class="text-white bg-blue-800 px-4 py-2 rounded-md">About</router-link></li>
                    <li class="text-sm font-bold text-gray-300 hover:text-white hover:scale-110 duration-200"><router-link :to="{ name: 'siswa' }"
                                exact-active-class="text-white bg-blue-800 px-4 py-2 rounded-md">Siswa</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            showMenu : false,
        };
    },
}
</script>

<style lang="scss" scoped></style>
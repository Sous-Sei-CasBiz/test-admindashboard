<template>
    <div>
        <div>
            <Navigation />
        </div>
        <div class="">
            <div class=" flex justify-center items-center h-screen">
                <div class="bg-slate-300 h-[60%] w-[70%] rounded-md text-center p-10">
                    <h1 class=" text-3xl font-bold mt-10">Welcome To Bester</h1>
                    <p class="mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit nobis odio at expedita
                        impedit explicabo minima rem, illo aliquam sapiente eos eligendi, accusantium temporibus ad quasi.
                        Dicta reprehenderit reiciendis sunt?</p>
                    <div class="mt-10 ">
                        <router-link :to="{ name: 'TodoVue' }">
                            <Button label="Get Start" class="btn"/>
                        </router-link>
                    </div>
                    <ul class="flex justify-center gap-4 mt-10">
                        <li><i class="pi pi-facebook"></i></li>
                        <li><i class="pi pi-youtube"></i></li>
                        <li><i class="pi pi-google"></i></li>
                        <li><i class="pi pi-twitter"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
export default {
    components: {
        Navigation,
    }
}

</script>
<style>

</style>
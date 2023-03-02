<template>
    <nav class="flex items-center justify-between fixed left-0 right-0  bg-slate-500 ">
        <div class=" flex-grow flex justify-between items-center lg:w-auto  max-w-screen-xl m-auto py-2 px-4 ">
            <div class="flex gap-4 items-center">
                <Button icon="pi pi-align-left !text-[25px]" @click="visibleLeft = true"
                    class="mr-2 menu-btn !w-[4rem] !text-white !rounded-md !bg-transparent" />

                <!-- //sidebar -->
                <Sidebar v-model:visible="visibleLeft" :baseZIndex="10000" class="relative">
                    <div class="absolute top-5 left-5">
                        <h1 class="text-3xl font-bold">
                            <router-link :to="{ name: 'Home' }">Bester</router-link>
                        </h1>
                    </div>
                    <div class="mt-4">
                        <PanelMenu :model="items" />
                    </div>
                </Sidebar>

                <!-- //logo -->
                <div>
                    <h1 class="text-3xl font-bold  text-white">
                        <router-link :to="{ name: 'Home' }">Bester</router-link>
                    </h1>
                </div>
            </div>
            <div class="text-white hover:bg-blue-400 rounded-md">
                <!-- //logout -->
                <Button label="Log Out" @click='logout()' icon="pi pi-sign-out"
                    class="p-button-outlined p-button-primary !text-white !border-blue-600 !bg-transparent" />
            </div>
        </div>
    </nav>
</template>
<script>

export default {
    name: 'NavigaTion',
    data() {
        return {
            displayModal: false,
            visibleLeft: false,
            expandedKeys: {},
            items: [
                {
                    key: '0',
                    label: 'Dashboard',
                    icon: 'pi pi-bars',
                    items: [
                        {
                            key: '0_0',
                            label: 'Home',
                            icon: 'pi pi-fw pi-home',
                            command: () => {
                                this.$router.push({ name: 'Home' });
                            }
                        },
                    ]
                },
                {
                    key: '1',
                    label: 'Todos',
                    icon: 'pi pi-fw pi-file',
                    items: [
                        {
                            key: '0_0',
                            label: 'All Todos',
                            icon: 'pi pi-fw pi-list',
                            command: () => {
                                this.$router.push({ name: 'TodoVue' });
                            }
                        },
                        {
                            key: '0_1',
                            label: 'Completed Todos',
                            icon: 'pi pi-fw pi-check-square',
                            command: () => {
                                this.$router.push({ name: 'TodoVue' });
                            }
                        },
                        {
                            key: '0_2',
                            label: 'Export',
                            icon: 'pi pi-fw pi-external-link',
                            command: () => {
                                this.$router.push({ name: 'TodoVue' });
                            }
                        }
                    ]
                },
                {
                    key: '2',
                    label: 'Users',
                    icon: 'pi pi-users',
                    items: [
                        {
                            key: '0_0',
                            label: 'Profile',
                            icon: 'pi pi-fw pi-user',
                            command: () => {
                                this.$router.push({ name: 'Users' });
                            }
                        },
                        {
                            key: '0_1',
                            label: 'All Users',
                            icon: 'pi pi-fw pi-users',
                            command: () => {
                                this.$router.push({ name: 'Users' });
                            }
                        },
                        {
                            key: '0_2',
                            label: 'Detail',
                            icon: 'pi pi-fw pi-external-link',
                            command: () => {
                                this.$router.push({ name: 'Users' });
                            }
                        }
                    ]
                },
                {
                    key: '3',
                    label: 'Other',
                    icon: 'pi pi-sliders-v',
                    items: [
                        {
                            key: '0_0',
                            label: 'Delete',
                            icon: 'pi pi-fw pi-trash',
                            command: () => {
                                this.$router.push({ name: 'Home' });
                            }
                        },
                        {
                            key: '0_1',
                            label: 'Update',
                            icon: 'pi pi-fw pi-trash',
                            command: () => {
                                this.$router.push({ name: 'Home' });
                            }
                        },
                        {
                            key: '0_2',
                            label: 'Export',
                            icon: 'pi pi-fw pi-external-link',
                            command: () => {
                                this.$router.push({ name: 'Home' });
                            }
                        }
                    ]
                }
            ]

        }
    },
    computed: {
    },
    methods: {

        logout() {
            localStorage.clear();
            this.$router.push({ name: 'PrimeLogin' });
        },
        collapseAll() {
            this.expandedKeys = {};
        },

    },
}
</script>
<style >
.p-button.menu-btn {
    width: 4rem;

}
</style>

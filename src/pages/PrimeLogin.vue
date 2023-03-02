
<template>
    <div class="bg-slate-300 h-screen flex justify-center items-center">
        <div class="rounded-md shadow-lg bg-slate-50 py-[80px] px-[40px] w-[500px] overflow-hidden">
            <div class="form-demo">
                <div class="flex justify-content-center">
                    <div class="card w-full">
                        <div class="text-center pb-6">
                            <i class="pi pi-user !text-[30px]"></i>
                            <h5 class="text-center">Log In</h5>
                        </div>
                        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                            <!-- //email -->
                            <div class="field pb-6">
                                <div class="p-float-label p-input-icon-right">
                                    <i class="pi pi-envelope" />
                                    <InputText id="email" v-model="v$.email.$model"
                                        :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                                        aria-describedby="email-error" />
                                    <label for="email" :class="{ 'p-error': v$.email.$invalid && submitted }">Email*</label>
                                </div>
                                <span v-if="v$.email.$error && submitted">
                                    <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                                        <small class="p-error">{{ error.$message }}</small>
                                    </span>
                                </span>
                                <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                                    class="p-error">{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
                            </div>
                            <div class="field pb-6">
                                <div class="p-float-label">
                                    <Password id="password" v-model="v$.password.$model"
                                        :class="{ 'p-invalid': v$.password.$invalid && submitted }" :feedback="false">
                               
                                    </Password>
                                    <label for="password"
                                        :class="{ 'p-error': v$.password.$invalid && submitted }">Password*</label>
                                </div>
                
                            </div>
                            <!-- //password -->
                            <Button type="submit" label="Submit" class="mt-2"  />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            password: '',
            email: '',
            submitted: false,
        }
    },
    validations() {
        return {

            email: {
                required,
                email
            },
            password: {
                required
            },

        }
    },
    computed: {
        ...mapGetters(['getToken'])
    },
    methods: {
        async handleSubmit(isFormValid) {
            this.$store.dispatch('login', { email: this.email, password: this.password })
                .then(() => {
                    this.$router.push({ name: 'TodoVue' })
                })
            this.submitted = true;

            if (!isFormValid) {
                return;
            }
        },
        toggleDialog() {
            this.showMessage = !this.showMessage;
            if (!this.showMessage) {
                this.resetForm();
            }
        },
        resetForm() {
            this.password = '';
            this.email = '';
        }
    },

}
</script>
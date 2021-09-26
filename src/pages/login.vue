<template>
    <div>
        <div class="login-cont">
            <div class="login card container">
                <h3 class="title text-center">Admin Login</h3>
                <div class="row align-items-center justify-content-center g-2">
                    <div class="col-md-6">
                        <div class="img">
                            <img src="../assets/imgs/login.jpg" alt="" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row g-3">
                            <div class="col-md-12">
                                <div class="field form-group">
                                    <label>Email</label>
                                    <input v-model="email" type="text" placeholder="Admin Email" class="form-control">
                                    <p v-if="errors.email" class="login-error">{{errors.email}}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="field form-group">
                                    <label>Password</label>
                                    <input v-model="password" type="password" placeholder="Admin Password" class="form-control">
                                    <p v-if="errors.password" class="login-error">{{errors.password}}</p>
                                </div>
                            </div>
                            <div v-if="edit && changePassword" class="col-md-12">
                                <div class="field form-group">
                                    <label>New password</label>
                                    <input v-model="newPassword" type="password" placeholder="Admin new Password" class="form-control">
                                    <p v-if="errors.newPassword" class="login-error">{{errors.newPassword}}</p>
                                </div>
                            </div>
                            <div v-if="edit && changePassword" class="col-md-12">
                                <div class="field form-group">
                                    <label>Confirm password</label>
                                    <input v-model="confirm" type="password" placeholder="Admin new Password" class="form-control">
                                    <p v-if="errors.confirm" class="login-error">{{errors.confirm}}</p>
                                </div>
                            </div>
                            <div v-if="edit" class="col-md-12">
                                <a @click="changePassword = !changePassword" class="link-primary">{{changePassword?'don\'t change password': 'Change password'}}</a>
                            </div>
                            <div v-else class="col-md-12">
                                <a @click="resetPassword" class="link-primary">Reset password</a>
                            </div>
                            <hr>
                            <div v-if="loading" class="col-md-12">
                                <loading v-if="loading"/>
                            </div>
                            <div class="col-md-12">
                                <div class="center">
                                    <button
                                        :disabled="isValid()" 
                                        @click="()=>edit?editData(): login()" 
                                        class="btn w-75">
                                        {{edit? 'Edit': 'Login'}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .login-cont {
        padding: 50px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
    }
    .login {
        padding: 20px;
        box-shadow: 2px 2px 17px 5px #000;
        // background: rgba(255, 255, 255, 0.728);
        label {
            color: #555;
            font-weight: 600;
        }
        input {
            padding: 12px;
            background: #fff;
            color: #555;
        }
    }

    button {
        border-radius: 12px;
        padding: 10px;
        background: rgb(42, 75, 138);
        color: #fff;
    }

    .login-error {
        text-align: left;
        color: rgba(230, 22, 22, 0.755);
        font-weight: 600;
    }
</style>

<script>
import axios from 'axios';
export default {
    created() {
        if(this.$route.path.includes("editAdminData")) {
            this.edit = true;
            axios.get("/getAdminEmail/" + localStorage.getItem("userId")).then(res => {
                this.email = res.data.email;
            })
        }
    },
    
    data() {
        return {
            email: null,
            password: null,
            edit: false,
            newPassword: null,
            confirm: null,
            changePassword: false,
            loading: false,

            errors: {
                email: null,
                password: null,
                newPassword: null,
                confirm: null
            }
        }
    },
    computed: {
        // isValid() {
        //     let invalid = false; 
        //     Object.keys(this.errors).forEach(val => {
        //         if(val) invalid = true
        //     });
        //     return invalid;
        // }
    },
    watch: {
        confirm(val) {
            this.errors.confirm = null;
            if(val !== this.newPassword) this.errors.confirm = "confirm password desn't match";
            if(val == "") this.errors.confirm = "confirm is required";
        },
        email(val) {
            this.errors.email = null;
            if(val == "") this.errors.email = "Email is required";
        },
        password(val) {
            this.errors.password = null;
            if(val == "") this.errors.password = "password is required";
            if(val.length < 6) this.errors.password = "password is short";
        },
        newPassword(val) {
            this.errors.newPassword = null;
            if(val == "") this.errors.newPassword = "new password is required";
            if(val.length < 6) this.errors.newPassword = "password is short";
        },
    },

    methods: {
        login() {
            this.loading = true;
            if(!this.email || !this.password) return;
            this.$store.dispatch("login", {email: this.email, password: this.password});
        },
        editData() {
            this.loading = true;
            if(!this.email || !this.password) return;
            const data = {email: this.email, password: this.password, userId: localStorage.getItem("userId")};
            if(this.newPassword) data["newPassword"] = this.newPassword;
            this.$store.dispatch("editAdminData", data);
        },
        isValid() {
            let invalid = false; 
            Object.values(this.errors).forEach(val => {
                if(val) invalid = true
            });
            return invalid;
        },
        resetPassword() {
            this.loading = true;
            const confirmed = confirm("You will change your password ... make sure email is valid");
            if(!confirmed) return;
            axios.get("/resetPassword/" + this.email).then(res => {
            this.loading = false;
                if(res.data.done) {
                    this.$store.dispatch("showMessage", "new password has been sent to you email")
                } else {
                    this.$store.dispatch("showMessage", "Problem happened, try again")
                }
            })
        }
    }
    
}
</script>
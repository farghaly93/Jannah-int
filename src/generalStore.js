import axios from "axios"
import {router} from "./main";

const state = {
    message: null,
    categories: [],
    siteData: null,
    admin: false,
    token: null,
    userId: null,
}

const mutations = {
    signToken(state, token) {
        state.token = token;
    },
    signAdmin(state, admin) {
        state.token = admin;
    }
}

const actions = {
    showMessage: (_, mess) => {
        state.message = mess;
        console.log(state.message)
        setTimeout(() => state.message = null, 4000);
    },

    getCategories() {
        axios.get("/getCategories").then((res) => {
            state.categories = res.data.categories;
        });
    },

    getSiteData() {
        axios.get("/getSiteData").then((res) => {
            state.siteData = res.data.siteData;
        });
    },

    login({dispatch}, data) {
        axios.post("/login", data).then((res) => {
            if(res.data.done) {
                state.admin = true;
                state.token = res.data.token;
                state.userId = res.data.userId;
                localStorage.setItem("admin", true);
                localStorage.setItem("token", state.token);
                localStorage.setItem("userId", state.userId);
                axios.defaults.headers.common["Authorization"] = state.token;
                dispatch("showMessage", "Logged in successfully as admin");
                router.replace("/dashboard");
            } else {
                dispatch("showMessage", res.data.error);
            }
        });
    },

    editAdminData({dispatch}, data) {
        axios.post("/editAdminData", data).then((res) => {
            if(res.data.done) {
                dispatch("showMessage", "Admin data updated successfully");
                router.replace("/dashboard");
            } else {
                dispatch("showMessage", res.data.error);
            }
        });
    },

    logout() {
        state.admin = false;
        state.token = null;
        localStorage.removeItem("admin");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        router.push("/");
    },

    autoLogin({dispatch}) {
        dispatch("getSiteData");
        if(localStorage.getItem("admin")) state.admin = localStorage.getItem("admin");
        else return;
        if(localStorage.getItem("token")) state.token = localStorage.getItem("token");
        else return;
        if(localStorage.getItem("userId")) state.userId = localStorage.getItem("userId");
        else return;
        
        axios.defaults.headers.common["Authorization"] = state.token;
    }
}

const getters = {
    message() {
        return state.message;
    },
    categories() {
        return state.categories;
    },
    siteData() {
        return state.siteData;
    },
    admin() {
        return state.admin;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
<template>
  <div class="container site-data-cont p-md-4">
    <h2 class="text-center">تحديث بيانات الموقع</h2>
    <hr />
    <loading v-if="!ready"/>
    <div v-if="ready" class="row">
            <div class="col-md-6">
                <div class="field form-group">
                    <label>Site name</label>
                    <input class="form-control" placeholder="Site name" v-model="siteData.siteName" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="field form-group">
                    <label>company description</label>
                    <input class="form-control" placeholder="company description" v-model="siteData.description" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="field form-group">
                    <label>Phone number</label>
                    <input class="form-control" placeholder="Phone" v-model="siteData.phone" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="field form-group">
                    <label>company field</label>
                    <input class="form-control" placeholder="company field" v-model="siteData.field" />
                </div>
            </div>
            <div class="col-md-12">
                <div class="field form-group">
                    <label>instructions for client</label>
                    <p>ضع فاصلة (,) بين كل تعليم والاخر</p>
                    <textarea class="form-control" v-model="siteData.instructions" placeholder="instructions"></textarea>
                </div>
            </div>
            <div class="col-md-6">
                <div class="field form-group">
                    <label>Facebook</label>
                    <input class="form-control" placeholder="Facebook" v-model="siteData.facebook" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="field form-group">
                    <label>Email</label>
                    <input class="form-control" placeholder="Email" v-model="siteData.email" />
                    <a href="https://accounts.google.com/b/0/DisplayUnlockCaptcha">to reset password activate your email to send emails by the website</a>
                </div>
            </div>
            <div class="col-md-6">
                <div class="field form-group">
                    <label>Whatsapp</label>
                    <input class="form-control" placeholder="Whatsapp" v-model="siteData.whatsapp" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="field form-group">
                    <label>stripe publishable api key</label>
                    <input class="form-control" placeholder="stripe publishable api key" v-model="siteData.stripe_publishable_api_key" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="field form-group">
                    <label>stripe secret key</label>
                    <input class="form-control" placeholder="stripe secret key" v-model="siteData.stripe_secret_key" />
                </div>
            </div>
            <hr />
            <div class="col-md-6">
                <div class="field pick-images mt-4">
                    <label>pick site background image</label>
                    <input @change="pickImage" ref="image" type="file" class="form-control" />
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="field pick-images mt-4">
                    <label>pick main page video</label>
                    <input @change="pickVideo" ref="video" type="file" class="form-control" />
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <div v-if="image_display" class="display">
                    <div class="row justift-content-center">
                        <div class="col-md-12">
                        <img :src="image_display" alt="cover-img" class="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div v-if="video_display" class="display">
                    <div class="row justift-content-center">
                        <div class="col-md-12">
                        <video width="100%" height="300px" controls>
                            <source :src="video_display" type="video/mp4"/>
                        </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <br />
    <div v-if="loading" class="d-flex justify-content-center align-items-center">
      <loading v-if="loading" />
    </div>
    <hr>
    <div class="w-100 d-flex justify-content-center">
      <button class="button btn w-50" @click="submit">Update</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
  },
  created() {
    axios.get("/getSiteDataForAdmin").then((res) => {
        if(res.data.siteData) {
            this.siteData = res.data.siteData;
            if(this.siteData.image) this.image_display = this.siteData.image;
            if(this.siteData.video) this.video_display = this.siteData.video;
        }
        this.ready = true;
        this.$store.dispatch("getSiteData");
    });
  },
  data() {
    return {
      siteData: {
        siteName: "",
        description: "",
        phone: "",
        field: "",
        facebook: "",
        email: "",
        whatsapp: "",
        stripe_publishable_api_key: "",
        stripe_secret_key: "",
        instructions: "",
        image: null,
        video: null,
      },
      image_display: null,
      video_display: null,
      loading: false,
      ready: false,
    };
  },
  methods: {
    submit() {
      const formData = new FormData();
      Object.keys(this.siteData).forEach(sd => {
          formData.append(sd, this.siteData[sd]);
      });
      this.loading = true;
      axios.patch("/updateSiteData", formData).then((res) => {
        this.loading = false;
        if (res.data.done) {
          this.$store.dispatch("showMessage", "تم تحديث البيانات بنجاح");
        } else {
          this.$store.dispatch("showMessage", "لم تقم بتحديث أى بيانات");
        }
      });
    },
    pickImage() {
        const file = this.$refs.image.files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert("حجم الصورة أكبر من المسموح به");
            return;
        }
        if (!["jpg", "jpeg", "png"].includes(file.type.split("/")[1])) {
            alert("مسموح فقط بالصور");
            return;
        }
        this.siteData.image =file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.image_display =reader.result;
        };
    },

    pickVideo() {
        const file = this.$refs.video.files[0];
        if (file.size > 20 * 1024 * 1024) {
            alert("حجم الفيديو أكبر من المسموح به");
            return;
        }
        if (!["mp4", "3gp", "avi"].includes(file.type.split("/")[1])) {
            alert("مسموح فقط بالفيديوهات");
            return;
        }
        this.siteData.video =file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
    .site-data-cont {
        background:rgba(255, 255, 255, 0.769);
        padding: 20px 10px;
    }

    .field {
        margin: 10px 0;
        // padding: 30px 0;
        // border-bottom: 3px solid rgba(85, 85, 85, 0.599);
        label {
            font-size: 1.1rem;
            color: rgba(0, 0, 0, 0.653);
        }
        input {
            height: 3rem;
            border: 2px solid rgba(85, 85, 85, 0.605);
            box-shadow: 1px 1px 2px 1px #555;
            &:focus {
                box-shadow: 2px 2px 8px 2px rgb(2, 33, 46);
            }
        }
    }




    .button {
    background: rgb(104, 103, 102);
    color: #fff;
    @media (max-width: 600px) {
        width: 100%;
    }
    }
    .pick-images {
    }
    .img-fluid {
    height: 300px;
    }
    input {
    margin: 2
    0px 0;
    }
</style>

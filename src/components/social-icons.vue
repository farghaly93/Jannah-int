<template>
    <div class="social-wrapper">
        <div class="icons">
            <div class="row align-items-center justify-content-center g-4">
                <div class="col-md-4">
                    <div @click="gotoLink('facebook')" class="social-item">
                        <i class="fa fa-facebook"></i>
                        <strong>FACEBOOK</strong>
                    </div>
                </div>
                <div class="col-md-4">
                    <div @click="gotoLink('whatsapp')" class="social-item">
                        <i class="fa fa-whatsapp"></i>
                        <strong>WHATSAPP</strong>
                    </div>
                </div>
                <div class="col-md-4">
                    <div @click="gotoLink('email')" class="social-item">
                        <i class="fa fa-envelope"></i>
                        <strong>EMAIL</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .social-wrapper {
        background: rgba(255, 255, 255, 0.933);
    }
    .icons {
        // border: 5px solid #777;
        // border-radius: 20px;
    }
    .social-item {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        cursor: pointer;
        i {
            font-size: 6rem;
            color: rgba(12, 12, 12, 0.837);
            text-shadow: 3px 3px  13px 13px rgb(255, 253, 253);
            font-weight: 900;
        }
        strong {
            color: rgba(22, 21, 21, 0.844);
        }
    }

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////



</style>

<script>
export default {
    computed: {
        siteData() {
            return this.$store.getters.siteData;
        }
    },
    methods: {
        gotoLink(link) {
            if (link === "whatsapp") {
                window.open(
                "https://api.whatsapp.com/send?phone=+2" + this.siteData.whatsapp,
                "_blank"
                );
            }

            if (link === "email") {
                window.open(
                "mailto:" +
                    this.siteData.email +
                    "?subject=Subject&body=message%20goes%20here",
                "_blank"
                );
            }

            if (link === "telegram") {
                window.open(this.siteData.telegram);
            }

            if (link === "facebook") {
                console.log(navigator.platform);
                if (
                // /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
                //   navigator.userAgent
                // )
                !navigator.platform.includes("Win32")
                ) {
                window.open("fb://facewebmodal/f?href=" + this.siteData.facebook);
                } else {
                window.open(this.siteData.facebook, "_blank");
                }
            }
        },
    }
}
</script>
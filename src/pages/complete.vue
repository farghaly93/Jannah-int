<template>
    <div class="complete-center">
        <div class="center">
            <loading v-if="loading" />
        </div>
        <div class='container content'>
            <h3 v-if="admin" style=''>Successfull Transaction</h3>
            <h3 v-else>Payment complete!</h3>
            <p v-if="admin">You can go to the receipt link to see the ariginal resept on stripe </p>
            <p v-if="!admin">Congratulations! Your transaction is successfully deleivered to <strong>{{siteName}}</strong></p>
            <br>
            <div v-if='orderDetails'>
                <dl>
                    <dt>Transaction number</dt>
                    <dd>{{ orderDetails.id }}</dd>
                    <dt>Transaction Created</dt>
                    <dd>{{ orderDetails.created | moment }}</dd>
                    <dt>Payment Amount</dt>
                    <dd>{{ orderDetails.amount | currency }}</dd>
                    <dt>Client Address</dt>
                    <dd>{{ orderDetails.shipping.address.line1 }}, {{ orderDetails.shipping.address.city }}, {{ orderDetails.shipping.address.state }} {{ orderDetails.shipping.address.postal_code }}</dd>
                    <dt>Email</dt>
                    <dd>{{ orderDetails.receipt_email }}</dd>
                    <dt>Receipt</dt>
                    <dd><a target="__blank" :href="orderDetails.receipt_url">go to receipt link</a></dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .complete-center {
        padding: 6rem 0;
        // width: 100vw;
        // height: 100vh;
        // overflow: auto;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
    }
    .content {
        background: linear-gradient(0deg, rgba(11, 11, 11, 0.599) 67%, rgba(255, 255, 255, 0.721) 100%);
        // margin: 50px auto;
        padding: 2rem;
        box-shadow: 1px 1px 6px 1px #fff;
    }
    h3 {color:#42ff03}
    p {color:#00fff9}
    dt { font-weight: bold; color: #a9bcaf;}
    dd {
        color: #fff;
        margin-bottom: 10px;
    }
</style>
<script>
import axios from 'axios';
import moment from 'moment';

export default {
    data(){
        return {
            orderDetails: false,
            loading: false
        };
    },
    computed: {
        siteName() {
            return this.$store.getters.siteData.siteName;
        },
        admin() {
            return this.$store.getters.admin;
        }
    },
    created(){
        var charge_id = this.$route.params.id;
        this.loading = true;
        axios.get(`/retrieveCharge/${charge_id}`)
            .then((res)=>{
                this.loading = false;
                this.orderDetails = res.data.charge;
                console.log(this.orderDetails);
            });
    },
    filters: {
        moment(date) {
            return moment.unix(date).format('MMMM Do, YYYY - h:mm a');
        },
        currency(amount){
            return `$${(amount/100).toFixed( 2 )}`;
        }
    }
}
</script>
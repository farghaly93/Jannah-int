<template>
    <div>
        <div class="payment-cover"></div>
        <div class='container payment-cont'>
            <h1 class="head" style="color:#000">Payment</h1>
            <!-- <credit-card-field v-model="card"></credit-card-field> -->
            <!-- <inline-credit-card-field v-model="card"></inline-credit-card-field> -->

            <div class='row align-items-center py-5'>
                <div class='col-md-6'>
                    <img class="img-fluid" src="../assets/imgs/immigration6.png" alt="A bundle of sticks">
                </div>
                <div class="col-md-6">
                    <div id="card" class="card-wrapper">
                        <div class="card-container">
                            <div class="card-top">
                                <div class="top-right">
                                    <img :src="require('../assets/imgs/' + cardType + '.svg') || '../assets/imgs/visa.png'" alt="visa" class="img-fluid">
                                </div>
                            </div>
                            <div class="row">
                                <div class="field col-md-12">
                                    <label for="card_number">Card Number</label>
                                    <input 
                                        @input="validate('cardNumber')"
                                        id="card_number" 
                                        v-model="card.number" 
                                        type="text"
                                        class="form-control"
                                        placeholder='4242424242424242'>
                                    <span class="danger" v-show="cardNumberError">
                                        {{ cardNumberError }}
                                    </span>
                                </div>
                        
                        
                                <div class="field col-6">
                                    <label for="exp_month">Expiry Month</label>
                                    <input 
                                        @input="validate('month')"
                                        id="exp_month" 
                                        v-model="card.exp_month"
                                        type="text"
                                        class="form-control"
                                        placeholder="MM">
                                    <span class="danger" v-show="cardMonthError">
                                        {{ cardMonthError }}
                                    </span>
                                </div>
                                <div class="field col-6">
                                    <label for="exp_month">Expiry Year</label>
                                    <input 
                                        @input="validate('year')"
                                        id="exp_year" 
                                        v-model="card.exp_year" 
                                        type="text"
                                        class="form-control"
                                        placeholder="YY">
                                    <span class="danger" v-show="cardYearError">
                                        {{ cardYearError }}
                                    </span>
                                </div>
                                <div class="field col-md-12">
                                    <label for="cvc">CVC</label>
                                    <input 
                                        @input="validate('cvc')"
                                        id="cvc" 
                                        v-model="card.cvc" 
                                        type="text"
                                        class="form-control"
                                        placeholder='123'>
                                    <span class="danger" v-show="cardCvcError">
                                        {{ cardCvcError }}
                                    </span>
                                </div>
                            </div>
                            <div class="card-danger text-small" v-if="cardCheckError">
                                <span>{{ cardCheckErrorMessage }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row align-items-center inputs m-0 m-md-4">
                <div class="col-md-6 p-md-3 p-1">
                    <div class="row">
                        <div class="field col-md-12">
                            <label>Address</label>
                            <input type='text' class='form-control' v-model='address.street' placeholder='123 Fake St #303'>
                        </div>
                        <div class="field col-md-12">
                            <label>City</label>
                            <input type='text' class='form-control' v-model='address.city' placeholder='San Francisco'>
                        </div>
                        <div class="field col-md-12">
                        <label>State</label>
                            <input type='text' class='form-control' v-model='address.state' placeholder='CA'>
                        </div>
                        <div class="field col-md-12">
                            <label>Zip</label>
                            <input type='text' class='form-control' v-model='address.zip' placeholder='94607'>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 p-0 p-md-5">
                    <div class='row'>            
                        <div class='field col-md-12'>
                            <label>Name</label>
                            <div class="control">
                                <input 
                                    @input="validate('name')"
                                    class="form-control" 
                                    type="text" 
                                    placeholder="First and Last" 
                                    v-model='name'>
                                <span class="icon is-small is-left">
                                <i class="fa fa-user"></i>
                                </span>
                                <span class="danger" v-show="nameError">
                                    {{ nameError }}
                                </span>
                            </div>
                        </div>
                        <div class="field col-md-12">
                            <label>Email</label>
                            <div class="control">
                                <input
                                    @input="validate('email')"
                                    class="form-control" 
                                    type="text" 
                                    placeholder="Email address" 
                                    v-model='email'>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                                <span class="danger" v-show="emailError">
                                    {{ emailError }}
                                </span>
                            </div>
                        </div>

                        <div class="field col-md-12">
                            <label>Phone</label>
                            <div class="control">
                                <input
                                    @input="validate('phone')" 
                                    class="form-control" 
                                    type="text" 
                                    placeholder="Phone" 
                                    v-model='phone'>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-phone"></i>
                                </span>
                                <span class="danger" v-show="phoneError">
                                    {{ phoneError }}
                                </span>
                            </div>
                        </div>

                        <div class="field col-md-12">
                            <label>Country</label>
                            <div class="control">
                                <input
                                    @input="validate('country')" 
                                    class="form-control" 
                                    type="text" 
                                    placeholder="Country" 
                                    v-model='country'>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-home"></i>
                                </span>
                                <span class="danger" v-show="countryError">
                                    {{ countryError }}
                                </span>
                            </div>
                        </div>

                        <div class="field col-md-12">
                            <label>Amount</label>
                            <div class="control">
                                <input
                                    @input="validate('amount')" 
                                    class="form-control" 
                                    type="number"
                                    min="0"
                                    max="10000"
                                    placeholder="1$" 
                                    v-model.number='amount'>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-dollar"></i>
                                </span>
                                <span class="danger" v-show="amountError">
                                    {{ amountError }}
                                </span>
                            </div>
                        </div>
                            <!-- <label>Special Note</label>
                            <textarea class="textarea" placeholder="What would you like the note to say?" v-model='specialNote'></textarea> -->

                    </div>
                </div>
            </div>
            
            <hr>
            <div v-if="chargeError" class="row">
                <div class="col-md-12">
                    <div class="charge-error text-small">
                        {{chargeError}}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class='col-md-12 center'>
                    <button type="submit" class="w-75 btn pay-btn" @click.prevent="submit" :disabled="cardCheckSending || !stripeKey">
                        <span v-if="cardCheckSending">
                            <i class="fa fa-btn fa-spinner fa-spin"></i> 
                            Ordering...
                        </span>
                        <span v-else>
                            Place Order
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
  h2 { text-decoration: underline; }
  .textarea:not([rows]) { max-height: 110px; min-height: 110px; }
  .container { margin-bottom: 30px; }
  .column > img { margin-top: 60px; }
  .button-field { display: flex; justify-content: center; }
  #left-line { margin-top:27px; }

    .payment-cover {
        z-index: -2000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: url("../assets/imgs/visa-bg.jpg") center center;
        background-size: cover;
    }
    .payment-cont {
        padding: 50px 10px;
        z-index: 0;
        background: rgba(255, 255, 255, 0.293);
        height: 100vh;
        overflow: auto;
    }
    .field {
        margin-top: 20px;
        label {
            color: #555;
            font-weight: 700;
        }
        input {
            border: 2px solid rgba(102, 102, 102, 0.565);
        }
    }

  .control {
      position: relative;
      .icon {
          position: absolute;
          top: 10px;
          right: 10px;
          
      }
  }
  .card-wrapper {
      background: url("../assets/imgs/visa-bg.jpg");
        border: 3px solid #666;
        border-radius: 13px;
        overflow: hidden;
  }
  .card-container {
    position: relative;
    padding: 36px 10px;
    background: rgba(0, 0, 0, 0.667);
    .card-top {
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.884);
        border-top-right-radius: 13px;
        border-top-left-radius: 13px;
        padding: 5px;
        direction: rtl;
        .top-right {
            width: 100px;
            height: 40px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .field {
        input {
            background:rgba(102, 102, 102, 0.565);
            color: #fff;
            font-weight: 500;
        }
        label {
            color: rgba(255, 255, 255, 0.653);
            @media(max-width: 700px) {
                font-size: .7rem;
            }
        }
    }
  }
    
    .inputs {
        background: rgba(255, 255, 255, 0.741);
        border: 2px solid #fff;
    }

    .danger {
        color: red;
    }
    .card-danger {
        color: rgba(255, 0, 0, 0.667);
        text-align: center;
        font-weight: 700;
    }
    .charge-error {
        background: rgba(255, 255, 255, 0.85);
        text-align: center;
        text-shadow: 1px 1px 1px rgba(204, 180, 180, 0.844);
        color: rgba(255, 0, 0, 0.667);
        padding: 4px;
        margin: 10px auto;
    }

  .pay-btn {
      padding: 14px 20px;
      background:rgb(7, 93, 180);
      color: #fff;
      border-radius: 12px;
  }
</style>



<script>
import axios from 'axios';
// import '@stripe/stripe-js';
export default {
    created() {
        axios.get("/getSiteData").then(res => {
            this.stripeKey = res.data.siteData.stripe_publishable_api_key;
            console.log(this.stripeKey);
        })
    },
  components: {
  },
    data(){
        return {
            stripeKey: "pk_test_***********************",

            // fields
            name: 'Haytham Almuslih',
            email: 'haytham@hotmail.com',
            phone: "01025887896",
            country: "Egypt",
            amount: null,
            // specialNote: 'This is the text to put on the bundle of sticks',
            address: {
                street: '123 Something Lane',
                city: 'San Francisco',
                state: 'CA',
                zip: '94607'
            },

            card: {
                number: '4242424242424242',
                cvc: '123',
                exp_month: '01',
                exp_year: '22'
            },

            // validation
            cardNumberError: null,
            cardCvcError: null,
            cardYearError: null,
            cardMonthError: null,
            nameError: null,
            emailError: null,
            phoneError: null,
            countryError: null,
            amountError: null,
            cardCheckSending: false,
            cardCheckError: false,
            cardCheckErrorMessage: '',
            chargeError : null,
            cardType: "visa"
        }
    },
    watch: {
        stripeKey(val) {
            if(val) {
                this.$store.dispatch("showMessage", "You are ready to do transaction..")
            }
        }
    },
    methods: {
        validate(field = null){
            // this.clearCardErrors();
            let valid = true;

            if(!field || field == 'cardNumber'){
                this.cardNumberError = null;
                if(!this.card.number) {valid = false; this.cardNumberError = "Card Number is Required";}
                this.detectCardType(this.card.number);
            }
            /////////////////////////////////////////

            if(!field || field == 'cvc'){
                this.cardCvcError = null;
                if(!this.card.cvc) {valid = false; this.cardCvcError = "Card CVC is Required";} 
            }
            /////////////////////////////////////////

            if(!field || field == 'month'){
                this.cardMonthError = null;
                if(!this.card.exp_month) {valid = false; this.cardMonthError = "Card month is Required";} 
            }
            /////////////////////////////////////////

            if(!field || field == 'year'){
                this.cardYearError = null;
                if(!this.card.exp_year) {valid = false; this.cardYearError = "Card year is Required";} 
            }
            //////////////////////////////////////////

            if(!field || field == 'name'){
                this.nameError = null;
                if(!this.name) {valid = false; this.nameError = "Name is Required";} 
            }
            //////////////////////////////////////////
            
            if(!field || field == 'email'){
                this.emailError = null;
                if(!this.email) {valid = false; this.emailError = "Email is Required";} 
            }
            //////////////////////////////////////////
            
            if(!field || field == 'phone'){
                this.phoneError = null;
                if(!this.phone) {valid = false; this.phoneError = "Phone is Required";} 
            }
            //////////////////////////////////////////
            
            if(!field || field == 'country'){
                this.countryError = null;
                if(!this.country) {valid = false; this.countryError = "Country is Required";} 
            }
            //////////////////////////////////////////
            
            if(!field || field == 'amount'){
                this.amountError = null;
                if(!this.amount || this.amount <= 0) {valid = false; this.amountError = "Amount is Required";} 
            }
            //////////////////////////////////////////

            return valid;
        },

        submit() {
            if(this.validate()){
                this.chargeError = null;
                this.createToken();
            }
        },

        clearCardErrors(){
            this.cardNumberError = null;
            this.cardCvcError = null;
            this.cardMonthError = null;
            this.cardYearError = null;
            this.nameError = null;
            this.emailError = null;
            this.phoneError = null;
            this.countryError = null;
            this.amountError = null;
        },
        createToken() {
            try {
                this.cardCheckError = false;
                window.Stripe.setPublishableKey(this.stripeKey);
                window.Stripe.createToken(this.card, this.stripeResponseHandler);
                this.cardCheckSending = true;
            } catch(err) {
                 this.chargeError = err.message;
            }
        },
        stripeResponseHandler(status, response) {
            this.cardCheckSending = false;
            if (response.error) {
                this.cardCheckErrorMessage = response.error.message;
                this.cardCheckError = true;
                document.getElementById("card").scrollIntoView({behavior: "smooth", block: "start"})
            } else {

                // token to create a charge on our server 
                var token_from_stripe = response.id;

                var request = {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    country: this.country,
                    address: this.address,
                    amount: this.amount * 100,
                    date: new Date().getTime(),
                    // card: this.card,
                    token_from_stripe: token_from_stripe
                };

                // Send to our server
                this.cardCheckSending = true;
                axios.post('/charge', request)
                    .then((res) => {
                        this.cardCheckSending = false;
                        if (!res.data.done && res.data.error){
                            const error = res.data.error.raw.message;
                            this.chargeError = error;
                        } else {
                            const charge = res.data.charge;
                            this.$router.push({ path: `complete/${charge.id}` })
                        }
                    });
            }
        },
        detectCardType(number) {
            var re = {
                // electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
                maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
                dankort: /^(5019)\d+$/,
                // interpayment: /^(636)\d+$/,
                unionpay: /^(62|88)\d+$/,
                visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                mastercard: /^5[1-5][0-9]{14}$/,
                amex: /^3[47][0-9]{13}$/,
                diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                jcb: /^(?:2131|1800|35\d{3})\d{11}$/
            }

            for(var key in re) {
                if(re[key].test(number)) {
                    console.log(key);
                    this.cardType = key;
                }
            }
        }
    }
}
</script>
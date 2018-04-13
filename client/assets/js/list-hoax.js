Vue.component('list-hoax', { 
    template:
    `
    <div class="container d-flex flex-wrap">
        <div class="card mx-auto" style="width: 18rem;" v-for="hoax in datahoax" v-bind:style="{'background-color': isOpen(hoax.UploadType, hoax.UploadStatus)}">
            <img class="card-img-top" :src="hoax.UploadImage" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ hoax.UploadTitle }}</h5>
                <p class="card-text">{{ hoax.UploadDesc }}</p>              
                <div class="d-flex flex-wrap justify-content-around align-items-center">
                    <div class="d-flex justify-content-start">
                        <p style="margin-right:10%;">Legit</p>
                        <a style="margin-right:10%;" v-on:click="increaseLike(hoax)"><span class="fas fa-thumbs-up"></span></a>
                        <p>{{ hoax.UploadLike }}</p>
                    </div>
                    <div class="d-flex justify-content-start">
                        <p style="margin-right:10%;">Hoax</p>
                        <a style="margin-right:10%; margin-top:3%;" v-on:click="increaseDislike(hoax)"><span class="fas fa-thumbs-down"></span></a>
                        <p>{{ hoax.UploadDislike }}</p>
                    </div>
                </div>               
            </div>
            <div class="alert alert-light" role="alert" v-if="hoax.UploadStatus === 'Close' && hoax.UploadStatus === 'Hoax'">
                This news is HOAX !!!
            </div>
            <div class="alert alert-light" role="alert" v-if="hoax.UploadStatus === 'Close' && hoax.UploadStatus === 'Not Hoax'">
                This news is LEGIT !!!
            </div>
        </div>
    </div>
    
    `,

    props: ['datahoax'],


    data: function(){
        return {
           
        }
    },        

    methods:{
        isOpen: function(type, status){
            if(type === 'Close' && status === 'Hoax'){
                return 'rgba(239, 62, 22, 0.8)';
            } else  if(type === 'Close' && status === 'Not Hoax'){
                return 'rgba(21, 211, 27, 0.8)';
            }else {
                return 'rgba(255, 255, 255, 0.8)';
            }
        },

        increaseLike: function(hoax){
            this.$emit('pluslike',hoax)
            
        },

        increaseDislike: function(hoax){
            this.$emit('plusdislike',hoax)            
        }
    }

    
 })
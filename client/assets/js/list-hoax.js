Vue.component('list-hoax', { 
    template:
    `
    <div class="container d-flex flex-wrap">
        <div class="card" style="width: 18rem;" v-for="hoax in datahoax" v-bind:style="{'background-color': isOpen(hoax.UploadType)}">
            <img class="card-img-top" :src="hoax.UploadImage" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ hoax.UploadTitle }}</h5>
                <p class="card-text">{{ hoax.UploadDesc }}</p>
                <div class="row">
                    <div class="col-6 d-flex flex-wrap justify-content-around align-items-center">
                        <a v-on:click="increaseLike(hoax)"><span class="fas fa-thumbs-up"></span></a>
                        <p>{{ hoax.UploadLike }}</p>
                        <a v-on:click="increaseDislike(hoax)"><span class="fas fa-thumbs-down"></span></a>
                        <p>{{ hoax.UploadDislike }}</p>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                        <i class="fas fa-eye"></i>
                        <i class="fas fa-share-alt-square"></i>
                    </div>
                </div>
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
        isOpen: function(status){
            if(status === 'Close'){
                return 'red';
            } else {
                return 'white';
            }
        },

        increaseLike: function(hoax){
            this.$emit('pluslike',hoax)
            
        },

        increaseDislike: function(hoax){
            console.log('jalan engak nih');
            
            this.$emit('plusdislike',hoax)            
        }
    }

    
 })
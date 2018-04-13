Vue.component('list-hoax', { 
    template:
    `
    <div class="container d-flex flex-wrap">
        <div class="card mx-auto" style="width: 18rem;" v-for="hoax in datahoax" v-bind:style="{'background-color': isOpen(hoax.UploadType, hoax.UploadStatus)}">
            <img class="card-img-top" :src="hoax.UploadImage" alt="Card image cap" v-if="hoax.UploadImage === 'image'">
            <video style="width:100%;" controls>
                <source src="https://00e9e64bacf5fdda8e1b7c69210377940eb39225f97b22de43-apidata.googleusercontent.com/download/storage/v1/b/uploadimage.irsyadpahlapi.com/o/1523602782282.mp4?qk=AD5uMEsImzJmE73c6DQijr6tPZzO17ma7-FLaT87oeXAkwEGIyTBWVdIJeR32rv0WCDkPbG6dQcfsfO779fZ4QBbaDSLDC6baXHUVQW6M6uqAfuXrEIOPKuj67Y_NTvTJ3ZmWfi8EaYcWf8bIHsvGVw6i0cCmz7eGs0bas6FYiismgF6J3tzhah8JpifvQfH-04xIabmy9ETzdpQXLhQ3kiRv6ST_xE45_GaYGTT-1PkZPcf8edDMauBrYXg5aOEGIYsq8YkplVHjQxvfz9m0s6dujj6n87zJhyGvD8YFNJWED4lnUwLJAmvHFlMSGdoCelcplCUrKTDENInbus42ucgQwPGbRTSBehCwL9ACouWewghKPVFgmlquoGcimBAlT8wjyauD5fK9Ek8eiY-09qo7LOQigLGqc3O_npNdjlfBwQJMiQ02W2ux7n_ROi2rpGKIzueU6DS4M4I8w2JvENYGR09D4asUq9vnomK_4xcSkK5SasIEd4WSDHVqwIiLarbxdXD5WBcshVaBXbRQsStd5WSUcU1tpR_fllFKKDqlWJMk-5x5YYn5m4kbNH33cteKAzjkPMb5_orSvJCY_xcPbreUJxYvBz7MYdzfRS59YhgYfE7i7TkTPMDOojMU4V1SgWeMXI7NFZghE-sN9xC1wbDyu2dwDXjh-0n4KPJR3v67ALhHraMSUOZFEdkUHE777lwy3nybWka6tbs_1i57G5nxDZe2osDeCh9yK3GxnDkkjpPvZQ6cBCAkGWk4kuE3jyT6rTn" type="video/mp4">
                <source src="https://00e9e64bacf5fdda8e1b7c69210377940eb39225f97b22de43-apidata.googleusercontent.com/download/storage/v1/b/uploadimage.irsyadpahlapi.com/o/1523602782282.mp4?qk=AD5uMEsImzJmE73c6DQijr6tPZzO17ma7-FLaT87oeXAkwEGIyTBWVdIJeR32rv0WCDkPbG6dQcfsfO779fZ4QBbaDSLDC6baXHUVQW6M6uqAfuXrEIOPKuj67Y_NTvTJ3ZmWfi8EaYcWf8bIHsvGVw6i0cCmz7eGs0bas6FYiismgF6J3tzhah8JpifvQfH-04xIabmy9ETzdpQXLhQ3kiRv6ST_xE45_GaYGTT-1PkZPcf8edDMauBrYXg5aOEGIYsq8YkplVHjQxvfz9m0s6dujj6n87zJhyGvD8YFNJWED4lnUwLJAmvHFlMSGdoCelcplCUrKTDENInbus42ucgQwPGbRTSBehCwL9ACouWewghKPVFgmlquoGcimBAlT8wjyauD5fK9Ek8eiY-09qo7LOQigLGqc3O_npNdjlfBwQJMiQ02W2ux7n_ROi2rpGKIzueU6DS4M4I8w2JvENYGR09D4asUq9vnomK_4xcSkK5SasIEd4WSDHVqwIiLarbxdXD5WBcshVaBXbRQsStd5WSUcU1tpR_fllFKKDqlWJMk-5x5YYn5m4kbNH33cteKAzjkPMb5_orSvJCY_xcPbreUJxYvBz7MYdzfRS59YhgYfE7i7TkTPMDOojMU4V1SgWeMXI7NFZghE-sN9xC1wbDyu2dwDXjh-0n4KPJR3v67ALhHraMSUOZFEdkUHE777lwy3nybWka6tbs_1i57G5nxDZe2osDeCh9yK3GxnDkkjpPvZQ6cBCAkGWk4kuE3jyT6rTn" type="video/ogg">
            </video>           
            <div class="card-body">
                <div>
                    <a href="google.com"><h5 class="card-title">{{ hoax.UploadTitle }}</h5></a>
                    <p class="card-text">{{ hoax.UploadDesc }}</p>
                    <div class="row">
                        <div class="col-6 d-flex justify-content-start">
                            <p style="margin-right:5%;">Legit</p>  
                            <a v-on:click="increaseLike(hoax)" style="margin-right:10%;"><span class="fas fa-thumbs-up"></span></a>
                            <p>{{ hoax.UploadLike }}</p>                        
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <p style="margin-right:5%;">Hoax</p>  
                            <a v-on:click="increaseDislike(hoax)" style="margin-right:10%; margin-top:3%;"><span class="fas fa-thumbs-down"></span></a>
                            <p>{{ hoax.UploadDislike }}</p>
                        </div>
                    </div>
                    <div class="alert alert-light" role="alert" v-show= "hoax.UploadStatus === 'Hoax' && hoax.UploadType === 'Close'">
                        <p>This Article is HOAX !!!</p>
                    </div>
                    <div class="alert alert-light" role="alert" v-show="hoax.UploadStatus === 'Not' && hoax.UploadType === 'Close'">
                        <p>This Article is LEGIT !!!</p>
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
        isOpen: function(status, type){
            if(status === 'Close' && type === 'Not'){
                return 'rgba(0,255,0,0.8)';
            } else if(status === 'Close' && type === 'Hoax'){
                return 'rgba(226, 73, 12,0.8)';
            }else {
                return 'rgba(255,255,255,1)';
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
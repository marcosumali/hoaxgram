Vue.component('list-hoax', { 
    template:
    `
    <div class="container d-flex flex-wrap">
        <div class="card" style="width: 18rem;" v-for="hoax in hoaxs" v-bind:style="{'background-color': isOpen(hoax.UploadType)}">
            <img class="card-img-top" :src="hoax.UploadImage" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ hoax.UploadTitle }}</h5>
                <p class="card-text">{{ hoax.UploadDesc }}</p>
                <div class="row">
                    <div class="col-6 d-flex flex-wrap justify-content-around align-items-center">
                        <a v-on:click="increaseLike(hoax)"><span class="fas fa-thumbs-up"></span></a>
                        <p>{{ hoax.UploadLike }}</p>
                        <a v-on:click="increaseDislike(hoax)"></a><span class="fas fa-thumbs-down"></span>
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

    props: [],


    data: function(){
        return {
            hoaxs: []
        }
    },

    //pengaruh arrow function saat ambil data 
    //https://stackoverflow.com/questions/40996344/axios-cant-set-data

    beforeCreate: function(){

        //ambil semua data hoax
        axios.get('http://localhost:3000/allhoax')
        .then(response =>{           
            this.hoaxs = response.data.data;
            
            let votedHoaxs = JSON.parse(localStorage.getItem('voteds'));
            let isVoted;
            
            (votedHoaxs) ? '' : votedHoaxs=[];

            for(index in this.hoaxs){
                
                if(this.hoaxs[index].UploadType === 'Close'){
                    votedHoaxs.push(this.hoaxs[index]._id);                        
                }
            }
            
            localStorage.setItem('voteds', JSON.stringify(votedHoaxs))
        })
        .catch(error =>{
            console.log('ini error----------------------------',error);
        })
    },    

    methods:{
        isOpen: function(status){
            if(status === 'Close'){
                return 'red';
            } else {
                return 'white';
            }
        },

        // Jangan langsung d refresh, tunggu update like/dislike selesai di server
        // klo enggak nanti isi hoaxnya jadi null semua
        increaseLike: function(hoax){
            let votedHoaxs = JSON.parse(localStorage.getItem('voteds'));
            let isVoted;
            let _this = this;

            if(votedHoaxs.length > 0){
                isVoted = votedHoaxs.find((checked)=>{
                    return checked === hoax._id;
                })

                if(!isVoted){
                    hoax.UploadLike++;
                    votedHoaxs.push(hoax._id);
                    localStorage.setItem('voteds', JSON.stringify(votedHoaxs))

                    this.updateLikeDislike(hoax);
                }
                               
            } else {                
                hoax.UploadLike++;
                votedHoaxs = [];
                votedHoaxs.push(hoax._id);
                localStorage.setItem('voteds', JSON.stringify(votedHoaxs))

                this.updateLikeDislike(hoax);
            }
            
        },

        increaseDislike: function(hoax){
            let votedHoaxs = JSON.parse(localStorage.getItem('voteds'));
            let isVoted;
            let _this = this;

            if(votedHoaxs.length > 0){
                isVoted = votedHoaxs.find((checked)=>{
                    return checked === hoax._id;
                })

                if(!isVoted){
                    hoax.UploadDislike++;
                    votedHoaxs.push(hoax._id);
                    localStorage.setItem('voteds', JSON.stringify(votedHoaxs))

                    this.updateLikeDislike(hoax);
                }
                               
            } else {                
                hoax.UploadDislike++;
                votedHoaxs = [];
                votedHoaxs.push(hoax._id);
                localStorage.setItem('voteds', JSON.stringify(votedHoaxs))

                this.updateLikeDislike(hoax);
            }
            
        },

        updateLikeDislike: function(hoax){
            axios.post('http://localhost:3000/like-dislike',{
                _id: hoax._id,
                UploadLike: hoax.UploadLike,
                UploadDislike: hoax.UploadDislike
            })
            .then(response=>{
                console.log(response);                
            })
            .catch(error=>{
                console.log(error);                
            })
        }
    }

    
 })
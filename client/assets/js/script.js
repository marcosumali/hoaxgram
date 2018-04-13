var app = new Vue({
  el:'#app',
  data:{
    message:'hello world',
    email:'',
    password:'',
    addusername: '',
    addpassword: '',
    addemail: '',
    emailerror: '',
    errpassword: '',
    errpanel: '',
    regissuccess: '',
    hoaxs: []
  },

  beforeCreate: function(){

    //ambil semua data hoax
    axios.get('http://localhost:3000/hoax/allhoax')
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
    isEmailValid: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3}))$/;
      return re.test(email)
    },
    notifemail: function () {
      var isEmailValid = this.isEmailValid(this.addemail)

      if(!isEmailValid && this.addemail.length !== 0) {
        this.emailerror = 'email salah'
      } else {
        this.emailerror = ''
      }
    },
    notifpassword: function () {
      if(this.addpassword.length < 6 && this.addpassword.length !== 0) {
        this.errpassword = 'password minimal 6 character'
      } else {
        this.errpassword = ''
      }
    },
    login () {
      axios.post('http://localhost:3000/users/signin', {
        email: this.email,
        password: this.password
      }).then (response => {
        console.log(response)
        localStorage.setItem('token',response.data.token)
        location.replace('/')
      })
    },
    register () {
      if (this.addemail === ''){
        this.errpanel = 'email tidak boleh kosong'
      }
      else if (this.addpassword === ''){
        this.errpanel = 'password tidak boleh kosong'
      }
      else if (this.emailerr || this.errpassword){
        this.errpanel = 'check error your form'
      }
      else {
        axios.post('http://localhost:3000/users/signup', {
          username: this.addusername,
          email: this.addemail,
          password: this.addpassword
        }).then(response => {
          console.log(response);
          if (response.data.statuscode === 400) {
            this.errpanel = response.data.message
          }else{
            this.addusername = ''
            this.addemail = ''
            this.addpassword = ''
            this.errpanel = ''
            this.regissuccess = response.data.message
          }
        })
      }
    },

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

            this.updateLikeDislike(hoax)
        }
      
    },

    updateLikeDislike: function(hoax){
        axios.post('http://localhost:3000/hoax/like-dislike',{
            _id: hoax._id,
            UploadLike: hoax.UploadLike,
            UploadDislike: hoax.UploadDislike
        })
        .then(response=>{
            console.log(response)                
        })
        .catch(error=>{
            console.log(error)                
        })
    }
  },
  watch: {
    addemail: function () {
       this.notifemail()
    },
    addpassword: function () {
       this.notifpassword()
    }
  }
})

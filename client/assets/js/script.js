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
    regissuccess: ''
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

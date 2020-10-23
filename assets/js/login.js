var login=new Vue({
  el: '#main',
  data: {
    username: '',
    password:''
  },
  mounted:function()
  {
      var _this = this;
  },
  methods: {
	  login:function()
	  {
		  var _this = this;
		  var username = this.username;
		  var password= this.password;
		  // alert(username+password);
		  // return
		  if(username==null||password==null)
		  {
			  alert("The usename or password can not empty");
			  return
		  }
		  var param={'username':username,'password':password}
		  $.ajax({
				type : "post",
				url : "/login", 
				data:param,
				success : function(data) {//success to login
					if(data != 'error'){
						sessionStorage.setItem('userInfo', data);
						data = JSON.parse(data);
						sessionStorage.setItem('userid', data.uuid);
						location.href='/abme'
					} else {
						alert("The usename or password is not correct")
					}
				}
			});
	  }
  }
});




var login = new Vue({
	el: '#main',
	data: {
		username: '',
		password: '',
		email: '',
		divingLevel:'',
		photoUrl: '',
		journalTitle: ''
	},
	mounted: function() {
		var _this = this;
	},
	methods: {
		regist: function() {
			var _this = this;
			if(_this.username=='' || _this.password==''|| _this.email==''|| _this.photoUrl == '' || _this.journalTitle=='')
			{
				alert("All information cannot be empty")
				return;
			}
			
			var param = {
				'username': _this.username,
				'password': _this.password,
				'email': _this.email,
				'divingLevel':_this.divingLevel,
				'photoUrl': _this.photoUrl,
				'journalTitle': _this.journalTitle
			}

			$.ajax({
				type: "post",
				url: "/findByUsername",
				data: {username:_this.username},
				success: function(data) { //  go to register 
					if (data == 'success') {
						$.ajax({
							type: "post",
							url: "/register",
							data: param,
							success: function (data) { // go to login
								if (data == 'success') {
									alert("Regist success,please login");
									location.href = '/login'
								} else {
									alert("Regist error");
								}
							},
							error:function(res){
								console.log(res)
							}
						});
					} else {
						alert(data)
						alert('The username is exist')
					}
				}
			});
		},
		getFile(event) {
			var file = event.target.files[0];
			var reader = new FileReader();
			var that = this
			reader.readAsDataURL(file)
			reader.onload = function(e) {
				that.photoUrl = this.result
			}
			
		},
	}
});

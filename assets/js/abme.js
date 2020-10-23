var login = new Vue({
	el: '#main',
	data: {
		info: {
			number: '',
			date: '',
			location: '',
			meters: '',
			kg: '',
			url: '',
			userid: ''
		},
		userid:'',
		userInfo:{},
		bdata: [],
		divingLevelList:[
			"Open Water Diver",
			"Avanced Open Water Diver",
			"Divemaster",
			"Instructor"
		],
		divingLevel:'',
		photoUrl:''
	},
	mounted: function() {
		var _this = this;
		_this.parseUserInfo();
		var userid = sessionStorage.getItem('userid');
		_this.userid=userid;
		_this.init();
		
	},
	methods: {
		init: function() {
			var _this = this;
			var userid = sessionStorage.getItem('userid');
			var param = {
				'userid': userid
			}
			$.ajax({
				type: "post",
				url: "/abme",
				data: param,
				success: function(data) { //show data
					_this.bdata = JSON.parse(data);
				}
			});
		},
		view: function(item) {
			location.href = "/postA?pid=" + item.uuid;
		},
		edipP: function(item) {
			location.href = "/editP?pid=" + item.uuid;
		},
		deleteP: function(item) {
			var _this = this;
			var param = {
				uuid: item.uuid
			}
			$.ajax({
				type: "post",
				url: "/deleteP",
				data: param,
				success: function(data) { // delete success
					if (data == "success") {
						alert("delete success");
						_this.init();
					}
				}
			});
		},
		addBook:function(item)
		{
			var _this = this;
			var userid = sessionStorage.getItem('userid');
			var param = {
				pid: item.uuid,
				userid:userid
			}
			$.ajax({
				type: "post",
				url: "/addBook",
				data: param,
				success: function(data) { //add bookmark success
					if (data == "success") {
						alert("addBook success");
						_this.init();
					}
				}
			});
		},
		getQueryVariable: function(variable) {
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				if (pair[0] == variable) {
					return pair[1];
				}
			}
			return (false);
		},
		parseUserInfo:function()
		{
			var _this = this;
			var userInfo = sessionStorage.getItem('userInfo');
			_this.userInfo = JSON.parse(userInfo);
			_this.divingLevel = _this.userInfo.divingLevel;
		},
		editUser:function(e){
			e.stopPropagation();
			e.preventDefault();
			var _this = this;
			var form = new FormData($("#editUserDialog")[0]);
			
			var params = {
				uuid:_this.userid,
				// username:form.get('username'),
				journalTitle:form.get('journalTitle')
			}
			if(_this.photoUrl){
				params.photoUrl = _this.photoUrl
			}
			
			$.ajax({
				type: "post",
				url: "/editUser",
				data: params,
				success: function(data) { // edit user info
					if (data != 'error') {
						sessionStorage.setItem('userInfo', data);
						alert("Edit success");
						location.href = '/abme'
					} else {
						alert("Edit error");
					}
				},
				error:function(res){
					console.log(res)
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
		logout:function(){
			sessionStorage.removeItem('userInfo');
			sessionStorage.removeItem('userid')
			location.href = '/index'
		}
	}
});

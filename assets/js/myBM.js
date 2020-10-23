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
		bdata: []
	},
	mounted: function() {
		var _this = this;
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
				url: "/myBM",
				data: param,
				success: function(data) { // success to post
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
				url: "/deleteF",
				data: param,
				success: function (data) { // success to post
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
				success: function (data) { //success to post
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
		logout: function () {
			sessionStorage.removeItem('userInfo');
			sessionStorage.removeItem('userid')
			location.href = '/index'
		}
	}
});

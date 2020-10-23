var login = new Vue({
	el: '#main',
	data: {
		info: {
			number: '',
			date: '',
			location: '',
			meters: '',
			title: '',
			kg: '',
			url: '',
			userid: ''
		}
	},
	mounted: function() {
		var _this = this;
		var userid = sessionStorage.getItem('userid');
		_this.init();
	},
	methods: {
		init: function() {
			var _this = this;
			var uuid = _this.getQueryVariable('pid')
			param = {
				'uuid': uuid
			}
			$.ajax({
				type: "post",
				url: "/postA",
				data: param,
				success: function(data) { //success to post
					
					_this.info = JSON.parse(data)[0]
					console.log(_this.info)
				}
			});
		},
		editP: function() {
			var _this = this;
			if (_this.info.number == '' || _this.info.date == '' || _this.info.location == '' || _this.info.meters == '' ||
				_this.info.kg == '' || _this.info.url == '' || _this.info.title == '') {
				alert("All information cannot be empty")
				return;
			}
			$.ajax({
				type: "post",
				url: "/editP",
				data: _this.info,
				success: function(data) { //success to post
					if (data == 'success') {
						alert("editP success");
						//back to previous page
						window.location.href="javascript:history.go(-1)";
					} else {
						alert("editP error")
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
		getFile(event) {
			var file = event.target.files[0];
			var reader = new FileReader();
			var that = this
			reader.readAsDataURL(file)
			reader.onload = function(e) {
				that.info.url = this.result
			}
			
		},
	}
});

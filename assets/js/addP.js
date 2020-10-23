var login=new Vue({
  el: '#main',
  data: {
    number: '',
    date:'',
	location:'',
	meters:'',
	title:'',
	kg:'',
	message:'',
	url:'',
	userid:''
  },
  mounted:function()
  {
      var _this = this;
	  var userid = sessionStorage.getItem('userid');
	  _this.userid=userid;
  },
  methods: {
	  addP:function()
	  {
		  var _this = this;
		  console.log(_this.number, _this.date, _this.location, _this.meters, _this.kg, _this.url)
		  if(_this.number=='' || _this.date==''|| _this.location==''|| _this.meters==''|| _this.kg==''|| _this.url=='')
		  {
		  	alert("All information cannot be empty")
		  	return;
		  }
		  var param = {
		  	'number': _this.number,
		  	'date': _this.date,
		  	'location': _this.location,
		  	'meters':_this.meters,
			'title':_this.title,
			'message':_this.message,
		  	'kg': _this.kg,
		  	'url': _this.url,
			'userid': _this.userid
		  }
		  $.ajax({
				type : "post",
				url : "/addP", 
				data:param,
				success : function(data) {// add posts
					if(data!='error')
					{
						alert("addP success");
						alert(data);
						location.href='/postA?pid='+data
					}else
					{
						alert("addP error")
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
			that.url = this.result
		}
		
	},
  }
});




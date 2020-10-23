

var login = new Vue({
	el: '#main',
	data: {
	  info :{
		  number: '',
		  date:'',
		  location:'',
		  title:'',
		  meters:'',
		  kg:'',
		  url:'',
		  userid:''
	  },
		lat: -25.3456376,
		lng: 131.0283911
	},
	
	mounted:function()
	{
		var _this = this;
		var userid = sessionStorage.getItem('userid');
	  _this.init();
	   // the google methods
		window.initGoogleMap = _this.initGoogleMap;
		
	},
	methods: {
		init: function () {
			var _this = this;
			var uuid = _this.getQueryVariable('pid')
			param = { 'uuid': uuid }
			$.ajax({
				type: "post",
				url: "/postA",
				data: param,
				success: function (data) {
					_this.info = JSON.parse(data)[0]
					let location = _this.info.location;
					location = location.split(',')
					console.log("check location", location);
					//lat
					_this.lat = parseFloat(location[0])
					//lng
					_this.lng = parseFloat(location[1])
					_this.initGoogleMap();
				}
			});
		},
		editP:function()
		{
			 var _this = this;
			 var uuid=_this.getQueryVariable('pid')
			 location.href="editP?pid="+uuid
		},
		getQueryVariable:function(variable)
		{
			   var query = window.location.search.substring(1);
			   var vars = query.split("&");
			   for (var i=0;i<vars.length;i++) {
					   var pair = vars[i].split("=");
					   if(pair[0] == variable){return pair[1];}
			   }
			   return(false);
		},


		initGoogleMap: function () {

		
		
			

			//key AIzaSyCUPXXeCmnYkvYxqfFwerXjnZvn1nHkVbc
			
			let _this = this;
			//var point = new google.maps.LatLng(-18.763305, 146.659496);
			console.log("See See the Numbers", _this.lat, _this.lng )
			var point = new google.maps.LatLng(_this.lat, _this.lng);

			
			var map = new google.maps.Map(
				document.getElementById('google-map'), { zoom: 8, center: point });
			
			// The marker, positioned at Uluru
			var marker = new google.maps.Marker({ position: point , map: map});
		  marker.setDraggable(true);
		},

		logout: function () {
			sessionStorage.removeItem('userInfo');
			sessionStorage.removeItem('userid')
			location.href = '/index'
		}
	}
  });
  
  //https://developers.google.com/maps/documentation/javascript/overview?authuser=1#maps_map_simple-javascript
 //https://developers.google.com/maps/documentation/javascript/examples/map-latlng-literal
  
  
var express = require('express');
var https = require('https');
var router = express.Router();

router.get('/data',function(req,res){
    var result = "";
    var url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=42.366029,-71.085838&radius=800&types=restaurant|bakery|bar|cafe&key=AIzaSyCP-j5RWqQPLnhUXt3P4RdUMVqpkz_VKxI";
    https.get(url, function(response) {
        response.on('data', function(data) {
            result += data.toString();
        });
        response.on('end', function() {
            
            res.send(result);
            res.end();
        });
    });
    
});

router.get('/',function(req,res,next){
    res.render('index');
    res.end();
});

router.post('/LatLong',function(req,res,next){
    var listType = ["restaurant|bakery|bar|cafe","school|university","subway_station|taxi_stand|train_station"];
    var listLatLong = (req.body["LatLong1"]+","+req.body["LatLong2"]).split(",");
    for (var l=0;l<listLatLong.length;l++){
        listLatLong[l]=parseFloat(listLatLong[l]);
    }

    allPlacesData = [];
    for (var m=0;m<listLatLong.length/2*listType.length;m++){
        allPlacesData.push(-1);
    }

    for (var i=0;i<listLatLong.length/2;i++){
        var latPoint = listLatLong[2*i];
        var longPoint = listLatLong[2*i+1];
        console.log(latPoint+" "+longPoint);
        for (var j=0;j<listType.length;j++){
            var currentListType = listType[j];
            var startUrl = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=";
            var key = "AIzaSyCP-j5RWqQPLnhUXt3P4RdUMVqpkz_VKxI";
            var radius = 800
            var url = startUrl+latPoint+","+longPoint+"&radius="+radius+"&types="+currentListTypelistType+"&key="+key

            https.get(url,function(response,i*listType.length+j){
                var result = [];
                response.on('data',function(data){
                    result+=data;
                })
                response.on('end',function(){
                    allPlacesData[]
                })
            })
        }
    }

    var url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location="+req.body["LatLong1"]+"&radius=800&types=restaurant|bakery|bar|cafe&key=AIzaSyCP-j5RWqQPLnhUXt3P4RdUMVqpkz_VKxI"
    https.get(url,function(response){
        var result="";
        response.on('data',function(data){
            result += data.toString()
        })
        response.on('end',function(){
            resultJSON = JSON.parse(result);
            console.log(resultJSON.results.length);
            console.log("blh");
            res.send([resultJSON.results.length]).end();
            //console.log(result);
        })
    })
})
/* GET login page. */
// router.get('/login', function(req, res) {
//   console.log(req.session.currentUser);
//   if (req.session.currentUser) {
//     res.redirect("/");
//   }
//   else {
//     res.render('login', { title: 'Login' });
//   }  
// });




module.exports = router;

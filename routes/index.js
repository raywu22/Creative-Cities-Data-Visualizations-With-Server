var express = require('express');
var https = require('https');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('index');
    res.end();
});

router.post('/LatLong',function(req,res,next){
    
    //default types
    var listType = ["restaurant|bakery|bar|cafe","school|university","subway_station|taxi_stand|train_station"];
    var listLatLong = (req.body["LatLong1"]+","+req.body["LatLong2"]).split(",");
    
    console.log(listLatLong);
    for (var l=0;l<listLatLong.length;l++){
        listLatLong[l]=parseFloat(listLatLong[l]);
    }

    allPlacesData = [];
    for (var m=0;m<listLatLong.length/2*listType.length;m++){
        allPlacesData.push(-1);
    }
    LatLongLength = listLatLong.length/2;
    typeLength = listType.length;
    for (var i=0;i<LatLongLength;i++){
        for (var j=0;j<typeLength;j++){
            var currentIndex = i*typeLength+j;
            var currentListType = listType[j]
            var startUrl = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=";
            var key = "AIzaSyCP-j5RWqQPLnhUXt3P4RdUMVqpkz_VKxI";
            var radius = 800;
            var url = startUrl+listLatLong[2*i]+","+listLatLong[2*i+1]+"&radius="+radius+"&types="+currentListType+"&key="+key;
            function indexOverrider(index){
                https.get(url,function (response){
                    makeCallBack(response,index)
                });
            }
            indexOverrider(currentIndex);
        }

    }

    function makeCallBack(response,index){
        var result="";
        response.on('data',function(data){
            result += data.toString()
        })
        response.on('end',function(){
            resultJSON = JSON.parse(result);
            allPlacesData[index]=resultJSON.results.length;
            //console.log(response);
            totalLength = LatLongLength*typeLength;
            var isFull = true;
            for (var n=0;n<allPlacesData.length;n++){
                if (allPlacesData[n]==-1){
                    isFull = false;
                }
            }
            if (isFull){
                res.send(allPlacesData).end();

            }
            //res.send([resultJSON.results.length]).end();                    
            //console.log(result);
        })
    }
})

// router.get('/data',function(req,res){
//     var result = "";
//     var url = "https://maps.googleapis.com/maps/api/place/radarsearch/json?location=42.366029,-71.085838&radius=800&types=restaurant|bakery|bar|cafe&key=AIzaSyCP-j5RWqQPLnhUXt3P4RdUMVqpkz_VKxI";
//     https.get(url, function(response) {
//         response.on('data', function(data) {
//             result += data.toString();
//         });
//         response.on('end', function() {
//             res.send(result);
//             res.end();
//         });
//     });
// });


module.exports = router;

// Put your Last.fm API key here
function initialize(){

}

var api_key = "######################";


function sendRequest () {

    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json_obj = JSON.parse(this.responseText);
            var str = JSON.stringify(json_obj,undefined,2);                                                             //uncomment in the end
            document.getElementById("name").innerHTML = "<p>"+"Artist: "+json_obj.artist["name"]+"</p>";
            link(json_obj.artist["url"]);
            document.getElementById("artist_Img").src = json_obj.artist.image[2]["#text"];
            //alert(json_obj["artist"]["image"][2]["#text"])
            document.getElementById("description").innerHTML = "<dt>"+"Summary"+"</dt>"+"<dd>"+json_obj.artist.bio["summary"]+"</dd>"+"<dt>"+"Content"+"</dt>"+"<dd>"+json_obj.artist.bio["content"]+"</dd>";
            
            topAlbums(artist);
            similarArtist(artist);
        }
    };
    xhr.send(null);
}

function link(data){
    //var a = document.createElement('a');
    var a = document.getElementById("link");
    var linkText = document.createTextNode("link to Last.fm");
    a.appendChild(linkText);
    a.title = "link to Last.fm";
    a.href = data;
   // a.appendChild(a);
}

function topAlbums (a) {

    var xhr = new XMLHttpRequest();
    var method = "artist.getTopAlbums";
    //var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+a+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json_obj1 = JSON.parse(this.responseText);
            var str = JSON.stringify(json_obj1,undefined,2);
            var list = "<p> <h4>Albums</h4></p>";
            for(var j = 0; j<json_obj1.topalbums.album.length;j++){
               var no = j+1;
                list+=
                "<p> Album: "+ no +"</p>"+
                "<p> Name: "+ json_obj1.topalbums.album[j].name + "</p>"+
                "<img src ="+ json_obj1.topalbums.album[j].image[2]["#text"]+">"
                
            }
            document.getElementById("albums").setAttribute("class", "scroll");
           document.getElementById("albums").innerHTML = list;
  
        }
    };
    xhr.send(null);
}

function similarArtist (a) {

    var xhr = new XMLHttpRequest();
    var method = "artist.getSimilar";
    //var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+a+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json_obj2 = JSON.parse(this.responseText);
            var str = JSON.stringify(json_obj2,undefined,2);
            var lst = "<p><h4> Similar Artists:  </h4></p>";
            for(var k = 0; k<json_obj2.similarartists.artist.length;k++){
               var no = k+1;
                lst+=
                
                "<p>"+no+":   "+ json_obj2.similarartists.artist[k].name + "</p>"
                
            }
            document.getElementById("output").setAttribute("class", "scroll");
           document.getElementById("output").innerHTML = lst;
  
        }
    };
    xhr.send(null);
}


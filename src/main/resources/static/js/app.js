//author JohanGarcia
var app = (function(api){
    //list of objects that contains, blueprint name, number of points of blueprint
    var bpname;
    var author;
    //public function that allows to change the name of the selected author
    function changeAuthor(){
        $("#author").text(author + "'s Blueprints");
    }

    function getBlueprintsAuthor(){
        author = $("#author-input").val();
        api.getBlueprintsByAuthor(author,blueprints);
    }

    var blueprints = function(data){
        $("#table tbody").empty();
        if (data == undefined){
            alert("Author does not exist");
            $("#author").empty();
            $("#totalPoints").text("Total points");
        }else{
            changeAuthor();
            const newdata = data.map((elemento) => {
                return{
                    name : elemento.name,
                    points: elemento.points.length
                }
            });
            newdata.map((elements) => {
                $("#table > tbody:last").append($("<tr><td>" + elements.name + "</td><td>" + elements.points.toString()+ "</td><td>" + "<button id=" + elements.name + " onclick=app.getBlueprintsAuthorAndname('"+ author + "','" + elements.name + "')>open</button>" + "</td>"));
            });
            const total = newdata.reduce((suma,{points}) => suma + points , 0);

            $("#totalPoints").text("total user points: " + total);
        }  
    }

    function getBlueprintsAuthorAndname(author,bpname){
        api.getBlueprintsAuthorAndname(author,bpname);
    }

    var canvas = function(data){
        $(document).ready(function(){
            var canvas = document.getElementById("myCanvas");
            var contexto = c.getContext("2d");
            canvas.width = canvas.witdth;
            data.points.map((element) => {
                contexto.lineTo(element.x,element.y);
            });
            contexto.fillStyle ="red";
            contexto.fill();
            contexto.strokeStyle="black";
            contexto.lineWidth=2;
            contexto.stroke();
        });
    }
    return{
        changeAuthor:changeAuthor,
        getBlueprintsAuthor:getBlueprintsAuthor,
        getBlueprintsAuthorAndname:getBlueprintsAuthorAndname
    }
})(apimock);
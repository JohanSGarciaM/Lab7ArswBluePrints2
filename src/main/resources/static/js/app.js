//author JohanGarcia
var app = (function(api){
    //list of objects that contains, blueprint name, number of points of blueprint
    var bpname;
    var author;
    var bpnames = {};
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
                $("#table > tbody:last").append($("<tr><td>" + elements.name + "</td><td>" + elements.points.toString()+ "</td><td>" + "<button id=" + elements.name + " onclick=app.getBlueprintsByNameAndAuthor('"+ author + "','" + elements.name + "')>open</button></td></tr>"));
            });
            const total = newdata.reduce((suma,{points}) => suma + points , 0);

            $("#totalPoints").text("total user points: " + total);
        }  
    }

    function getBlueprintsByNameAndAuthor(author,bpname){
        api.getBlueprintsByNameAndAuthor(author,bpname,canvas);

    }

    var canvas = function(data){
        $(document).ready(function(){   
            bpnames = data;
            var canvas = document.getElementById("myCanvas");
            var contexto = canvas.getContext("2d");
            canvas.width = canvas.width;
            
            contexto.lineWidth=3;
            contexto.strokeStyle="black";
            contexto.beginPath();
            contexto.moveTo(0,0);
            data.points.map((element) => {
                contexto.lineTo(element.x,element.y);
            });
            contexto.fillStyle ="orange";
            contexto.fill();
            contexto.stroke();
        });
    }

    function init(){
        $(document).ready(function() {
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
                if(window.PointerEvent) {
                    console.info('initialized');
                    canvas.addEventListener("pointerdown", function(event){
                    var offset = _getOffset(canvas);
                    console.log(event.pageX - offset.left);
                    bpnames.points.push({x:event.pageX - offset.left, y:event.pageY - offset.top});
                    updatecanvas(bpnames);
                    }
                    );
                }
                else {
                    console.info('initialized');
                    canvas.addEventListener("mousedown", function(event){
                    var offset = _getOffset(canvas);
                    console.log(event.pageX - offset.left);
                    bpnames.points.push({x:event.pageX - offset.left, y:event.pageY - offset.top});
                    updatecanvas(bpnames);
                }
                );
                }
            });
    }

    let updatecanvas = (data) =>{
        canvas(data);
        bpnames = data;
        
    }


    let _getOffset = function (obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while(obj = obj.offsetParent );
        return {left: offsetLeft, top: offsetTop};
    }

    function saveUpdate(){
        api.putBlueprint(bpnames);
        getBlueprintsAuthor();
    }

    function newBlueprint(){
        clearCanva();
        var name = prompt("Ingrese el Nuevo nombre del plano");
        bpnames = {
            author: author,
            name: name,
            points: []
        };
        getBlueprintsAuthor();
    }

    function clearCanva(){
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        canvas.width = canvas.width;
    }

    function deleteBlueprint(){
        api.deleteBlueprint(bpnames);
        clearCanva();
        bpnames={};
        getBlueprintsAuthor();
    }

    return{
        changeAuthor:changeAuthor,
        getBlueprintsAuthor:getBlueprintsAuthor,
        getBlueprintsByNameAndAuthor:getBlueprintsByNameAndAuthor,
        init:init,
        saveUpdate:saveUpdate,
        newBlueprint:newBlueprint,
        clearCanva:clearCanva,
        deleteBlueprint:deleteBlueprint
    }
})(apimock);
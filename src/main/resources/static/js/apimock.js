//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];


	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":150,"y":150},{"x":300,"y":75}],"name":"house2"},
	{author:"maryweyland","points":[{"x":150,"y":0},{"x":150,"y":150}],"name":"life"},
	 {author:"maryweyland","points":[{"x":0,"y":75},{"x":150,"y":75}],"name":"gear2"}];

	mockdata["johan"]= [{author:"johan","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house3"},
	{author:"johan","points":[{"x":150,"y":75},{"x":300,"y":0}],"name":"gear3"}];

	mockdata["sebastian"]= [{author:"sebastian","points":[{"x":130,"y":110},{"x":123,"y":125}],"name":"house4"},
	{author:"sebastian","points":[{"x":320,"y":140},{"x":152,"y":210}],"name":"gear4"}];

	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}	

})();


/*Example of use:

var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/
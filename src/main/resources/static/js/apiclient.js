//author johan

apiclient=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];
	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":190,"y":10},{"x":205,"y":195}],"name":"car"},
     {author:"johnconnor","points":[{"x":890,"y":240},{"x":150,"y":21}],"name":"engine"}];
    mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":14,"y":160},{"x":125,"y":115}],"name":"house2"},
     {author:"maryweyland","points":[{"x":240,"y":840},{"x":105,"y":11}],"name":"engine2"}];

	return {
		getBlueprintsByAuthor:function(authname,callback){
			$.get(`http://localhost:8080/blueprints/${authname}`, function(data) {callback(data)});
		},
		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            $.get(`http://localhost:8080/blueprints/${authname}/${bpname}`, function(data) {callback(data)});
		}
	}

})();

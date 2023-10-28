//author johan

apiclient=(function(){

	

	return {
		getBlueprintsByAuthor:function(authname,callback){
			$.get(`http://localhost:8080/blueprints/${authname}`, function(data) {callback(data)});
		},
		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
            $.get(`http://localhost:8080/blueprints/${authname}/${bpname}`, function(data) {callback(data)});
		},
		putBlueprint:function(blueprint){
			return $.ajax({
				url: `http://localhost:8080/blueprints/${blueprint.author}/${blueprint.name}`,
				type: 'PUT',
				data : JSON.stringify(blueprint),
				contentType: "application/json"
			});
		},
		deleteBlueprint:function(blueprint){
		    return $.ajax({
               url: `http://localhost:8080/blueprints/${blueprint.author}/${blueprint.name}`,
               type: 'DELETE',
               data: JSON.stringify(blueprint),
               contentType: "application/json"
           });
		}
		
	}

})();

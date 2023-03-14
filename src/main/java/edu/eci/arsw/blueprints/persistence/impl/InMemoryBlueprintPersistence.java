/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */

@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new HashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
    	
    	//First Blueprint with "_authorname_" 
    	
        Point[] pts1=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp1=new Blueprint("_authorname_", "_bpname_ ",pts1);
        blueprints.put(new Tuple<>(bp1.getAuthor(),bp1.getName()), bp1);
        
        //Second Blueprint with "_authorname_" same as first one
        Point[] pts2=new Point[]{new Point(150, 150),new Point(110, 120)};
        Blueprint bp2=new Blueprint("_authorname_", "_bpname_ ",pts2);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
        
        //Third Blueprint with diferent authorname: "_dauthorname_"
        Point[] pts3=new Point[]{new Point(130, 130),new Point(120, 110)};
        Blueprint bp3=new Blueprint("_dauthorname_", "_bpname_ ",pts3);
        blueprints.put(new Tuple<>(bp3.getAuthor(),bp3.getName()), bp3);
    }    
    
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
    	if(blueprints.containsKey(new Tuple<>(author, bprintname))) {
    		return blueprints.get(new Tuple<>(author,bprintname));
    	}
        throw new BlueprintNotFoundException("Blueprint does not exist");
    }

    @Override
    public Set<Blueprint> getBlueprintByAuthor(String author) throws BlueprintNotFoundException{
    	Set<Blueprint> blueprintSet = new HashSet<>();
    	for(Map.Entry<Tuple<String,String>, Blueprint> entry : blueprints.entrySet()) {
    		if (entry.getValue().getAuthor().equals(author)) {
    			blueprintSet.add(entry.getValue());
    		}
    	}
    	if(blueprintSet.size()>0){
    		return blueprintSet;
    	}else {
    		throw new BlueprintNotFoundException("Author has no blueprints");
    	}
    }
    
    @Override
    public HashSet<Blueprint> getBlueprints(){
    	return new HashSet<Blueprint>(blueprints.values());
    }
    
    
}

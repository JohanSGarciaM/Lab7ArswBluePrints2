package edu.eci.arsw.blueprints.persistence.filters;


import java.util.ArrayList;

import org.springframework.stereotype.Service;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.model.Blueprint;

@Service
public class FilterSubsampling implements FiltersPersistence {

	@Override
	public Blueprint filter(Blueprint blueprint) {
		// TODO Auto-genePoint method stub
		ArrayList<Point> pts = new ArrayList<Point>();
		for (int i = 0; i < blueprint.getPoints().size() ; i++) {
			if(i%2!=0) {
				pts.add(blueprint.getPoints().get(i));
			}
		}
		Point[] points = pts.toArray(new Point[0]);
		return new Blueprint(blueprint.getName(),blueprint.getAuthor(),points);
	}
 
}

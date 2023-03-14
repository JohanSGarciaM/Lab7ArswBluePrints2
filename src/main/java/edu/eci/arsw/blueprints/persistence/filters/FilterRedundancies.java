package edu.eci.arsw.blueprints.persistence.filters;

import edu.eci.arsw.blueprints.model.*;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import edu.eci.arsw.blueprints.model.Blueprint;


public class FilterRedundancies implements FiltersPersistence {

	@Override
	public Blueprint filter(Blueprint blueprint) {
		// TODO Auto-generated method stub
		ArrayList<Point> pts=new ArrayList<Point>();
		Point flag = blueprint.getPoints().get(0);
		pts.add(flag);
		for (Point i: blueprint.getPoints()) {
			if ((i.getX()==flag.getX())&& (i.getY()==flag.getY())){
			}else {
				pts.add(i);
			}
			flag=i;
		}
		Point[] points = pts.toArray(new Point[0]);
		return new Blueprint(blueprint.getAuthor(), blueprint.getName(), points);
	}

}

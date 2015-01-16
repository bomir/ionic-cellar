package cellar.server

import grails.rest.*

@Resource(uri='/wines', formats=['json'])
class Wine implements Serializable{
	
	String _id
	String name;
	String country;
	String region;
	String description;
	String picture;
	String grapes;
	Integer year;

    static constraints = {
		name nullable:true
		country nullable:true
		region nullable:true
		description nullable:true
		picture	nullable:true
		grapes	nullable:true
		year	nullable:true
    }
	
	static mapping = {
		id name: "_id",generator:"uuid"
	}
	
}

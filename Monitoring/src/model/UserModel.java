package model;

public class UserModel {

	/**
	 * @param args
	 */
	String userid ;
    String password ;
    
    public UserModel(String username,String password){
    	this.userid=username;
    	this.password=password;
    }
    
    public void setUserId(String username){
    	this.userid = username;
    }
    
    public void setPassword(String password){
    	this.password = password;
    }

	public String getUserId() {
        return userid;
    }
        
    public String getPassword() {
        return password;
    }
        
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	}
}

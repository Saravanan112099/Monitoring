package utils;

import java.io.InputStream;
import java.sql.BatchUpdateException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import utils.*;

public class QueryExecuter {
	static final String JDBC_DRIVER =Utils.getPropertyValues("JDBC_DRIVER_NAME");
    static final String DB_URL = Utils.getPropertyValues("DB_URL");
    //  Database credentials
    static final String USER = Utils.getPropertyValues("USER_NAME");
    static final String PASS = Utils.getPropertyValues("PASSWORD");
    
    
    public String getDefectDetails(String defect_id) throws SQLException {
        Connection conn = null;
        Statement smt = null;
        String dbOut = null;
        try {
            Class.forName(JDBC_DRIVER);

            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql_select = null;
//            String sql_select = "SELECT array_to_json(array_agg(ms_defect)) FROM ms_defect where user_id = '" + userId + "' ";
//            String sql_select = "select array_to_json(array_agg(row_to_json(t))) from (select * from ms_defect order by modified_dt desc) t";
            if(defect_id == null){
            	sql_select = "select array_to_json(array_agg(row_to_json(t)))"
                        + "from ("
                        + "  select ms_defect.*,"
                        + "    ("
                        + "      select array_to_json(array_agg(row_to_json(d)))"
                        + "      from ("
                        + "        select attachment_id,attachment_name,created_dt"
                        + "        from ms_defect_attachment"
                        + "        where defect_id = ms_defect.defect_id"
                        + "      ) d"
                        + "    ) as attachments,"
                        + "     ("
                        + "       select array_to_json(array_agg(row_to_json(e)))"
                        + "       from ("
                        + "           select comment_id,comment,created_by,created_dt"
                        + "           from ms_defect_comments"
                        + "           where defect_id = ms_defect.defect_id ORDER BY created_dt DESC"
                        + "       ) e"
                        + "   ) as comments"
                        + "  from ms_defect ORDER BY modified_dt DESC"
                        + ") t";
            }else{
            	sql_select = "select row_to_json(t)"
                        + "from ("
                        + "  select ms_defect.*,"
                        + "    ("
                        + "      select array_to_json(array_agg(row_to_json(d)))"
                        + "      from ("
                        + "        select attachment_id,attachment_name,created_dt"
                        + "        from ms_defect_attachment"
                        + "        where defect_id = ms_defect.defect_id"
                        + "      ) d"
                        + "    ) as attachments,"
                        + "     ("
                        + "       select array_to_json(array_agg(row_to_json(e)))"
                        + "       from ("
                        + "           select comment_id,comment,created_by,created_dt"
                        + "           from ms_defect_comments"
                        + "           where defect_id = ms_defect.defect_id ORDER BY created_dt DESC"
                        + "       ) e"
                        + "   ) as comments"
                        + "  from ms_defect where defect_id = "+defect_id+""
                        + ") t";
            }
            
            try {
                smt = conn.createStatement();
                ResultSet rs = smt.executeQuery(sql_select);
                while (rs.next()) {
//                    System.out.print(rs.getObject(1));
                    dbOut = rs.getObject(1).toString();
                }
                rs.close();
                smt.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            conn.close();
        }//end try
        return dbOut;
    }

    public void updateDefect(String colName,String defectId,String newValue) throws SQLException {
    	Connection conn = null;
        Statement smt = null;
        Statement smt1 = null;
//        String dbOut = null;
        try {
            Class.forName(JDBC_DRIVER);

            conn = DriverManager.getConnection(DB_URL, USER, PASS);

//            String sql_select = "SELECT array_to_json(array_agg(ms_defect)) FROM ms_defect where user_id = '" + userId + "' ";
            String sql = "UPDATE ms_defect SET "+colName+" = '"+newValue+"' , modified_dt = "+System.currentTimeMillis()/1000+" WHERE defect_id = "+defectId+"";
//            System.out.println("Query : "+ sql);
            try {
                smt = conn.createStatement();
                smt.execute(sql);
                System.out.println("Defect Updated");
//                try{
//            		int peramCount = 10;
//            		String parameter[] = new String[peramCount];
//            		String query = "SELECT defect_id,module,component,created_dt,subject,description,status,user_nm,tenant_nm,deliver_dt FROM ms_defect WHERE defect_id = "+defectId+"";
//            		smt1 = conn.createStatement();
//                    ResultSet rs = smt1.executeQuery(query);
//                    while(rs.next()) {
//                        for(int i=1;i<peramCount+1;i++) {
//                            System.out.print(rs.getObject(i) + "     ");
//                            parameter[i-1] = (rs.getObject(i) == null) ? "-" : (rs.getObject(i)).toString()  ;
//                        }
//                    }
//                    try{
//                    	String subject = null;
//                    	String updateDet = null;
//                    	String deliverDate = (parameter[9] == "-") ? "" : Utils.convertTime(parameter[9]);
//                    	if(colName.equals("status")){
//                    		subject = "Your Defect Status has been Updated to \""+parameter[6]+"\"";
//                    		updateDet = "\tStatus : "+parameter[6]+"\n";
//                    	}else if(colName.equals("deliver_dt")){
//                    		subject = "Your Defect Deliver Date has been Updated";
//                    		updateDet = "\tStatus : "+parameter[6]+"\n";
//                    	}
//                    	String toMail = "saravanan.p@bahwancybertek.com";
//                		String desc = "DEFECT DETAILS : \n"
//                						+ "\tID : "+parameter[0]+"\n"
//                						+ "\tDefect Window : "+parameter[1]+"\n"
//                						+ "\tDefect Module : "+parameter[2]+"\n"
//                						+ "\tSubmitted Date : "+Utils.convertTime(parameter[3])+"\n"
//                						+ updateDet
//                						+ "\n"
//                						+ "TITLE :\n"
//                						+ "\t"+parameter[4]+"\n"
//                						+ "\n"
//                						+ "DESCRIPTION : \n"
//                						+ "\t"+parameter[5]+"\n"
//                						+ "\n";
////                						+ "COMMENTS : \n"
////                						+ "\t"+parameter[6]+"";
////                		Utils.sendMail(toMail, subject, desc);
//                		toMail = "saravanan.p@bahwancybertek.com";
//                		if(colName.equals("status")){
//                			subject = "Defect ID "+parameter[0]+" Status Updated to \""+parameter[6]+"\"";
//                		}else if(colName.equals("deliver_dt")){
//                			subject = "Defect ID "+parameter[0]+" Deliver Date Updated to "+deliverDate+"";
//                		}
//                		
//                		desc = "DEFECT DETAILS : \n"
//        						+ "\tID : "+parameter[0]+"\n"
//        						+ "\tDefect Window : "+parameter[1]+"\n"
//        						+ "\tDefect Module : "+parameter[2]+"\n"
//        						+ "\tSubmitted Date : "+Utils.convertTime(parameter[3])+"\n"
//        						+ "\tUser Name : "+parameter[7]+"\n"
//        						+ "\tTenant Name : "+parameter[8]+"\n"
//        						+ updateDet
//        						+ "\n"
//        						+ "TITLE :\n"
//        						+ "\t"+parameter[4]+"\n"
//        						+ "\n"
//        						+ "DESCRIPTION : \n"
//        						+ "\t"+parameter[5]+"\n"
//        						+ "\n";
////        						+ "COMMENTS : \n"
////        						+ "\t"+parameter[6]+"";
////        		Utils.sendMail(toMail, subject, desc);
//                    }catch(Exception e){
//                    	e.printStackTrace();
//                    }
//            	}catch(Exception ex){
//            		ex.printStackTrace();
//            	}finally{
//            		smt1.close();
//            	}
            } catch (Exception e) {
                e.printStackTrace();
            }finally{
            	smt.close();
            }
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            conn.close();
        }//end try
    }
    
	public static void main(String[] args) throws SQLException {
		// TODO Auto-generated method stub
//		QueryExecuter qa = new QueryExecuter();
//		System.out.println(qa.getDefectDetails());
//		String un = utils.Utils.getPropertyValues("userid");
//		String ps = utils.Utils.getPropertyValues("password");
//		ArrayList<String> userlist = new ArrayList<String>();
//		ArrayList<String> passlist = new ArrayList<String>();
//		for(String i : utils.Utils.getPropertyValues("userid").split(",")) {
//			userlist.add(i);
//		}
//		for(String i : utils.Utils.getPropertyValues("password").split(",")) {
//			passlist.add(i);
//		}
////		utils.Utils.getPropertyValues("userid");
//		int unIndex = userlist.indexOf("Girish");
//		int passIndex = passlist.indexOf("Pass@123");
//		if(unIndex != -1 && passIndex != -1 && passlist.get(unIndex).equals("Pass@123")){
////			System.out.println(utils.Utils.getPropertyValues("userid"));
//			System.out.println("Valid User");
//			System.out.println(passlist.get(unIndex));
//		}else{
//			System.out.println("InValid User");
//		}
//		System.out.println(passlist.get(unIndex));
//		
	}

	public String insert(HashMap<String, String> form_fields, HashMap<String, InputStream> file_items) throws Exception {
//    public String insert() throws SQLException {
        Connection conn = null;
        Statement smt = null;
        PreparedStatement pstmt = null;
//        PreparedStatement ps = null;
        String[] returnId = {"defect_id"};

//        String userId = null;
        String userName = null;
//        String tenantId = null;
        String tenantName = null;
        String defectModule = null;
        String defectComponent = null;
        String defectSubject = null;
        String defectDescription = null;
        String recordId = "";
        String dbOut = null;
        try {
//            userId = form_fields.get("userId");
            userName = form_fields.get("userName");
//            tenantId = form_fields.get("tenantId");
            tenantName = form_fields.get("defectTenantName");
            defectModule = form_fields.get("defectModule");
            defectComponent = form_fields.get("defectComponent");
            defectSubject = form_fields.get("defectSubject");
            defectDescription = form_fields.get("defectDescription");

//            System.out.println("Subject");
//            System.out.println("--------------------");
//            System.out.println(defectSubject);
//            System.out.println("--------------------");
//            System.out.println();
//            System.out.println("Description");
//            System.out.println("--------------------");
//            System.out.println(defectDescription);
//            System.out.println("--------------------");
//            System.out.println(userName);
//            System.out.println(tenantId);
//            System.out.println(tenantName);
//            System.out.println(defectModule);
//            System.out.println(defectComponent);
//            System.out.println(defectSubject);
//            System.out.println(defectDescription);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        try {
            //STEP 2: Register JDBC driver
            Class.forName(JDBC_DRIVER);
            //STEP 3: Open a connection
//            System.out.println("Connecting to a selected database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            String sql_insert_defect = "INSERT INTO ms_defect(user_id,user_nm,tenant_id,tenant_nm,module,component,subject,description)"
//                    + "values ((SELECT user_id from ms_user WHERE user_name = ?),"
            		+ "values (1,"
                    + "?,"
//                    + "(SELECT tenant_id from ms_user WHERE user_name = ?),"
					+ "(select tenant_id from ms_tenant where tenant_nm = ?),"
                    + "?,"
                    + "?,?,?,?)";

            pstmt = conn.prepareStatement(sql_insert_defect, returnId);
//            pstmt.setString(1, userName);
            pstmt.setString(1, userName);
            pstmt.setString(2, tenantName);
            pstmt.setString(3, tenantName);
            pstmt.setString(4, defectModule);
            pstmt.setString(5, defectComponent);
            pstmt.setString(6, defectSubject);
            pstmt.setString(7, defectDescription);
//            System.out.println("--------------------");
//            System.out.println(pstmt);
//            System.out.println("--------------------");
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Failed : No rows affected.");
            }
            try (ResultSet rs = pstmt.getGeneratedKeys()) {
                if (rs.next()) {
                    recordId = rs.getString(1);
                    System.out.println(recordId);
                }
                rs.close();
            } finally {
                pstmt.close();
            }
            if (recordId != null || recordId != "") {
                try {
                    String sql_insert_attachments = "INSERT INTO ms_defect_attachment(defect_id,attachment,attachment_name) VALUES (?,?,?)";
                    pstmt = conn.prepareStatement(sql_insert_attachments);
                    pstmt.setInt(1, Integer.parseInt(recordId));
                    int i = 2;
                    int file_index = 2;
                    int file_name_index = 7;
//                System.out.println("------------------");
                    for (Map.Entry<String, InputStream> entry : file_items.entrySet()) {
                        pstmt.setBinaryStream(2, entry.getValue());
                        pstmt.setString(3, entry.getKey());
                        pstmt.addBatch();
                    }
                    pstmt.executeBatch();
                    System.out.println("Attachments Inserted...");
                } catch (BatchUpdateException e) {
                    throw e.getNextException();
                } catch (Exception ex) {
                    ex.printStackTrace();
                } finally {
                    pstmt.close();
                }

            }
            System.out.println("Inserted Ticket into the table...");
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
            throw se;
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
            throw e;
        } finally {
            conn.close();
        }//end try
        return dbOut;
    }
	
	public JsonObject getComboDetails() throws SQLException{
//		System.out.println("Got Request for get ComboDetails");
		Connection conn = null;
		Statement smt = null;
		String modules = null;
		String components = null;
		JsonObject obj = new JsonObject();
		
		
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			// String sql_select = "SELECT array_to_json(array_agg(ms_defect))
			// FROM ms_defect where user_id = '" + userId + "' ";
			String sql_select = "select array_to_json(array_agg(row_to_json(d))) from (select distinct(module) from ms_defect) d";
			try {
				smt = conn.createStatement();
				ResultSet rs = smt.executeQuery(sql_select);
				while (rs.next()) {
					// System.out.print(rs.getObject(1));
					modules = rs.getObject(1).toString();
				}
//				System.out.println(modules);
				obj.add("module", (new JsonParser()).parse(modules).getAsJsonArray());
				rs.close();
				smt.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			sql_select = "select array_to_json(array_agg(row_to_json(d))) from (select distinct(component) from ms_defect) d";
			try {
				smt = conn.createStatement();
				ResultSet rs = smt.executeQuery(sql_select);
				while (rs.next()) {
					// System.out.print(rs.getObject(1));
					components = rs.getObject(1).toString();
				}
//				System.out.println(components);
				obj.add("component", (new JsonParser()).parse(components).getAsJsonArray());
				rs.close();
				smt.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			sql_select = "select array_to_json(array_agg(row_to_json(d))) from (select distinct(tenant_nm) as tenantname from ms_tenant) d";
			try {
				smt = conn.createStatement();
				ResultSet rs = smt.executeQuery(sql_select);
				while (rs.next()) {
					// System.out.print(rs.getObject(1));
					components = rs.getObject(1).toString();
				}
//				System.out.println(components);
				obj.add("tenantname", (new JsonParser()).parse(components).getAsJsonArray());
				rs.close();
				smt.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			sql_select = "select array_to_json(array_agg(row_to_json(d))) from (select distinct(assigned_to) as assigned_to from ms_defect) d";
			try {
				smt = conn.createStatement();
				ResultSet rs = smt.executeQuery(sql_select);
				while (rs.next()) {
					// System.out.print(rs.getObject(1));
					components = rs.getObject(1).toString();
				}
//				System.out.println(components);
				obj.add("assigned_to", (new JsonParser()).parse(components).getAsJsonArray());
				rs.close();
				smt.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (SQLException se) {
			// Handle errors for JDBC
			se.printStackTrace();
		} catch (Exception e) {
			// Handle errors for Class.forName
			e.printStackTrace();
		} finally {
			conn.close();
		} // end try
//		System.out.println("Request for get ComboDetails is Done");
//		System.out.println(obj.toString());
		return obj;
	}
	
	public String insertComments(String defectId,String sendBy, String comments) throws SQLException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        String recordId = "";
        String dbOut = null;
//        System.out.println(defectId);
//        int defect_Id = Integer.parseInt(defectId);
        try {
            Class.forName(JDBC_DRIVER);
//            System.out.println("Connecting to a selected database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
//            System.out.println("Connected database successfully...");
//            System.out.println("Inserting records into the table...");
            String[] returnId = {"comment_id"};
//            String sql_insert = "INSERT INTO ms_defect_comments(defect_id,comment,created_by) VALUES ("
//                    + "	'" + defectId + "',"
//                    + "	'" + comments + "',"
//                    + "	(SELECT user_nm from ms_defect where ms_defect.defect_id = '" + defectId + "')"
//                    + "	)";
            String sql_insert = "INSERT INTO ms_defect_comments(defect_id,comment,created_by) VALUES ("
                    + "	?,"
                    + "	?,"
                    + "?"
//                    + "	(SELECT user_nm from ms_defect where ms_defect.defect_id = ?)"
                    + "	)";
            int affectedRows = 0;
            try {
                pstmt = conn.prepareStatement(sql_insert, returnId);
                pstmt.setInt(1, Integer.parseInt(defectId));
                pstmt.setString(2, comments);
                pstmt.setString(3, sendBy);
//                pstmt.setInt(3, Integer.parseInt(defectId));
                affectedRows = pstmt.executeUpdate();
            } catch (Exception ex) {
                ex.printStackTrace();
            }

            if (affectedRows == 0) {
                throw new SQLException("Failed : No rows affected.");
            }
            try (ResultSet rs = pstmt.getGeneratedKeys()) {
                if (rs.next()) {
                    recordId = rs.getString(1);
//                    System.out.println(recordId);
                }
                rs.close();
            }finally{
                pstmt.close();
            }
            if (recordId != "") {
                String qry = "select array_to_json(array_agg(row_to_json(t)))" +
                            "    from (" +
                            "      SELECT comment_id,comment,created_by,created_dt FROM ms_defect_comments WHERE defect_id= ? ORDER BY created_dt DESC" +
                            "    ) t";
                try {
                    pstmt = conn.prepareStatement(qry);
                    pstmt.setInt(1, Integer.parseInt(defectId));
                    ResultSet rs = pstmt.executeQuery();
                    while (rs.next()) {
//                    System.out.print(rs.getObject(1));
                        dbOut = rs.getObject(1).toString();
                    }
                    rs.close();
                    pstmt.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            System.out.println("Comments inserted into the table...");
//            System.out.println(dbOut);
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            conn.close();
        }
        return dbOut;
    }
	
	public InputStream getAttachment(int attachment_id) throws SQLException {
        Connection conn = null;
        Statement smt = null;
        InputStream dbOut = null;
        try {
            Class.forName(JDBC_DRIVER);
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
//            String sql_select = "SELECT array_to_json(array_agg(ms_defect)) FROM ms_defect where user_id = '" + userId + "' ";
            String sql_select = "SELECT attachment FROM ms_defect_attachment WHERE attachment_id = '" + attachment_id + "'";
            try {
                smt = conn.createStatement();
                ResultSet rs = smt.executeQuery(sql_select);
                while (rs.next()) {
//                    System.out.print(rs.getObject(1));
//                    dbOut = rs.getBinaryStream(1);
                    dbOut = rs.getBinaryStream(1);
                }
                rs.close();
                smt.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            conn.close();
        }//end try
        return dbOut;
    }

	public void update(String defectId,JsonObject updatedValues) throws SQLException {
    	Connection conn = null;
        Statement smt = null;
        PreparedStatement pstmt = null;
//        String dbOut = null;
        try {
            Class.forName(JDBC_DRIVER);
            String status = updatedValues.get("status").getAsString();
            String assigned_to = ((updatedValues.get("assigned_to").isJsonNull()) || updatedValues.get("assigned_to").getAsString().equals("")) ? "" : updatedValues.get("assigned_to").getAsString();
//            System.out.println("Priority : "+updatedValues.get("priority").toString());
//            System.out.println("Priority is NULL : "+updatedValues.get("priority").isJsonNull());
            String priority= ((updatedValues.get("priority").isJsonNull()) || updatedValues.get("priority").getAsString().equals("")) ? null : updatedValues.get("priority").getAsString();
            String category = ((updatedValues.get("category").isJsonNull()) || updatedValues.get("category").getAsString().equals("")) ? "" : updatedValues.get("category").getAsString();
            String deliver_dt = ((updatedValues.get("deliver_dt").isJsonNull()) || updatedValues.get("deliver_dt").getAsString().equals("")) ? null : updatedValues.get("deliver_dt").getAsString();
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            
            String sql = "";
//            String sql = "UPDATE ms_defect SET "+colName+" = '"+newValue+"' , modified_dt = "+System.currentTimeMillis()/1000+" WHERE defect_id = "+defectId+"";
//            System.out.println("Query : "+ sql);
//            sql = "UPDATE ms_defect SET status = '"+status+"',assigned_to = '"+assigned_to+"',priority='"+priority+"',category='"+category+"',deliver_dt = '"+deliver_dt+"', modified_dt = "+System.currentTimeMillis()/1000+" WHERE defect_id = "+defectId+"";
            sql = "UPDATE ms_defect SET status = ?,assigned_to = ?,priority=?,category=?,deliver_dt = ?, modified_dt = date_part('epoch'::text, now()) WHERE defect_id = ?";
//            System.out.println("Query : "+ sql);
//            if(!updatedValues.get("status").getAsString().equals("") && !updatedValues.get("deliver_dt").getAsString().equals("")){
//				System.out.println("Status & Deliver_dt Modified");
//				sql = "UPDATE ms_defect SET status = '"+updatedValues.get("status").getAsString()+"',deliver_dt = '"+updatedValues.get("deliver_dt").getAsString()+"', modified_dt = "+System.currentTimeMillis()/1000+" WHERE defect_id = "+defectId+"";
//			}else if(!updatedValues.get("status").getAsString().equals("")){
//				sql = "UPDATE ms_defect SET status = '"+updatedValues.get("status").getAsString()+"', modified_dt = "+System.currentTimeMillis()/1000+" WHERE defect_id = "+defectId+"";
//				System.out.println("Status Modified");
//			}else if(!updatedValues.get("deliver_dt").getAsString().equals("")){
//				sql = "UPDATE ms_defect SET deliver_dt = '"+updatedValues.get("deliver_dt").getAsString()+"', modified_dt = "+System.currentTimeMillis()/1000+" WHERE defect_id = "+defectId+"";
//				System.out.println("Deliver date Modified");
//			}
            try {
            	pstmt = conn.prepareStatement(sql);
            	pstmt.setString(1, status);
            	pstmt.setString(2, assigned_to);
            	if(priority == null){
            		pstmt.setNull(3, java.sql.Types.INTEGER);
            	}else{
            		pstmt.setInt(3, Integer.parseInt(priority));
            	}
            	
            	pstmt.setString(4, category);
            	if(deliver_dt == null){
            		pstmt.setNull(5, java.sql.Types.BIGINT);
            	}else{
            		pstmt.setLong(5, Long.parseLong(deliver_dt));
            	}
            	
            	pstmt.setInt(6, Integer.parseInt(defectId));
            	pstmt.execute();
                System.out.println("Defect Updated");
            } catch (Exception e) {
                e.printStackTrace();
//                throw e;
                
            }finally{
            	pstmt.close();
            }
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            conn.close();
        }//end try
    }
}

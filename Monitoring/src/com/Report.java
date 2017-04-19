package com;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.UserModel;
import resources.*;
import utils.CustomException;
import utils.Utils;

import com.google.gson.JsonObject;

/**
 * Servlet implementation class Report
 */
@WebServlet("/Report")
public class Report extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static final String USERNAME = utils.Utils.getPropertyValues("userid");
    static final String PASSWORD = utils.Utils.getPropertyValues("password");

    /**
     * Default constructor. 
     */
    public Report() {
        // TODO Auto-generated constructor stub
    }
    

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		RequestDispatcher rd = getServletContext().getRequestDispatcher("/index.html");
//		rd.forward(request, response);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String req_userid = null;
		String req_password = null;
		ArrayList<String> userlist = new ArrayList<String>();
		ArrayList<String> passlist = new ArrayList<String>();
		boolean login_stat = Boolean.parseBoolean(request.getParameter("loggedin"));
//		System.out.println(login_stat);
		if(!login_stat){
			req_userid = request.getParameter("username").replaceAll("^\"|\"$", "");
			req_password = request.getParameter("password").replaceAll("^\"|\"$", "");
		}	
        
		PrintWriter out = response.getWriter();
		GetAllDatas getAllDatas = null;
		try {
			getAllDatas = new GetAllDatas();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		UserModel userModel = new UserModel(req_userid,req_password);
		String username = userModel.getUserId();
		String password = userModel.getPassword();
		
		for(String i : USERNAME.split(",")) {
			userlist.add(i);
		}
		for(String i : PASSWORD.split(",")) {
			passlist.add(i);
		}
		int unIndex = userlist.indexOf(username);
		int passIndex = passlist.indexOf(password);
		System.out.println(username);
		System.out.println(password);
		System.out.println(unIndex);
		System.out.println(passIndex);
        
		response.setContentType("text/html");
                response.setHeader("Cache-control", "no-cache, no-store");
                response.setHeader("Pragma", "no-cache");
                response.setHeader("Expires", "-1");
                response.setHeader("Access-Control-Allow-Origin", "*");
                response.setHeader("Access-Control-Allow-Methods", "POST,GET");
                response.setHeader("Access-Control-Allow-Headers", "Content-Type");
                response.setHeader("Access-Control-Max-Age", "86400");
		
                JsonObject result = new JsonObject();
                        if(!login_stat){
//                                if(username.trim().equals(utils.Utils.getPropertyValues("userid")) && password.trim().equals(utils.Utils.getPropertyValues("password"))){
                        	if(unIndex != -1 && passIndex != -1 && passlist.get(unIndex).equals(password)){
        //			result.addProperty("success", true);
                                        try {
//                            result = getAllDatas.finalOutput();
        //					result.add("sysDetails",getSysData.commandOut());
        //					result.add("tenantDetails", executeRestService.getAssetsStatusCard());
                                        } catch (Exception e) {
                                                e.printStackTrace();
                                        }
                                        result.addProperty("success", true);

                                }else{
                                        result.addProperty("success", false);
                                }
                        }else{

                                try {
//                                                result = getAllDatas.finalOutput();
        //					result.add("sysDetails",getSysData.commandOut());
        //					result.add("tenantDetails", executeRestService.getAssetsStatusCard());
                                        } catch (Exception e) {
                                                e.printStackTrace();
                                        }
                                result.addProperty("success", true);
                        }

                        System.out.println(result);
                        out.println(result);
                out.close();	
                }

}

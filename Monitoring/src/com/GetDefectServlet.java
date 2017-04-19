package com;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import utils.QueryExecuter;

/**
 * Servlet implementation class GetDefectServlet
 */
@WebServlet("/GetDefectServlet")
public class GetDefectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetDefectServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		QueryExecuter qa = new QueryExecuter();
		int attachment_id = Integer.parseInt(request.getParameter("attachment_id"));
		// RequestDispatcher rd =
		// request.getRequestDispatcher("/reportUs.html");
		// rd.forward(request, response);
		//
		byte[] bytes = null;
		InputStream is = null;
		try {
			is = qa.getAttachment(attachment_id);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		response.setContentType("image/png");
		// response.setHeader("Content-Disposition", "attachment; filename=\"" +
		// file_name + "\"");

		ServletOutputStream out;
		out = response.getOutputStream();
		BufferedInputStream bin = null;
		BufferedOutputStream bout = null;
		try {
			bin = new BufferedInputStream(is);
			bout = new BufferedOutputStream(out);
			int ch = 0;
			;
			while ((ch = bin.read()) != -1) {
				bout.write(ch);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			bin.close();
			bout.close();
			out.close();
		}
//		QueryExecuter qa = new QueryExecuter();
//		try {
//			response.getWriter().write(qa.getDefectDetails());
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		QueryExecuter qa = new QueryExecuter();
		PrintWriter out = response.getWriter();
		String workFlowName = request.getParameter("workFlowName");
		System.out.println("Work Flow Name : "+workFlowName);
//		System.out.println(request.getParameter("updatedValues"));

		if(workFlowName.equals("getDefects")){
			String queryOut = null;
			try {
//				response.getWriter().write(qa.getDefectDetails());
				queryOut = qa.getDefectDetails(null);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			out.print(queryOut);
			out.close();
		}
		else if(workFlowName.equals("getComboDetails")){
			try{
				out.println(qa.getComboDetails());
				out.close();
			}catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
			}
		}else if(workFlowName.equals("updateDefect")){
			JsonObject updatedValues = (new JsonParser()).parse(request.getParameter("updatedValues")).getAsJsonObject();
//			JsonObject json_assetsStatus = (new JsonParser()).parse(assetsStatus).getAsJsonObject();
//			System.out.println("Status : "+updatedValues.get("status").toString());

//			System.out.println("Status : "+updatedValues.get("status"));
//			System.out.println("Deliver_dt : "+updatedValues.get("deliver_dt"));
//			System.out.println("Comments : "+updatedValues.get("comments"));
			try {
//				String colName = request.getParameter("colName");
				String defectId = request.getParameter("defectId");
				String sentBy = request.getParameter("sendBy");
				String status = request.getParameter("status");
				String deliver_dt = request.getParameter("deliver_dt"); 
				String comments = request.getParameter("comments");
				String subflow = request.getParameter("subflow");
				String queryOut = null;
				System.out.println("Sub Flow : "+subflow);
				if(subflow != null){
					
	//				System.out.println("Comments : "+comments);
	//				System.out.println(comments.trim().equals(""));
	//				qa.updateDefect(colName, defectId, newValue);
	//				System.out.println("defectId" +defectId);
					if(subflow.equals("WithoutCommet")){
//						System.out.println(updatedValues);
//						System.out.println(updatedValues.get("assigned_to").isJsonNull());
						qa.update(defectId, updatedValues);
						try{
							queryOut = qa.getDefectDetails(defectId);
						}catch(Exception ex){
							ex.printStackTrace();
						}
						out.print(queryOut);
						out.close();
					}else if(subflow.equals("WithCommet")){
						qa.update(defectId, updatedValues);
						if(!comments.trim().equals("")){
							qa.insertComments(defectId, sentBy, comments);
						}
						try{
							queryOut = qa.getDefectDetails(defectId);
						}catch(Exception ex){
							ex.printStackTrace();
						}
						out.print(queryOut);
						out.close();
					}else if(subflow.equals("OnlyCommet")){
						if(!comments.trim().equals("")){
							qa.insertComments(defectId, sentBy, comments);
						}
						try{
							queryOut = qa.getDefectDetails(defectId);
						}catch(Exception ex){
							ex.printStackTrace();
						}
						out.print(queryOut);
						out.close();
					}else{
//						System.out.println("{\"success\" : \"false\"}");
//						out.print("{\"success\" : \"false\"}");
//						out.close();
					}
//					if(!commStat.equals("comment only")){
//						qa.update(defectId, updatedValues);
//					}else{
//						if(!comments.trim().equals("")){
//							qa.insertComments(defectId, sentBy, comments);
//						}
//					}
				}else{
//					System.out.println("{\"success\" : \"false\"}");
//					out.print("{\"success\" : \"false\"}");
//					out.close();
				}
				
//				else{
////					System.out.println("No Comments");
//					out.print("{\"success\" : \"true\"}");
//					out.close();
//				}
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}else if(workFlowName.equals("persistComment")){
//			System.out.println("Received Request");
			String defect_id = request.getParameter("defectId");
			String sendBy = request.getParameter("sendBy");
			String comment = request.getParameter("comment");
			String queryOut = null;
			try {
				queryOut = qa.insertComments(defect_id,sendBy, comment);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			out.print(queryOut);
			out.close();
		}
	}

}

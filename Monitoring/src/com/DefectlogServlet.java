package com;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.postgresql.util.PSQLException;

import com.google.gson.JsonObject;

import utils.QueryExecuter;

/**
 * Servlet implementation class DefectlogServlet
 */
@WebServlet("/DefectlogServlet")
public class DefectlogServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private boolean isMultipart;
    private String filePath;
    private int maxFileSize = 500 * 1024;
    private int maxMemSize = 40 * 1024;
    private File file;

       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DefectlogServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		System.out.println("Server Hitted On POST Method");
		System.out.println("User Name : "+request.getParameter("defectUserName"));
		QueryExecuter queryExecutor = new QueryExecuter();
		PrintWriter out = response.getWriter();
		JsonObject res = new JsonObject();
		HashMap<String, String> form_fields = new HashMap<String, String>();
		HashMap<String, InputStream> file_items = new HashMap<String, InputStream>();
//		boolean isImage = false;
//		boolean haveImage = false;

		isMultipart = ServletFileUpload.isMultipartContent(request);
		if (isMultipart) {
			 System.out.println("Multiple Part");
			response.setContentType("text/html");
			DiskFileItemFactory factory = new DiskFileItemFactory();
			// Create a new file upload handler
			ServletFileUpload upload = new ServletFileUpload(factory);
			try {
				List fileItems = upload.parseRequest(request);
				Iterator i = fileItems.iterator();

				while (i.hasNext()) {
					FileItem fi = (FileItem) i.next();
					if (!fi.isFormField()) {
						// System.out.println("Not A Form Field");
						try {
							String contentType = fi.getContentType();
							if ((contentType.equals("image/png") || (contentType.equals("image/jpeg")))) {
//								isImage = true;
								String fileName = fi.getName();
								file_items.put(fileName, fi.getInputStream());
							}else{
								res.addProperty("failure", "true");
								res.addProperty("resultText", "Please Upload valid Image");
								out.print(res);
								throw new Error("Attachment is not an Image");
							}
							
						} catch (Exception ex) {
							ex.printStackTrace();
						}
						// pstmt.setBinaryStream(count, fi.getInputStream());
					} else {
						try {
							form_fields.put(fi.getFieldName(), fi.getString());
						} catch (Exception ex) {
							ex.printStackTrace();
						}
					}
				}
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		} else {
			System.out.println("Not Multiple Part");
		}

		try {			
			queryExecutor.insert(form_fields, file_items);
//			System.out.println("Success");
			res.addProperty("success", "true");
			res.addProperty("resultText", "Submitted");
			out.print(res);
		} catch (PSQLException ex) {
//			System.out.println("Error occured : PSQLException");
			res.addProperty("failure", "true");
			res.addProperty("resultText", "Failed");
			out.print(res);
			ex.printStackTrace();
		} catch (SQLException e) {
//			System.out.println("Error occured : SQLException");
			// TODO Auto-generated catch block
			res.addProperty("failure", "true");
			res.addProperty("resultText", "Failed");
			out.print(res);
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			res.addProperty("failure", "true");
			res.addProperty("resultText", "Failed");
			out.print(res);
			e.printStackTrace();
		}

			
	}

}

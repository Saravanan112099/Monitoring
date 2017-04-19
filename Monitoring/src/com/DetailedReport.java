/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com;

import com.bct.bpms.client.rest.RestClientApi;
import com.google.gson.JsonObject;

import resources.GetAllDatas;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import utils.CustomException;
import utils.Utils;

/**
 *
 * @author SP112099
 */
public class DetailedReport extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet DetailedReport</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet DetailedReport at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//    	System.out.println("Got Request");
		JsonObject result = new JsonObject();
		GetAllDatas getAllDatas = null;
		try {
			getAllDatas = new GetAllDatas();
		} catch (Exception e) {
			e.printStackTrace();
		}
		PrintWriter out = response.getWriter();
		try {
			result = getAllDatas.finalOutput();
			result.addProperty("success", true);
		} catch (CustomException e) {
			result.addProperty("success", false);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.println(result);
        out.close();	
//        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String t_name = request.getParameter("tenantName");
        String asset_status = request.getParameter("assetStatus");
//        System.out.println("Tenant Name :" +t_name);
        String[] userId = Utils.getPropertyValues("user_id").split(",");
        String[] userName = Utils.getPropertyValues("user_name").split(",");
        String[] tenantId = Utils.getPropertyValues("tenant_id").split(",");
        String[] tenantName = Utils.getPropertyValues("tenant_name").split(",");
        String fullName = t_name.concat("_tenant");
        String port = Utils.getPropertyValues("port");
	String ipAddress = Utils.getPropertyValues("ip");
	String restUrl = "http://" + ipAddress + ":" + port + "/bpms/rest/CueRest/invokeService/";
	RestClientApi restClientApi = new RestClientApi(restUrl);
//        System.out.println("Modified Name : " + fullName);
        int index = Arrays.asList(tenantName).indexOf(fullName);
//        System.out.println("index" + index);
//        System.out.println(tenantName);
                JsonObject a = new JsonObject();
                a.addProperty("AssetStatus",asset_status);
		a.addProperty("strUserId", Integer.parseInt(userId[index]));
		a.addProperty("roleId", 1);
		a.addProperty("OuId", 1);
		a.addProperty("strTenantId", Integer.parseInt(tenantId[index]));
		a.addProperty("strLoginTenantId", tenantName[index]);
		a.addProperty("strUserName", userName[index]);
		a.addProperty("strLoggedInUsrId", Integer.parseInt(userId[index]));
		String assetsStatus = restClientApi.executeService("cuecent_tenant", tenantName[index], "getAssetStatusSummaryDetails", a);
//		String reportExecutionStatus = restClientApi.executeService("cuecent_tenant", tenantName[index], "getReportExecutionStatus", a);
        
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");
        response.setHeader("Cache-control", "no-cache, no-store");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "-1");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST,GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");
        
        
        
//        out.print("Result Form server : "+t_Name);
        out.print(assetsStatus);
//        System.out.println("Reached Detail Report" + assetsStatus);
        out.close();
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

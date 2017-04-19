/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package utils;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.Callable;

/**
 *
 * @author SP112099
 */
public class ServletCallableTask implements Callable<JsonObject>  {
    private String servletUrl;
    
    public ServletCallableTask(String url){
        this.servletUrl = url;
    }
    
//    public JsonObject temp(){
//        
//        JsonObject json_output = new JsonObject();
//		try {
//			URL url = new URL(servletUrl);
//			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//			conn.setRequestMethod("POST");
//			conn.setRequestProperty("Content-Type", "application/json");
//			// System.out.println(conn.getResponseCode());
//
//			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//			json_output = (new JsonParser()).parse(br.readLine())
//					.getAsJsonObject();
//			conn.disconnect();
//
//		} catch (MalformedURLException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//        
//        return json_output;
//    }
    
    @Override
    public JsonObject call() throws Exception {
        
        JsonObject json_output = new JsonObject();
		try {
			URL url = new URL(servletUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			// System.out.println(conn.getResponseCode());

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			json_output = (new JsonParser()).parse(br.readLine())
					.getAsJsonObject();
			conn.disconnect();

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
        
        return json_output;
    }
    
}

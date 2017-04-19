/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package utils;

import com.google.gson.JsonObject;
import java.util.concurrent.Callable;
import resources.GetAllDatas;
import resources.GetOmanData;
import resources.Tasks;

/**
 *
 * @author SP112099
 */
public class RootCallableTask implements Callable<JsonObject> {
	private String task;
    
    
    
    public RootCallableTask(String task){
        this.task = task;  
    }
    
    @Override
    public JsonObject call() throws Exception{
        Tasks getAllDatas = new Tasks();
        GetOmanData getOmanData = new GetOmanData();
        JsonObject json = new JsonObject();
        
        if(task.equals("Get Oman Data")){
            json.add("omanData",  getOmanData.getOmanDetails());
        }
        if(task.equals("Get Other Details")){
//            json.add("otherData", getAllDatas.getUaeAndKsaServletResults(utils.Utils.getPropertyValues("uae_url"), utils.Utils.getPropertyValues("ksa_url")));
            json.add("otherData", getAllDatas.getUaeAndKsaServletResults(utils.Utils.getPropertyValues("ksa_url")));
        }
        return json;
    }
}

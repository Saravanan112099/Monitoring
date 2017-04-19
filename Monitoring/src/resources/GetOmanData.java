/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package resources;

import com.google.gson.JsonObject;
import java.io.IOException;
import utils.CustomException;

/**
 *
 * @author SP112099
 */
public class GetOmanData {
    public JsonObject getOmanDetails() throws IOException, CustomException{
      
        GetSysData getSysData = new GetSysData();
        
        JsonObject omanDetails = new JsonObject();
        
        omanDetails.add("sysDetails",getSysData.commandOut());
        omanDetails.add("tenantDetails",new Tasks().getOmanTenantDetails());
        return omanDetails;
    }
}

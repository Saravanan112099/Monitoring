package resources;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import utils.CustomException;

import com.bct.bpms.engine.util.StreamReader;
import com.google.gson.JsonArray;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;

public class GetSysData {
	/**
	 * @param args
	 */
	private static String getCommandOut(String command, String[] envp, File dir)
			throws Exception {
		Process p = Runtime.getRuntime().exec(command, envp, dir);

		InputStream is = p.getInputStream();

		byte[] out = null;
		try {
			out = StreamReader.read(is);
		} catch (Exception exp) {
			byte[] err = null;
			try {
				err = StreamReader.read(p.getErrorStream());
				throw new Exception("(1)Exit Code=" + p.waitFor() + "; Command=" + command + "  "
						+ new String(err), exp);
			} catch (Exception e) {
				throw new RuntimeException("(2)Exit Code=" + p.waitFor() + "; Command=" + command
						+ "Unable to read the output and error stream.", e);
			}
		}
		
		int exitCode = p.waitFor();
		String commandOut = new String(out);
		log("Exit Code=" + exitCode + "; CommandOut for the command '" + command + "' is =\n" + commandOut);

		return commandOut;
	}
	
	private static void log(String str) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd HH:mm:ss.SSS Z");
		String date_str = sdf.format(new Date());
		System.out.println(date_str + ": " + str);
	}

	public JsonArray commandOut() throws CustomException {
		String command = utils.Utils.getPropertyValues("sh_dir");
		String jsonString = null;
		try {
//          jsonString = "[{\"name\":\"Disk %\",\"value\":\"19\",\"details\":{\"totalDiskSpace\":\"99G\",\"availableDiskSpace\":\"81G\",\"usedDiskSpace\":\"19G\"}},{\"name\":\"Mem %\",\"value\":\"25.1204\",\"details\":{\"totalMemory\":\"15G\",\"usedMemory\":\"15G\",\"cacheMemory\":\"11G\",\"bufferMemory\":\"0G\"}},{\"name\":\"Cpu %\",\"value\":\"2.4\"}]";
			jsonString = GetSysData.getCommandOut(command, null, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
        JsonArray jsonArray = null;
		if(jsonString!=null){
			try{
				jsonArray = (new JsonParser()).parse(jsonString).getAsJsonArray();
			}catch(JsonParseException e){
				e.printStackTrace();
			}
				
		}
		return jsonArray;
	}
        
//        public JsonObject temp(String servletUrl) throws InterruptedException{
//            JsonObject json_output = new JsonObject();
//            try {
//                   URL url = new URL(servletUrl);
//                   HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//                   conn.setRequestMethod("POST");
//                   conn.setRequestProperty("Content-Type", "application/json");
////                   System.out.println(conn.getResponseCode());
//
//                   BufferedReader br = new BufferedReader(new InputStreamReader(
//                                   (conn.getInputStream())));
//
//                   json_output = (new JsonParser()).parse(br.readLine()).getAsJsonObject();
//                   conn.disconnect();
//
//             } catch (MalformedURLException e) {
//                   e.printStackTrace();
//             } catch (IOException e) {
//                   e.printStackTrace();
//            }
//        
//        Thread.sleep(10);
//        
//        return json_output;
//        }

	public static void main(String[] args) throws InterruptedException, IOException, CustomException {
		// TODO Auto-generated method stub
            GetSysData gsd = new GetSysData();
            System.out.println(gsd.commandOut());
//            uae_url = http\://uae.cuetrans.com/Monitoring/report?username\=ivms&password\=ivms
//            ksa_url = http\://ksa.cuetrans.com/Monitoring/report?username\=ivms&password\=ivms
//            System.out.println(gsd.temp("http://om-vlc.cuetrans.com/Monitoring/report?username=ivms&password=ivms"));
//            gsd.commandOut();
            
	}

}

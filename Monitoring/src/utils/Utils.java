package utils;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Utils {

	/**
	 * @param args
	 */
	
	public static String ConvertToTime(BigInteger dateTime){
		long millis = dateTime.longValue();
		Date d = new Date(millis);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+5:30"));
		String result= dateFormat.format(d);
		return result;
	}
	public static String getPropertyValues(String key) {
		String strPropValue = null;
		String propFileName = "./config.properties";
		Properties prop = new Properties();
		try {
			// if (prop == null) {
			// prop =
			InputStream inputStream = Utils.class.getClassLoader()
					.getResourceAsStream(propFileName);
			if (inputStream == null) {
				throw new FileNotFoundException("Property File" + propFileName
						+ "Not Found");
			}
			prop.load(inputStream);
			// }
			strPropValue = prop.getProperty(key);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return strPropValue;
	}
	public static void sendMail(String to,String subject,String[] parameter,String comments) throws AddressException, MessagingException{
		final String username = "sp112099";
		final String password = "Bmail@156";
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", "mail.bahwancybertek.com");
		props.put("mail.smtp.port", "587");
		String commentsCont = "";
		String deliverDt = (parameter[7] == null) ? "" : convertTime(parameter[7]);
		String priority = (parameter[8] == null) ? "" : parameter[8];
		String category= (parameter[9] == null) ? "" : parameter[9];
		String assigned_to= (parameter[10] == null) ? "" : parameter[10];
		
		if(comments != ""){
			System.out.println("Commets : "+comments);
			commentsCont = "<tr>"
					+ "<td><b>COMMENT</b></td>"
					+ "<td>"+comments+"</td>"
					+ "</tr>";
			}
		
//		String content = "TICKET DETAILS : \n"
//				+ "\tTicket ID : "+parameter[0]+"\n"
//				+ "\tWindow Name : "+parameter[1]+"\n"
//				+ "\tModule Name : "+parameter[2]+"\n"
//				+ "\tSubmitted By : "+parameter[3]+"\n"
//				+ "\tSubmitted Date : "+convertTime(parameter[4])+"\n"
//				+ "\tTenant Name : "+parameter[5]+"\n"
//				+ "\n"
//				+ "TITLE :\n"
//				+ "\t"+parameter[6]+"\n"
//				+ "\n"
//				+ "DESCRIPTION : \n"
//				+ "\t"+parameter[7]+"";
//0defect_id,1module,2component,3status,4user_nm,5tenant_nm,6created_dt,7deliver_dt,8priority,9category,10assigned_to,11subject,12description		
		String htmlContent = "<table border="+1+" cellspacing="+0+" cellpadding="+4+">"
				+ "<tr>"
					+ "<td><b>Ticket ID</b></td>"
					+ "<td>"+parameter[0]+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Window Name</b></b></td>"
					+ "<td>"+parameter[1]+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Module Name</b></td>"
					+ "<td>"+parameter[2]+"</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<tr>"
					+ "<td><b>Status</b></td>"
					+ "<td>"+parameter[3]+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Submitted By</b></td>"
					+ "<td>"+parameter[4]+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Tenant Name</td>"
					+ "<td>"+parameter[5]+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Submitted Date</b></td>"
					+ "<td>"+convertTime(parameter[6])+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Deliver Date</b></td>"
					+ "<td>"+deliverDt+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Priority</b></td>"
					+ "<td>"+priority+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Category</b></td>"
					+ "<td>"+category+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>Assigned To</b></td>"
					+ "<td>"+assigned_to+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>TITLE</b></td>"
					+ "<td>"+parameter[1]+"</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td><b>DESCRIPTION</b></td>"
					+ "<td>"+parameter[12]+"</td>"
				+ "</tr>"
				+ commentsCont
				+ "</table>";
		
//		System.out.println(htmlContent);
		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		
	//	Session session = Session.getDefaultInstance(props);
		
		Message message = new MimeMessage(session);
		message.setFrom(new InternetAddress(to));
		message.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse(to));
		message.setSubject(subject);
//		message.setText(content);
		message.setContent(htmlContent, "text/html");

		Transport.send(message);

		System.out.println("Email has been Sent");
	}
	
	public static String convertTime(String milliseconds){
		long millis = Long.parseLong(milliseconds) * 1000;
		Date d = new Date(millis);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss  zzz");
		String submittedDate= dateFormat.format(d);
		return submittedDate;
	}
	
//	private void sendEmail(String parameter) throws AddressException, javax.mail.MessagingException {
//		String[] parameterArr = parameter.split(",");
//		final String username = "our name mail username";
//		final String password = "password";
//
//		Properties props = new Properties();
//		props.put("mail.smtp.auth", "true");
//		props.put("mail.smtp.host", "mail.bahwancybertek.com");
//		props.put("mail.smtp.port", "587");
//		
//
//		Session session = Session.getInstance(props,
//				new javax.mail.Authenticator() {
//			protected PasswordAuthentication getPasswordAuthentication() {
//				return new PasswordAuthentication(username, password);
//			}
//		});
//		
//	//	Session session = Session.getDefaultInstance(props);
//		
//		Message message = new MimeMessage(session);
//		message.setFrom(new InternetAddress("emailaddress@bahwancybertek.com"));
//		message.setRecipients(Message.RecipientType.TO,
//				InternetAddress.parse("anyemailaddress@bahwancybertek.com"));
//		message.setSubject("Testing Subject");
//		message.setText("Test Message");
//
//		Transport.send(message);
//
//		System.out.println("Done");
//
//	}
	
	public static void main(String[] args) throws AddressException, MessagingException {
		// TODO Auto-generated method stub
//		final String username = "sp112099";
//		final String password = "Bmail@156";
//		
//		String subject = "Your Defect has been submitted";
//		String desc = "Hi,\n\nThank you for sumitting your defect."
//						+ "\n"
//						+ "\n"
//						+ "DEFECT DETAILS : \n"
//						+ "\tID : 1000\n"
//						+ "\tDefect Window : Reports\n"
//						+ "\tDefect Module : Asset Report Card\n"
//						+ "\tSubmitted Date : 2017/03/30 17:30:32\n"
//						+ "\n"
//						+ "TITLE :\n"
//						+ "\tDefect In Asset Report Card\n"
//						+ "\n"
//						+ "DESCRIPTION : \n"
//						+ "\tHi I found a Problem in Asset Report Card. Kindly Fix it as soon as Possible";
//		
//		Properties props = new Properties();
//		props.put("mail.smtp.auth", "true");
//		props.put("mail.smtp.host", "mail.bahwancybertek.com");
//		props.put("mail.smtp.port", "587");
//		
//
//		Session session = Session.getInstance(props,
//				new javax.mail.Authenticator() {
//			protected PasswordAuthentication getPasswordAuthentication() {
//				return new PasswordAuthentication(username, password);
//			}
//		});
//		
//		String em = "saravanan.p@bahwancybertek.com";
//	//	Session session = Session.getDefaultInstance(props);
//		
//		Message message = new MimeMessage(session);
//		message.setFrom(new InternetAddress(em));
//		message.setRecipients(Message.RecipientType.TO,
//				InternetAddress.parse(em));
//		message.setSubject(subject);
//		message.setText(desc);
//
//		Transport.send(message);
//
//		System.out.println("Done");
	}
}

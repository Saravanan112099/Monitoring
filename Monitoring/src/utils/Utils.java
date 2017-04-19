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
	public static void sendMail(String to,String subject,String content) throws AddressException, MessagingException{
		final String username = "sp112099";
		final String password = "Bmail@156";
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", "mail.bahwancybertek.com");
		props.put("mail.smtp.port", "587");
		

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
		message.setText(content);

		Transport.send(message);

		System.out.println("Email has been Sent");
	}
	
	public static String convertTime(String milliseconds){
		long millis = Long.parseLong(milliseconds) * 1000;
		Date d = new Date(millis);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss zzz");
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
		final String username = "sp112099";
		final String password = "Bmail@156";
		
		String subject = "Your Defect has been submitted";
		String desc = "Hi,\n\nThank you for sumitting your defect."
						+ "\n"
						+ "\n"
						+ "DEFECT DETAILS : \n"
						+ "\tID : 1000\n"
						+ "\tDefect Window : Reports\n"
						+ "\tDefect Module : Asset Report Card\n"
						+ "\tSubmitted Date : 2017/03/30 17:30:32\n"
						+ "\n"
						+ "TITLE :\n"
						+ "\tDefect In Asset Report Card\n"
						+ "\n"
						+ "DESCRIPTION : \n"
						+ "\tHi I found a Problem in Asset Report Card. Kindly Fix it as soon as Possible";
		
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", "mail.bahwancybertek.com");
		props.put("mail.smtp.port", "587");
		

		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		
		String em = "saravanan.p@bahwancybertek.com";
	//	Session session = Session.getDefaultInstance(props);
		
		Message message = new MimeMessage(session);
		message.setFrom(new InternetAddress(em));
		message.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse(em));
		message.setSubject(subject);
		message.setText(desc);

		Transport.send(message);

		System.out.println("Done");
	}
}

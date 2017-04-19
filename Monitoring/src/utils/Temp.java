package utils;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Temp {

	
	private void sendEmail(String parameter) throws AddressException, javax.mail.MessagingException {
		String[] parameterArr = parameter.split(",");
		final String username = "our name mail username";
		final String password = "password";

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
		message.setSubject("Testing Subject");
		message.setText("Test Message");

		Transport.send(message);

		System.out.println("Done");

	}
	public static void mail(String args[]) throws AddressException, MessagingException{
		Temp tmp = new Temp();
//		tmp.sendEmail(null);
		System.out.println("IN MAIN FUNCTION");
	}
}

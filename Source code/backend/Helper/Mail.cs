#nullable disable
using System.Net;
using System.Net.Mail;

namespace Helper;

public class Mail{
    public SmtpClient SmtpClient{ get; }
    public MailMessage Email{ get; set; }
    private System.Net.NetworkCredential _auth;

    /*
     * This contructor will set the SmtpClient, not the email message, sender, recepient
     */
    public Mail(string recepient){
        SmtpClient = new SmtpClient{
            Host = Configuration.GetConfiguration()["Mail:Server"],
            Port = int.Parse(Configuration.GetConfiguration()["Mail:Port"]),
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(Configuration.GetConfiguration()["Mail:Email"], Configuration.GetConfiguration()["Mail:Password"])
        };

        Email = new MailMessage(Configuration.GetConfiguration()["Mail:Email"], recepient);
    }


    public void Send(){
        SmtpClient.Send(Email);
    }

    public void SetMessage(string subject, string message){
        Email.Subject = subject;
        Email.Body = message;
    }
}

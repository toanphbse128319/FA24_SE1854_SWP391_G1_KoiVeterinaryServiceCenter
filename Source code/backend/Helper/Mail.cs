#nullable disable
using System.Net;
using System.Net.Mail;

namespace Helper;

public class Mail
{
    public SmtpClient SmtpClient { get; }
    public MailMessage Email { get; set; }

    /*
     * This contructor will set the SmtpClient, not the email message, sender, recepient
     */
    public Mail(string recepient)
    {
        string host = Configuration.GetConfiguration()["Mail:Server"];
        string port = Configuration.GetConfiguration()["Mail:Port"];
        string mail = Configuration.GetConfiguration()["Mail:Email"];
        string password = Configuration.GetConfiguration()["Mail:Password"];
        if( host == null || port == null || mail == null || password == null )
            throw new Exception("Missing configuration from appsetting.json");
        SmtpClient = new SmtpClient
        {
            Host = host,
            Port = int.Parse(port),
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential( mail, password )
        };

        Email = new MailMessage(mail, recepient);
    }


    public void Send()
    {
        SmtpClient.Send(Email);
    }

    public void SetHTMLMail()
    {
        Email.IsBodyHtml = true;
    }

    public void SetMessage(string subject, string message)
    {
        Email.Subject = subject;
        Email.Body = message;
    }
 }

#nullable disable
namespace Helper;
public static class Constants{

    public static class Mail{
        private static string _emailSendFailedMessage = "Unable to send mail";

        public static string EmailSendFailedMessage{
            get => _emailSendFailedMessage;
        }
    }

}

#nullable disable
namespace Helper;
public static class Constants
{

    public static class Mail
    {
        private static string _emailSendFailedMessage = "Unable to send mail";
        private static string _signUpEmailLocation = "/../Helper/Asset/signupotpemail";
        public static string EmailSendFailedMessage
        {
            get => _emailSendFailedMessage;
        }

        public static string signUpEmailLocation
        {
            get => _signUpEmailLocation;
        }
    }

    public static class Account
    {
        private static string _waitingForOTPMessage = "Waiting for OTP: ";

        public static string WaitingForOTPMessage
        {
            get => _waitingForOTPMessage;
        }
    }

}

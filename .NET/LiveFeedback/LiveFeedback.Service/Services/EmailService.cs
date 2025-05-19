using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IServices;
using MailKit.Security;
using MimeKit;
using MailKit.Net.Smtp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace LiveFeedback.Service.Services
{
    public class EmailService : IEmailService
    {
        public async Task<bool> SendEmailAsync(EmailRequest request)
        {
            var smtpServer = Environment.GetEnvironmentVariable("SMTP_SERVER");
            var port = Environment.GetEnvironmentVariable("SMTP_PORT");
            var emailUser = Environment.GetEnvironmentVariable("GOOGLE_USER_EMAIL");
            var emailPassword = Environment.GetEnvironmentVariable("GOOGLE_USER_PASSWORD");



            Console.WriteLine(emailUser);

            if (string.IsNullOrEmpty(smtpServer) || string.IsNullOrEmpty(port) ||
                string.IsNullOrEmpty(emailUser) || string.IsNullOrEmpty(emailPassword))
            {
                Console.WriteLine("❌ Missing environment variables!");
                return false;
            }

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Live Feedback", emailUser));
            emailMessage.To.Add(new MailboxAddress(request.To, request.To));
            emailMessage.Subject = request.Subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = request.IsHtml ? request.Body : null,
                TextBody = request.IsHtml ? null : request.Body
            };
            emailMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(smtpServer, int.Parse(port), SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(emailUser, emailPassword);
                    await client.SendAsync(emailMessage);
                    await client.DisconnectAsync(true);
                    Console.WriteLine("✅ Email sent successfully!");
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Email sending failed: {ex.Message}");
                    return false;
                }
            }
        }
    }
}

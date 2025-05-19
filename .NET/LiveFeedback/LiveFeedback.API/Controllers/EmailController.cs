using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LiveFeedback.API.Controllers
{

    [ApiController]
    [Route("api/email")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.To) || string.IsNullOrWhiteSpace(request.Subject) || string.IsNullOrWhiteSpace(request.Body))
            {
                return BadRequest("Invalid email request.");
            }

            bool isSent = await _emailService.SendEmailAsync(request);

            if (isSent)
                return Ok("Email sent successfully.");
            else
                return StatusCode(500, "Failed to send email.");
        }
    }

}

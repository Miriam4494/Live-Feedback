using LiveFeedback.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LiveFeedback.Core.Interfaces.IServices
{
    public interface IEmailService
    {
        public Task<bool> SendEmailAsync(EmailRequest request);

    }
}

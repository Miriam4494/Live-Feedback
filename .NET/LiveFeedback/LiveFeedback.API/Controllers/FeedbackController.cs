
using AutoMapper;
using LiveFeedback.Core.DTOs;
using LiveFeedback.API.PostModels;
using LiveFeedback.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace LiveFeedback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;
        private readonly IMapper _mapper;

        public FeedbackController(IFeedbackService feedbackService, IMapper mapper)
        {
            _feedbackService = feedbackService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<FeedbackDTO>>> GetFeedbacks()
        {
            var feedbacks = await _feedbackService.GetAllFeedbacksAsync();
            return Ok(feedbacks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FeedbackDTO>> GetFeedback(int id)
        {
            var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
            if (feedback == null) return NotFound();
            return Ok(feedback);
        }

        [HttpPost]
        //[Authorize(Roles = "User")]  
        //[Authorize(Roles = "Admin")] // רק למנהל


        public async Task<ActionResult<FeedbackDTO>> AddFeedback([FromBody] FeedbackPostModel model)
        {
            
            var feedbackDto = _mapper.Map<FeedbackDTO>(model);
            feedbackDto = await _feedbackService.AddFeedbackAsync(feedbackDto);
            if (feedbackDto == null) return BadRequest();
            return CreatedAtAction(nameof(GetFeedback), new { id = feedbackDto.Id }, feedbackDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<FeedbackDTO>> UpdateFeedback(int id, [FromBody] FeedbackPostModel model)
        {
            var feedbackDto = _mapper.Map<FeedbackDTO>(model);
            feedbackDto = await _feedbackService.UpdateFeedbackAsync(id, feedbackDto);
            if (feedbackDto == null) return NotFound();
            return Ok(feedbackDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteFeedback(int id)
        {
            var result = await _feedbackService.DeleteFeedbackAsync(id);
            if (!result) return NotFound();
            return Ok(result);
        }
    }
}



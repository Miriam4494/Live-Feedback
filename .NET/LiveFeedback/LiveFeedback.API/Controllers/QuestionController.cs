using AutoMapper;
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Interfaces.IServices;
using LiveFeedback.API.PostModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using LiveFeedback.Core.Entities;

namespace LiveFeedback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _questionService;
        private readonly IMapper _mapper;

        public QuestionController(IQuestionService questionService, IMapper mapper)
        {
            _questionService = questionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<QuestionDTO>>> GetQuestions()
        {
            var questions = await _questionService.GetAllQuestionsAsync(); 
            return Ok(questions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionDTO>> GetQuestion(int id)
        {
            var question = await _questionService.GetQuestionByIdAsync(id);
            if (question == null) return NotFound();
            return Ok(question);
        }

        [HttpPost]
        public async Task<ActionResult<QuestionDTO>> AddQuestion([FromBody] QuestionPostModel questionPostModel)
        {
            if (questionPostModel.CreatedAt == DateTime.MinValue)
            {
                questionPostModel.CreatedAt = DateTime.UtcNow;
            }
            questionPostModel.UsersUse = 0;

            var questionDto = _mapper.Map<QuestionDTO>(questionPostModel);
            questionDto = await _questionService.AddQuestionAsync(questionDto);
            if (questionDto == null) return BadRequest();
            return CreatedAtAction(nameof(GetQuestion), new { id = questionDto.Id }, questionDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<QuestionDTO>> UpdateQuestion(int id, [FromBody] QuestionPostModel questionPostModel)
        {
            var questionDto = _mapper.Map<QuestionDTO>(questionPostModel);
            questionDto = await _questionService.UpdateQuestionAsync(id, questionDto);
            if (questionDto == null) return NotFound();
            return Ok(questionDto);
        }
        [HttpPut("updateUsersUse/{id}")]
        public async Task<ActionResult<bool>> UpdateUserUse(int id)
        {
            var result = await _questionService.UpdateUserUseAsync(id);
            if (!result) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteQuestion(int id)
        {
            var result = await _questionService.DeleteQuestionAsync(id);
            if (!result) return NotFound();
            return Ok(result);
        }

        [HttpGet("title/{title}")]
        public async Task<ActionResult<IEnumerable<QuestionDTO>>> GetQuestionsByTitle(string title)
        {
            var questions = await _questionService.GetQuestionsByTitleAsync(title);
            return Ok(questions);
        }

        [HttpGet("content/{content}")]
        public async Task<ActionResult<IEnumerable<QuestionDTO>>> GetQuestionsByContent(string content)
        {
            var questions = await _questionService.GetQuestionsByContentAsync(content);
            return Ok(questions);
        }
    }
}


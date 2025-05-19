using AutoMapper;
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Interfaces.IServices;
using LiveFeedback.API.PostModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveFeedback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyImageController : ControllerBase
    {
        private readonly IMyImageService _myImageService;
        private readonly IMapper _mapper;

        public MyImageController(IMyImageService myImageService, IMapper mapper)
        {
            _myImageService = myImageService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<MyImageDTO>>> GetImages()
        {
            var images = await _myImageService.GetAllImagesAsync();
            return Ok(images);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MyImageDTO>> GetImage(int id)
        {
            var image = await _myImageService.GetImageByIdAsync(id);
            if (image == null) return NotFound();
            return Ok(image);
        }

        [HttpPost]
        public async Task<ActionResult<MyImageDTO>> AddImage([FromBody] MyImagePostModel imagePostModel)
        {
            var imageDto = _mapper.Map<MyImageDTO>(imagePostModel);
            imageDto = await _myImageService.AddImageAsync(imageDto);
            if (imageDto == null) return BadRequest();
            return CreatedAtAction(nameof(GetImage), new { id = imageDto.Id }, imageDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MyImageDTO>> UpdateImage(int id, [FromBody] MyImagePostModel imagePostModel)
        {
            var imageDto = _mapper.Map<MyImageDTO>(imagePostModel);
            imageDto = await _myImageService.UpdateImageAsync(id, imageDto);
            if (imageDto == null) return NotFound();
            return Ok(imageDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteImage(int id)
        {
            var result = await _myImageService.DeleteImageAsync(id);
            if (!result) return NotFound();
            return Ok(result);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<MyImageDTO>>> GetImagesByUserId(int userId)
        {
            var images = await _myImageService.GetImagesByUserIdAsync(userId);
            return Ok(images);
        }

        [HttpGet("question/{questionId}")]
        public async Task<ActionResult<List<MyImageDTO>>> GetImagesByQuestionId(int questionId)
        {
            var images = await _myImageService.GetImagesByQuestionIdAsync(questionId);
            return Ok(images);
        }
    }
}




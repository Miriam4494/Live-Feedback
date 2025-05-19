
using LiveFeedback.Core.Interfaces.IServices;
using LiveFeedback.API.PostModels;
using Microsoft.AspNetCore.Mvc;
using LiveFeedback.Core.DTOs;
using LiveFeedback.Data.Repositories;

namespace LiveFeedback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class S3Controller(IS3Service s3Service, IMyImageService myImageService) : ControllerBase
    {
        private readonly IS3Service _s3Service = s3Service;
        private readonly IMyImageService _myImageService = myImageService;

 
        [HttpGet("upload-url")]
        public async Task<IActionResult> GetUploadUrl([FromQuery] string fileName, [FromQuery] string contentType)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("Missing file name");

            var url = await _s3Service.GeneratePresignedUrlAsync(fileName, contentType);
            return Ok(new { url });
        }


        [HttpGet("download-url/{fileName}")]
        public async Task<IActionResult> GetDownloadUrl(string fileName)
        {
            var url = await _s3Service.GetDownloadUrlAsync(fileName);
            return Ok(new { downloadUrl = url });
        }
       
       [HttpPost("save-file")]
        public async Task<IActionResult> SaveFile([FromBody] MyImagePostModel imagePostModel)
        {
            if (imagePostModel == null || string.IsNullOrEmpty(imagePostModel.ImageUrl))
            {
                return BadRequest("Invalid file details.");
            }

            var imageDto = new MyImageDTO
            {
                ImageUrl = imagePostModel.ImageUrl,
                QuestionId= (int) imagePostModel.QuestionId,
                Name= imagePostModel.Name
            };

            var savedImage = await _myImageService.AddImageAsync(imageDto);

            return savedImage != null ? Ok(savedImage) : BadRequest("Could not save file details.");
        }
    }
}


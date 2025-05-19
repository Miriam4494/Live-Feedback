
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using LiveFeedback.Core.Interfaces.IServices;
using AutoMapper;
using LiveFeedback.Core.Interfaces.IRepositories;

namespace LiveFeedback.Service.Services
{
    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        private readonly IMyImageRepository _myImageRepository;
       
        public S3Service(IConfiguration configuration, IMyImageRepository myImageRepository)
        {
            _myImageRepository = myImageRepository;
            var accessKey = configuration["AWS:AccessKey"];
            var secretKey = configuration["AWS:SecretKey"];
            var region = configuration["AWS:Region"];
            _bucketName = configuration["AWS:BucketName"];

            if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey) ||
                string.IsNullOrEmpty(region) || string.IsNullOrEmpty(_bucketName))
            {
                throw new ArgumentException("One or more AWS environment variables are missing.");
            }

            _s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.GetBySystemName(region));
        }

        public async Task<string> GeneratePresignedUrlAsync(string fileName, string contentType)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(10),
                ContentType = contentType
            };

            return _s3Client.GetPreSignedURL(request);
        }

        public async Task<string> GetDownloadUrlAsync(string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(30)
            };

            return _s3Client.GetPreSignedURL(request);
        }
        //public async Task<string> GetDownloadUrlAsync(int imageId)
        //{
        //    // שליפת המידע על התמונה ממאגר הנתונים (תוכל לשנות לפי איך ששמרת את המידע על התמונה)
        //    var image = await _myImageRepository.GetByIdAsync(imageId);
        //    if (image == null)
        //    {
        //        throw new FileNotFoundException("Image not found");
        //    }

        //    var fileName = image.ImageUrl;  // או כל שם קובץ ששמור ב-DB (במקרה הזה שמרנו את ה-URL או שם הקובץ)

        //    // יצירת ה-URL המוקדם להורדה ב-S3
        //    var request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = _bucketName,
        //        Key = fileName,
        //        Verb = HttpVerb.GET,
        //        Expires = DateTime.UtcNow.AddMinutes(30)
        //    };

        //    return _s3Client.GetPreSignedURL(request);
        //}

    }
}

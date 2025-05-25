
using LiveFeedback.Core;
using LiveFeedback.Core.Interfaces.IRepositories;
using LiveFeedback.Core.Interfaces.IServices;
using LiveFeedback.Data;
using LiveFeedback.Data.Repositories;
using LiveFeedback.Services.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using LiveFeedback.Service.Services;
using Amazon.Runtime;
using Amazon.S3;
using System.Text.Json.Serialization;
using Amazon.Auth.AccessControlPolicy;

namespace LiveFeedback.API
{
    public class Program
    {
        public static void Main(string[] args)
        {


            DotNetEnv.Env.Load();

            var builder = WebApplication.CreateBuilder(args);
            var credentials = new BasicAWSCredentials(
                builder.Configuration["AWS:AccessKey"],
                builder.Configuration["AWS:SecretKey"]
            );
            var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]); // בדקי שהאזור נכון
            var s3Client = new AmazonS3Client(credentials, region);





            builder.Services.AddControllers()
            .AddJsonOptions(options =>
              {
                  options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                  options.JsonSerializerOptions.WriteIndented = true;
              });
            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IRoleRepository, RoleRepository>();
            builder.Services.AddScoped<IPermissionRepository, PermissionRepository>();
            builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
            builder.Services.AddScoped<IMyImageRepository, MyImageRepository>();
            builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IRoleService, RoleService>();
            builder.Services.AddScoped<IPermissionService, PermissionService>();
            builder.Services.AddScoped<IQuestionService, QuestionService>();
            builder.Services.AddScoped<IMyImageService, MyImageService>();
            builder.Services.AddScoped<IFeedbackService, FeedbackService>();
            builder.Services.AddScoped<IS3Service, S3Service>();
            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.AddSingleton<JwtService>();



            builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(MappingProfilePostModel));

            // התחברות למסד הנתונים
            builder.Services.AddDbContext<DataContext>();

            // הגדרת Swagger
            builder.Services.AddEndpointsApiExplorer();
            // builder.Services.AddSwaggerGen();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Description = "Bearer Authentication with JWT Token",
                    Type = SecuritySchemeType.Http
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
            });


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                        policy.SetIsOriginAllowed(_ => true)
                         .AllowAnyMethod().
                          AllowAnyHeader().
                          AllowCredentials()
                );

            });
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy =>
                {
                    policy.RequireRole("Admin");
                });
                options.AddPolicy("User", policy =>
                {
                    policy.RequireRole("User");
                });
            });



            //JWT***

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
            builder.Services.AddAuthorization();
            //***
            //AWS***********************************
            //var credentials = new BasicAWSCredentials(
            //    builder.Configuration["AWS:AccessKey"],
            //    builder.Configuration["AWS:SecretKey"]
            //);
            //var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]); // בדקי שהאזור נכון
            //var s3Client = new AmazonS3Client(credentials, region);
            builder.Services.AddSingleton<IAmazonS3>(s3Client);
            //***************************************
            var app = builder.Build();
            app.UseCors();
            //if (app.Environment.IsDevelopment())
            // {
            app.UseSwagger();
                app.UseSwaggerUI();
            // }
            // הפעלת CORS
            //app.UseCors("AllowAllOrigins");
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();
            app.UseAuthentication(); // לפני Authorization
            app.UseAuthorization();
            app.MapControllers();
            app.MapGet("/", () => "API is runing");
            app.Run();
        }
    }
}


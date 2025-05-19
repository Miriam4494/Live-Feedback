//using LiveFeedback.Core.DTOs;
//using LiveFeedback.Core.Entities;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using AutoMapper;


//namespace LiveFeedback.Core
//{
//    public class MappingProfile : Profile
//    {
//        public MappingProfile()
//        {
//            CreateMap<User, UserDTO>().ReverseMap();
//            CreateMap<Feedback, FeedbackDTO>().ReverseMap();
//            CreateMap<Role, RoleDTO>().ReverseMap();
//            CreateMap<Question, QuestionDTO>().ReverseMap();
//            CreateMap<Permission, PermissionDTO>().ReverseMap();
//            CreateMap<MyImage, MyImageDTO>().ReverseMap();

//            CreateMap<Question, QuestionDTO>().ReverseMap();
//    //.ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images.ToList())) 
//    //.ForMember(dest => dest.Feedbacks, opt => opt.MapFrom(src => src.Feedbacks.ToList()))
//    //.ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
//    //.ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
//    //.ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
//    //.ReverseMap();

            
//        }
//    }
//}

using System.Linq;
using AutoMapper;
using Dating.Api.DTOs;
using Dating.Api.Entities;

namespace Dating.Api.Helpers
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(des => des.PhotoUrl,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(a => a.IsMain).Url))
                .ForMember(dest => dest.Age,
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
                .ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
        }
    }
}
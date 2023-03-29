using AutoMapper;
using BookingAPI.DTOs;
using BookingAPI.Entities;

namespace BookingAPI.Profiles
{
	public class HotelProfile : Profile
	{
		public HotelProfile()
		{
            CreateMap<HotelDTO, Hotel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Standard, opt => opt.MapFrom(src => src.Standard))
                .ForMember(dest => dest.DateStart, opt => opt.MapFrom(src => src.DateEnd))
                .ForMember(dest => dest.DateStart, opt => opt.MapFrom(src => src.DateStart))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.FreePlaces, opt => opt.MapFrom(src => src.FreePlaces))
                .ForMember(dest => dest.Reservations, opt => opt.MapFrom(src => src.Reservations));

            CreateMap<Hotel, HotelDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Standard, opt => opt.MapFrom(src => src.Standard))
                .ForMember(dest => dest.DateStart, opt => opt.MapFrom(src => src.DateEnd))
                .ForMember(dest => dest.DateStart, opt => opt.MapFrom(src => src.DateStart))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.FreePlaces, opt => opt.MapFrom(src => src.FreePlaces))
                .ForMember(dest => dest.Reservations, opt => opt.MapFrom(src => src.Reservations));
        }
	}
}


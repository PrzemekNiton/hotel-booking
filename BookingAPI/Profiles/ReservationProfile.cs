using AutoMapper;
using BookingAPI.DTOs;
using BookingAPI.Entities;

namespace BookingAPI.Profiles
{
	public class ReservationProfile : Profile
	{
		public ReservationProfile()
		{
            CreateMap<ReservationDTO, Reservation>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
                .ForMember(dest => dest.HotelId, opt => opt.MapFrom(src => src.HotelId))
                .ForMember(dest => dest.DateStart, opt => opt.MapFrom(src => src.DateStart))
                .ForMember(dest => dest.DateEnd, opt => opt.MapFrom(src => src.DateEnd))
                .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
                .ForMember(dest => dest.IsPayed, opt => opt.MapFrom(src => src.IsPayed))
                .ForMember(dest => dest.Customer, opt => opt.MapFrom(src => src.Customer))
                .ForMember(dest => dest.Hotel, opt => opt.MapFrom(src => src.Hotel));

            CreateMap<Reservation, ReservationDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
                .ForMember(dest => dest.HotelId, opt => opt.MapFrom(src => src.HotelId))
                .ForMember(dest => dest.DateStart, opt => opt.MapFrom(src => src.DateStart))
                .ForMember(dest => dest.DateEnd, opt => opt.MapFrom(src => src.DateEnd))
                .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Amount))
                .ForMember(dest => dest.IsPayed, opt => opt.MapFrom(src => src.IsPayed))
                .ForMember(dest => dest.Customer, opt => opt.MapFrom(src => src.Customer))
                .ForMember(dest => dest.Hotel, opt => opt.MapFrom(src => src.Hotel));
        }
	}
}


using AutoMapper;
using Tic_Tac_Toe_API.DTOs;
using Tic_Tac_Toe_API.Models;

namespace Tic_Tac_Toe_API.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Resultado, ResultadoDTO>().ReverseMap();
        }
    }
}

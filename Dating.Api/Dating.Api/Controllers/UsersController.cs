using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Dating.Api.Data;
using Dating.Api.DTOs;
using Dating.Api.Entities;
using Dating.Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dating.Api.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetAll()
        {
            var users = await _repository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<MemberDto>> Get(int id)
        {
            var user = await _repository.GetUserByIdAsync(id);
            return Ok(_mapper.Map<MemberDto>(user));
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> Get(string username)
        {
            var user = await _repository.GetMemberAsync(username);
            return Ok(user);
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Dating.Api.DTOs;
using Dating.Api.Entities;
using Dating.Api.Helpers;
using Dating.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Dating.Api.Data
{
    public class UserRepository: IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.AppUsers.Include(a => a.Photos).ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.AppUsers.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.AppUsers.Include(a => a.Photos).SingleOrDefaultAsync(a => a.UserName == username);
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.AppUsers
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.AppUsers
                .Where(a => a.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }
    }
}
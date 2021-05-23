using Dating.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Dating.Api.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            
        }

        public DbSet<AppUser> AppUsers { get; set; }
    }
}
using System;
using System.Linq;
using System.Text;
using Dating.Api.Data;
using Dating.Api.Interfaces;
using Dating.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Dating.Api.Helpers
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration configuration, string defaultCorsPolicyName)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddDbContext<DataContext>(builder =>
            {
                builder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(options =>
            {
                options.AddPolicy(defaultCorsPolicyName, builder =>
                {
                    //App:CorsOrigins in appsettings.json can contain more than one address with splitted by comma.
                    builder
                        .WithOrigins(
                            //// App:CorsOrigins in appsettings.json can contain more than one address separated by comma.
                            configuration["AllowedOrigins"]
                                .Split(",", StringSplitOptions.RemoveEmptyEntries)
                                .Select(o => o)
                                .ToArray()
                        )
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Dating.Api", Version = "v1" });
            });
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            return services;
        }
    }

    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opts =>
                {
                    opts.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            return services;
        }
    }
}
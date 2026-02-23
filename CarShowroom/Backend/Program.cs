using CarShowroom.Context;
using CarShowroom.Services;
using Microsoft.AspNetCore.Server.Kestrel.Core;

namespace CarShowroom
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.Configure<KestrelServerOptions>(options =>
            {
                options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(5);
            });


            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "React Frontend",
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:5173")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                                  });
            });

            builder.Services.AddDbContext<DBContext>();
            builder.Services.AddScoped<ListingDTOBuilder>();
            builder.Services.AddSwaggerGen();


            var app = builder.Build();

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors("React Frontend");
            app.UseSwagger();
            app.UseSwaggerUI();

            app.MapControllers();

            app.Run();
        }
    }
}

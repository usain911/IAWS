using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;
using Swashbuckle.AspNetCore.Swagger;



namespace DataBaseAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddControllers();
                    services.AddDbContext<Models.ProjektmanagementContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ProjektmanagementDB")));

            // Register the Swagger generator, defining 1 or more Swagger documents
            // zu bearbeiten (Test URL USW)
            services.AddSwaggerGen(c =>
            {
              c.SwaggerDoc("v1", new OpenApiInfo
              {
                Version = "v1",
                Title = "ToDo API",
                Description = "A simple example ASP.NET Core Web API",
                TermsOfService = new Uri("https://example.com/terms"),
                Contact = new OpenApiContact
                {
                  Name = "Shayne Boyer",
                  Email = string.Empty,
                  Url = new Uri("https://twitter.com/spboyer"),
                },
                License = new OpenApiLicense
                {
                  Name = "Use under LICX",
                  Url = new Uri("https://example.com/license"),
                }
              });
            });

            // CORS erlauben
            services.AddCors(options =>
            {
              options.AddPolicy("EnableCORS", builder =>
              {
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
              });
            });

         }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //CORS
            app.UseCors("EnableCors");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
              c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
              // c.RoutePrefix = string.Empty;
            });

              // app.UseMvc();

  }
    }
}

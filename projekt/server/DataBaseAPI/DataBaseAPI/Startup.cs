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
using Newtonsoft.Json;

namespace DataBaseAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // Diese Methode wird von der Laufzeit aufgerufen und ermöglicht die Container Services hinzuzufügen.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddControllers();
            services.AddDbContext<Models.ProjektmanagementContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ProjektmanagementDB")));

            services.AddMvc(option => option.EnableEndpointRouting = false)
            .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
            .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

      // Hinzufügen des Swagger-Generatoren und die Definition der dazugehörigen Swagger Dokumente.
      services.AddSwaggerGen(c =>
            {
              c.SwaggerDoc("v1", new OpenApiInfo
              {
                Version = "v1",
                Title = "Swagger (Datenbankzugriff)",
                Description = "Ein einfaches Beispiel einer ASP.NET Core Web API, um auf die Daten der Datenbank zugreifen zu können.",
                TermsOfService = new Uri("https://example.com/terms"),
                Contact = new OpenApiContact
                {
                  //hinzufügen von Dokumenten im Swagger
                  Name = "Server Zugriff über IP-Adresse",
                  Email = string.Empty,
                  Url = new Uri("http://87.173.172.55:4200/"),
                },
                License = new OpenApiLicense
                {
                  Name = "OpenAPI Lizenz URL Seite",
                  Url = new Uri("https://example.com/license"),
                }
              });
            });

            // CORS erlauben
            services.AddCors();
            services.AddControllers();

    }

    // Diese Methode wird von der Laufzeit aufgerufen. Verwendung dieser Methode, um die HTTP-Request-Pipeline zu konfigurieren.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseHttpsRedirection();

            app.UseRouting();

            //CORS
            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // Anmeldedaten zulassen

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //Aktivieren der Middleware, um generierte Swagger als JSON-Endpunkt bereitzustellen.
            app.UseSwagger();

            // Middleware für Swagger-UI aktivieren (HTML, JS, CSS, usw.),um das generierte JSON-Dokument
            // und die Swagger Benutzeroberfläche bereitstellen zu können
            app.UseSwaggerUI(c =>
            {
              c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

  }
    }
}

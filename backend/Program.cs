using backend.Configurations;
using backend.Services;
var builder = WebApplication.CreateBuilder(args); //creation de l application

//la confirguration des services

//charger les parametres de configuration MongoDB a partir du fichier appsettings.json
builder.Services.Configure<MongoDBSettings>(
    builder.Configuration.GetSection("MongoDBSettings")
);

//entregistrer le service MongoDB (patterns singleton comme mon exemple d'hier )
builder.Services.AddSingleton<MongoDBService>();

// ajouter les controllers
builder.Services.AddControllers();

//configuere swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//cnfigurer le cors pour donnee l autorisation au frontend 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build(); //construire l application

//configurer le pipeline de traitement des requetes HTTP

app.UseSwagger();
app.UseSwaggerUI();
//activer le cors
app.UseCors("AllowAll");

//activer le https
app.UseHttpsRedirection();

//activer le controleur
app.MapControllers();

//demarraer l'application
app.Run();




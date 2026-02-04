using backend.Configurations;
using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace backend.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Computer> _computer;

        // constructeur de configiratioon de la base de données MongoDB
        public MongoDBService(IOptions<MongoDBSettings> settings )
        {
            // creation du client MngoDB
            var client = new MongoClient(settings.Value.ConnectionString);

            //selectionner la base de donnees
            var database = client.GetDatabase(settings.Value.DatabaseName);

            //selectionner la collection
            _computer = database.GetCollection<Computer>(settings.Value.UsersCollectionName);
        }

        //creation du pc
        public async Task CreateAsync(Computer computer)
        {
            //pour genere un id MongoDB
            computer.Id = ObjectId.GenerateNewId().ToString();
            computer.CreatedAt = DateTime.UtcNow;
            await _computer.InsertOneAsync(computer);
        }

        //recuperer tous les pc
        //await : utiliser dans les methode async pour attendre de maniere asynchrone la fin d une tache 
        public async Task<List<Computer>> GetAllAsync()
        {
            return await _computer.Find(_ => true).ToListAsync();
        }

        //recuperer un pc par id
        public async Task<Computer?> GetByIdAsync(string id)
        {
            return await _computer.Find(computer => computer.Id == id).FirstOrDefaultAsync();
        }

        //mettre a jour un pc
        public async Task UpdateAsync(string id, Computer computer)
        {
            await _computer.ReplaceOneAsync(c => c.Id == id, computer);
        }
        //supprimer un pc
        public async Task DeleteAsync(string id)
        {
            await _computer.DeleteOneAsync(c => c.Id == id);
        }


    }
}
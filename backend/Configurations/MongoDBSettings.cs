namespace backend.Configurations;

    public class MongoDBSettings
    {
        // chaine de connection à la base de données MongoDB
        public string ConnectionString { get; set; } = string.Empty;
        // le nom de la base de donnees MongoDB
        public string DatabaseName { get; set; } = string.Empty;    
        // le nom de la collection MongoDB pour les utilisateurs
        public string UsersCollectionName { get; set; } = string.Empty;
    }

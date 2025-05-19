using LiveFeedback.Core.Entities;
using Microsoft.EntityFrameworkCore;


namespace LiveFeedback.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<MyImage> MyImages { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Environment.GetEnvironmentVariable("livefeedback-DB");
            var serverVersion = ServerVersion.AutoDetect(connectionString);
            optionsBuilder.UseMySql(connectionString, serverVersion);





            //optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=LiveFeedback_db");
            //optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("livefeedback-DB"));

        }



    }
}

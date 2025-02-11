using AuthApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthApplication.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the Users table
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(u => u.UserId);
                entity.Property(u => u.UserId).HasColumnName("user_id");
                entity.Property(u => u.AadharNo).HasColumnName("aadhar_no");
                entity.Property(u => u.Address).HasColumnName("address");
                entity.Property(u => u.Email).HasColumnName("email");
                entity.Property(u => u.FirstName).HasColumnName("first_name");
                entity.Property(u => u.LastName).HasColumnName("last_name");
                entity.Property(u => u.Password).HasColumnName("password");
                entity.Property(u => u.PhoneNo).HasColumnName("phone_no");
                entity.Property(u => u.CityId).HasColumnName("city_id");
                entity.Property(u => u.AreaId).HasColumnName("area_id");
                entity.Property(u => u.RoleId).HasColumnName("role_id");

                entity.HasOne(u => u.City)
                      .WithMany()
                      .HasForeignKey(u => u.CityId);

                entity.HasOne(u => u.Area)
                      .WithMany()
                      .HasForeignKey(u => u.AreaId);

                entity.HasOne(u => u.Role)
                      .WithMany()
                      .HasForeignKey(u => u.RoleId);
            });

            // Configure the Areas table
            modelBuilder.Entity<Area>(entity =>
            {
                entity.ToTable("areas");
                entity.HasKey(a => a.AreaId);
                entity.Property(a => a.AreaId).HasColumnName("area_id");
                entity.Property(a => a.AreaName).HasColumnName("area_name");
                entity.Property(a => a.CityId).HasColumnName("city_id");

                entity.HasOne(a => a.City)
                      .WithMany()
                      .HasForeignKey(a => a.CityId);
            });

            // Configure the City table
            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("city");
                entity.HasKey(c => c.CityId);
                entity.Property(c => c.CityId).HasColumnName("city_id");
                entity.Property(c => c.CityName).HasColumnName("city_name");
            });

            // Configure the Roles table
            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");
                entity.HasKey(r => r.RoleId);
                entity.Property(r => r.RoleId).HasColumnName("role_id");
                entity.Property(r => r.RoleName).HasColumnName("role_name");
            });
        }
    }
}

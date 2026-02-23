using CarShowroom.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShowroom.Context
{
    public class DBContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                "Server=DESKTOP-U2E8NDB;Database=Car Showroom;Trusted_Connection=True;TrustServerCertificate=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1. Existing Makes Configuration
            modelBuilder.Entity<Make>()
                .ToTable("Makes", t => t.ExcludeFromMigrations());

            // 2. CarModels Configuration
            modelBuilder.Entity<CarModel>(entity =>
            {
                entity.HasIndex(c => new { c.MakerId, c.Model });
            });

            // 3. CarDetails Configuration
            modelBuilder.Entity<CarDetails>(entity =>
            {
                entity.HasKey(e => e.CarId).HasFillFactor(80);
            });

            // 4. Listings Configuration
            modelBuilder.Entity<Listing>(entity =>
            {
                entity.HasKey(e => e.ListingId);
                entity.Property(e => e.Hash)
                      .IsRequired()
                      .HasMaxLength(32);

                entity.HasIndex(e => e.Hash)
                      .IsUnique()
                      .HasFillFactor(80);
            });
        }

        public DbSet<Make> Makes => Set<Make>();
        public DbSet<CarModel> CarModels => Set<CarModel>();
        public DbSet<CarDetails> CarDetails => Set<CarDetails>();
        public DbSet<Listing> Listings => Set<Listing>();
        public DbSet<ListingImage> ListingImages => Set<ListingImage>();
        public DbSet<User> Users => Set<User>();
    }
}
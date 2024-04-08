using MelodyContext.Models;
using Microsoft.EntityFrameworkCore;

namespace MelodyContext
{
    public partial class MelodyDbContext : DbContext
    {
        public MelodyDbContext()
        {
        }

        public MelodyDbContext(DbContextOptions<MelodyDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Playlist> Playlists { get; set; }
        public virtual DbSet<PlaylistSongMapping> PlaylistSongMappings { get; set; }
        public virtual DbSet<Song> Songs { get; set; }
        public virtual DbSet<UploadLog> UploadLogs { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("ConnectionString"));
        //}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    if (!optionsBuilder.IsConfigured)
        //    {

        //        optionsBuilder.UseSqlServer("Server=tcp:lemasterworks.database.windows.net,1433;Initial Catalog=MelodyDb;Persist Security Info=False;User ID=tlemaster;Password=Lexielm2;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        //    }
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Playlist>(entity =>
            {
                entity.HasKey(e => e.PlaylistId);

                entity.ToTable("Playlist", "storage");

                entity.Property(e => e.PlaylistId)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.PlaylistDescription)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.PlaylistName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PlaylistSongMapping>(entity =>
            {
                entity.HasKey(e => e.MappingId);

                entity.ToTable("PlaylistSongMapping", "storage");

                entity.HasIndex(e => new { e.PlaylistId, e.MappingId }, "UQ_PlaylistSongMapping__PlaylistId_MappingId")
                    .IsUnique();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.PlaylistId)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.SongId)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Song>(entity =>
            {
                entity.HasKey(e => e.YouTubeId);

                entity.ToTable("Song", "storage");

                //entity.Property(e => e.YouTubeId)
                //    .HasMaxLength(150)
                //    .IsUnicode(false);

                //entity.Property(e => e.Artist)
                //    .HasMaxLength(255)
                //    .IsUnicode(false);

                //entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                //entity.Property(e => e.IsValid)
                //    .IsRequired()
                //    .HasDefaultValueSql("((1))");

                //entity.Property(e => e.SongName)
                //    .HasMaxLength(255)
                //    .IsUnicode(false);
            });

            modelBuilder.Entity<UploadLog>(entity =>
            {
                entity.HasKey(e => e.LogId);

                entity.ToTable("UploadLog", "storage");

                entity.Property(e => e.ErrorMessage)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.TimeOfError).HasColumnType("datetime");
            });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
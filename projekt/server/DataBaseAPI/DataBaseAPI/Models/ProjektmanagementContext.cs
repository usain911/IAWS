using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataBaseAPI.Models
{
    public partial class ProjektmanagementContext : DbContext
    {
        public ProjektmanagementContext()
        {
        }

        public ProjektmanagementContext(DbContextOptions<ProjektmanagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Aufgaben> Aufgaben { get; set; }
        public virtual DbSet<Kommentar> Kommentar { get; set; }
        public virtual DbSet<Nutzer> Nutzer { get; set; }
        public virtual DbSet<NutzerAufgaben> NutzerAufgaben { get; set; }
        public virtual DbSet<NutzerProjekte> NutzerProjekte { get; set; }
        public virtual DbSet<NutzerTeam> NutzerTeam { get; set; }
        public virtual DbSet<Projekte> Projekte { get; set; }
        public virtual DbSet<Teilaufgaben> Teilaufgaben { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=ubi19.informatik.uni-siegen.de;Initial Catalog=Projektmanagement;Persist Security Info=True;User ID=gruppe03-1;Password=IVA.765$");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aufgaben>(entity =>
            {
                entity.Property(e => e.AufgabenId).HasColumnName("aufgaben_id");

                entity.Property(e => e.Beschreibung)
                    .HasColumnName("beschreibung")
                    .HasMaxLength(500);

                entity.Property(e => e.Deadline).HasColumnName("deadline");

                entity.Property(e => e.Erledigt).HasColumnName("erledigt");

                entity.Property(e => e.ErstellDatum).HasColumnName("erstell_datum");

                entity.Property(e => e.ErstellerId).HasColumnName("ersteller_id");

                entity.Property(e => e.IstZeit).HasColumnName("ist_zeit");

                entity.Property(e => e.NachfolgerId).HasColumnName("nachfolger_id");

                entity.Property(e => e.ProjektId).HasColumnName("projekt_id");

                entity.Property(e => e.SollZeit).HasColumnName("soll_zeit");

                entity.Property(e => e.Titel)
                    .HasColumnName("titel")
                    .HasMaxLength(50);

                entity.Property(e => e.VorgaengerId).HasColumnName("vorgaenger_id");
            });

            modelBuilder.Entity<Kommentar>(entity =>
            {
                entity.Property(e => e.KommentarId).HasColumnName("kommentar_id");

                entity.Property(e => e.AufgabenId).HasColumnName("aufgaben_id");

                entity.Property(e => e.Erstelldatum).HasColumnName("erstelldatum");

                entity.Property(e => e.KommentarFeld)
                    .IsRequired()
                    .HasColumnName("kommentarFeld")
                    .HasMaxLength(500);

                entity.Property(e => e.NutzerId).HasColumnName("nutzer_id");

                entity.Property(e => e.TeilaufgabenId).HasColumnName("teilaufgaben_id");
            });

            modelBuilder.Entity<Nutzer>(entity =>
            {
                entity.HasKey(e => e.NutzerId)
                    .IsClustered(false);

                entity.Property(e => e.NutzerId).HasColumnName("nutzer_id");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");

                entity.Property(e => e.LetzteAnmeldung)
                    .HasColumnName("letzteAnmeldung")
                    .HasMaxLength(50);

                entity.Property(e => e.MitgliedSeit)
                    .HasColumnName("mitgliedSeit")
                    .HasMaxLength(50);

                entity.Property(e => e.Nachname)
                    .HasColumnName("nachname")
                    .HasMaxLength(50);

                entity.Property(e => e.Nutzername)
                    .HasColumnName("nutzername")
                    .HasMaxLength(50);

                entity.Property(e => e.Passwort)
                    .HasColumnName("passwort")
                    .HasMaxLength(50);

                entity.Property(e => e.Position)
                    .HasColumnName("position")
                    .HasMaxLength(50);

                entity.Property(e => e.Team)
                    .HasColumnName("team")
                    .HasMaxLength(50);

                entity.Property(e => e.Vorname)
                    .HasColumnName("vorname")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<NutzerAufgaben>(entity =>
            {
                entity.ToTable("Nutzer_Aufgaben");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AufgabenId).HasColumnName("aufgaben_id");

                entity.Property(e => e.NutzerId).HasColumnName("nutzer_id");

                entity.Property(e => e.ProjektId).HasColumnName("projekt_id");

                entity.Property(e => e.TeilaufgabenId).HasColumnName("teilaufgaben_id");

                entity.HasOne(d => d.Aufgaben)
                    .WithMany(p => p.NutzerAufgaben)
                    .HasForeignKey(d => d.AufgabenId)
                    .HasConstraintName("fk_NP_aufgaben");

                entity.HasOne(d => d.Projekt)
                    .WithMany(p => p.NutzerAufgaben)
                    .HasForeignKey(d => d.ProjektId)
                    .HasConstraintName("fk_NP_projekte");

                entity.HasOne(d => d.Teilaufgaben)
                    .WithMany(p => p.NutzerAufgaben)
                    .HasForeignKey(d => d.TeilaufgabenId)
                    .HasConstraintName("fk_NP_teilaufgaben");
            });

            modelBuilder.Entity<NutzerProjekte>(entity =>
            {
                entity.ToTable("Nutzer_Projekte");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.NutzerId).HasColumnName("nutzer_id");

                entity.Property(e => e.ProjektId).HasColumnName("projekt_id");

                entity.Property(e => e.ProjektOwner).HasColumnName("projekt_owner");

                entity.HasOne(d => d.Projekt)
                    .WithMany(p => p.NutzerProjekte)
                    .HasForeignKey(d => d.ProjektId)
                    .HasConstraintName("fk_projekte");
            });

            modelBuilder.Entity<NutzerTeam>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Nutzer_Team");

                entity.Property(e => e.NutzerId).HasColumnName("nutzer_id");

                entity.Property(e => e.NutzerTeamId)
                    .HasColumnName("nutzer_team_id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.TeamName)
                    .HasColumnName("team_name")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Projekte>(entity =>
            {
                entity.HasKey(e => e.ProjektId);

                entity.Property(e => e.ProjektId).HasColumnName("projekt_id");

                entity.Property(e => e.Bezeichnung)
                    .HasColumnName("bezeichnung")
                    .HasMaxLength(500);

                entity.Property(e => e.Erledigt).HasColumnName("erledigt");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.ProjektOwnerId).HasColumnName("projekt_owner_id");
            });

            modelBuilder.Entity<Teilaufgaben>(entity =>
            {
                entity.Property(e => e.TeilaufgabenId).HasColumnName("teilaufgaben_id");

                entity.Property(e => e.Beschreibung)
                    .HasColumnName("beschreibung")
                    .HasMaxLength(500);

                entity.Property(e => e.Deadline).HasColumnName("deadline");

                entity.Property(e => e.Erledigt).HasColumnName("erledigt");

                entity.Property(e => e.ErstellDatum).HasColumnName("erstell_datum");

                entity.Property(e => e.ErstellerId).HasColumnName("ersteller_id");

                entity.Property(e => e.IstZeit).HasColumnName("ist_zeit");

                entity.Property(e => e.NachfolgerId).HasColumnName("nachfolger_id");

                entity.Property(e => e.SollZeit).HasColumnName("soll_zeit");

                entity.Property(e => e.Titel)
                    .HasColumnName("titel")
                    .HasMaxLength(50);

                entity.Property(e => e.VorgaengerId).HasColumnName("vorgaenger_id");

                entity.Property(e => e.ZugeordnetZuAufgabe).HasColumnName("zugeordnet_zu_aufgabe");

                entity.Property(e => e.Zugewiesen).HasColumnName("zugewiesen");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

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
    public virtual DbSet<Nutzer> Nutzer { get; set; }
    public virtual DbSet<NutzerAufgaben> NutzerAufgaben { get; set; }
    public virtual DbSet<NutzerProjekte> NutzerProjekte { get; set; }
    public virtual DbSet<NutzerTeam> NutzerTeam { get; set; }
    public virtual DbSet<Projekte> Projekte { get; set; }
    public virtual DbSet<Rechte> Rechte { get; set; }
    public virtual DbSet<Teilaufgaben> Teilaufgaben { get; set; }
    public virtual DbSet<ZwischenRechteAp> ZwischenRechteAp { get; set; }

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

      modelBuilder.Entity<Nutzer>(entity =>
      {
        entity.HasKey(e => e.NutzerId)
            .IsClustered(false);

        entity.Property(e => e.NutzerId).HasColumnName("nutzer_id");

        entity.Property(e => e.Email)
            .HasColumnName("email")
            .HasMaxLength(50);

        entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");

        entity.Property(e => e.Nachname)
            .HasColumnName("nachname")
            .HasMaxLength(50);

        entity.Property(e => e.Nutzername)
            .HasColumnName("nutzername")
            .HasMaxLength(50);

        entity.Property(e => e.Passwort)
            .HasColumnName("passwort")
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

        entity.Property(e => e.TeilaufgabenId).HasColumnName("teilaufgaben_id");
      });

      modelBuilder.Entity<NutzerProjekte>(entity =>
      {
        entity.ToTable("Nutzer_Projekte");

        entity.Property(e => e.Id).HasColumnName("id");

        entity.Property(e => e.NutzerId).HasColumnName("nutzer_id");

        entity.Property(e => e.ProjektId).HasColumnName("projekt_id");

        entity.Property(e => e.ProjektOwner).HasColumnName("projekt_owner");
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

        entity.Property(e => e.Name)
            .HasColumnName("name")
            .HasMaxLength(50);

        entity.Property(e => e.ProjektOwnerId).HasColumnName("projekt_owner_id");
      });

      modelBuilder.Entity<Rechte>(entity =>
      {
        entity.Property(e => e.RechteId).HasColumnName("rechte_id");

        entity.Property(e => e.LeseZugriff).HasColumnName("leseZugriff");

        entity.Property(e => e.Ownership).HasColumnName("ownership");

        entity.Property(e => e.SchreibZugriff).HasColumnName("schreibZugriff");

        entity.Property(e => e.VerwaltungsZugriff).HasColumnName("verwaltungsZugriff");
      });

      modelBuilder.Entity<Teilaufgaben>(entity =>
      {
        entity.Property(e => e.TeilaufgabenId).HasColumnName("teilaufgaben_id");

        entity.Property(e => e.Beschreibung)
            .HasColumnName("beschreibung")
            .HasMaxLength(500);

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

      modelBuilder.Entity<ZwischenRechteAp>(entity =>
      {
        entity.HasKey(e => e.ZwischenRechteId);

        entity.ToTable("ZwischenRechteAP");

        entity.Property(e => e.ZwischenRechteId).HasColumnName("zwischenRechte_id");

        entity.Property(e => e.LeseZugriffAufgaben).HasColumnName("leseZugriff_aufgaben");

        entity.Property(e => e.LeseZugriffProjekt).HasColumnName("leseZugriff_projekt");

        entity.Property(e => e.SchreibZugriffAufgaben).HasColumnName("schreibZugriff_aufgaben");

        entity.Property(e => e.SchreibZugriffProjekt).HasColumnName("schreibZugriff_projekt");

        entity.Property(e => e.VerwaltungZugriffAufgaben).HasColumnName("verwaltungZugriff_aufgaben");

        entity.Property(e => e.VerwaltungsZugriffProjekt).HasColumnName("verwaltungsZugriff_projekt");
      });

      OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
  }
}

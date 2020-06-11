using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
  public partial class Aufgaben
  {
    public int AufgabenId { get; set; }
    public string Titel { get; set; }
    public string Beschreibung { get; set; }
    public int? ErstellerId { get; set; }
    public int? ProjektId { get; set; }
    public TimeSpan? SollZeit { get; set; }
    public TimeSpan? IstZeit { get; set; }
    public bool? Erledigt { get; set; }
    public DateTime? ErstellDatum { get; set; }
    public int? VorgaengerId { get; set; }
    public int? NachfolgerId { get; set; }
  }
}

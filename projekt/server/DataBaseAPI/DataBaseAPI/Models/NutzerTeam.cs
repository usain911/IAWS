using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class NutzerTeam
    {
        public int NutzerTeamId { get; set; }
        public int? NutzerId { get; set; }
        public string TeamName { get; set; }
    }
}

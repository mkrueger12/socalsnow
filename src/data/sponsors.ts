export type Partner = {
  name: string;
  url: string;
  tier: "Sponsor" | "Supporter";
};

export const partners: Partner[] = [
  { name: "Arc'teryx La Brea", url: "https://arcteryx.com/", tier: "Sponsor" },
  { name: "Smith", url: "https://www.smithoptics.com/", tier: "Sponsor" },
  { name: "Jones Snowboards", url: "https://www.jonessnowboards.com/", tier: "Sponsor" },
  { name: "La Sportiva", url: "https://www.lasportivausa.com/", tier: "Sponsor" },
  { name: "Oakley", url: "https://www.oakley.com/", tier: "Sponsor" },
  { name: "Mountain Hardwear", url: "https://www.mountainhardwear.com/", tier: "Sponsor" },
  { name: "National Ski Patrol", url: "https://www.nsp.org/", tier: "Supporter" },
  { name: "Outdoor Women's Alliance", url: "https://www.outdoorwomensalliance.org/", tier: "Supporter" }
];

export const sponsors: Partner[] = partners.filter((partner) => partner.tier === "Sponsor");
export const supporters: Partner[] = partners.filter((partner) => partner.tier === "Supporter");

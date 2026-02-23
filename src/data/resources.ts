export const resources = {
  education: [
    { label: "AIARE Courses", url: "https://avtraining.org/" },
    { label: "Sierra Mountain Center", url: "https://sierramtnguides.com/" }
  ],
  centers: [
    { label: "Eastern Sierra Avalanche Center", url: "https://www.esavalanche.org/" },
    { label: "Colorado Avalanche Information Center", url: "https://avalanche.state.co.us/" }
  ],
  tools: [
    { label: "CalTopo", url: "https://caltopo.com/" },
    { label: "NOAA Weather", url: "https://www.weather.gov/" }
  ]
};

export const dangerScale = [
  { level: 1, name: "Low", color: "var(--danger-low)", advice: "Generally safe conditions. Watch isolated hazards." },
  { level: 2, name: "Moderate", color: "var(--danger-moderate)", advice: "Evaluate terrain carefully. Identify specific hazards." },
  { level: 3, name: "Considerable", color: "var(--danger-consider)", advice: "Dangerous avalanche conditions. Conservative decisions are critical." },
  { level: 4, name: "High", color: "var(--danger-high)", advice: "Very dangerous avalanche conditions. Avoid avalanche terrain." },
  { level: 5, name: "Extreme", color: "var(--danger-extreme)", advice: "Avoid all avalanche terrain. Large destructive avalanches likely." }
];

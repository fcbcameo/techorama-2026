// Browser globals from CDN scripts
const { useState, useEffect, useMemo } = React;

// Inline SVG icon components (replaces lucide-react)
const Icon = ({ children, className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);
const Star = ({ className }) => <Icon className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>;
const Search = ({ className }) => <Icon className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></Icon>;
const Calendar = ({ className }) => <Icon className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const List = ({ className }) => <Icon className={className}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>;
const Download = ({ className }) => <Icon className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
const FileText = ({ className }) => <Icon className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></Icon>;
const X = ({ className }) => <Icon className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const ExternalLink = ({ className }) => <Icon className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Icon>;
const AlertTriangle = ({ className }) => <Icon className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Icon>;
const Filter = ({ className }) => <Icon className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
const Check = ({ className }) => <Icon className={className}><polyline points="20 6 9 17 4 12"/></Icon>;
const Crown = ({ className }) => <Icon className={className}><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></Icon>;

// ============================================================
// TECHORAMA BELGIUM 2026 — SCHEDULE DATA
// Source: techorama.be/schedule/tuesday + /wednesday (fetched May 2026)
// Conference days only (May 12 Tuesday + May 13 Wednesday). Workshops excluded.
// ============================================================
const SCHEDULE = [
  // ============== TUESDAY MAY 12 ==============
  // Keynote 08:30-09:30 (3 rooms - same session)
  { id: "1130102", day: "Tue", date: "2026-05-12", start: "08:30", end: "09:30", room: "Room 8", title: "Beyond the AI Hype: What's Real, What's Next", speakers: ["Richard Campbell"], track: "AI & Agents", level: "Intermediate", isKeynote: true },
  { id: "1212569", day: "Tue", date: "2026-05-12", start: "08:30", end: "09:30", room: "Room 5", title: "Beyond the AI Hype: What's Real, What's Next (Overflow 1)", speakers: ["Richard Campbell"], track: "AI & Agents", level: "Intermediate", isKeynote: true },
  { id: "1212570", day: "Tue", date: "2026-05-12", start: "08:30", end: "09:30", room: "Room 9", title: "Beyond the AI Hype: What's Real, What's Next (Overflow 2)", speakers: ["Richard Campbell"], track: "AI & Agents", level: "Intermediate", isKeynote: true },

  // 09:45-10:45
  { id: "1134626", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 1", title: "You're Not Just Tired: The Psychology of Burnout", speakers: ["Arthur Doler"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1139675", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 10", title: "Copilot Loves SharePoint", speakers: ["Todd Klindt"], track: "Workplace & Productivity", level: "Introductory and overview" },
  { id: "1134789", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 11", title: "Defending the Keep: Modern Identity Attacks", speakers: ["Els Putzeys"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1133346", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 13", title: "Agents Talking to Agents: Inside the A2A Protocol", speakers: ["Massimo Crippa"], track: "AI & Agents", level: "Intermediate" },
  { id: "1177972", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 4", title: "Microsoft Fabric for Dummies", speakers: ["Koen Verbeeck"], track: "Data", level: "Introductory and overview" },
  { id: "1120105", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 5", title: "Architecting Apollo: Systems Design Lessons from the Golden Age of Spaceflight", speakers: ["Kyle Kotowick"], track: "Architecture & Leadership", level: "Introductory and overview" },
  { id: "1173451", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 6", title: "How AI Agents Changed the Way We Build Azure Integrations", speakers: ["Rob Hofman"], track: "AI & Agents", level: "Intermediate" },
  { id: "1149847", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 7", title: "Going Passwordless - A Practical Guide to Passkeys in ASP.NET Core", speakers: ["Maarten Balliauw"], track: "Dev", level: "Introductory and overview" },
  { id: "1139988", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 8", title: "Next-Gen AI Apps with .NET 10: Models, Data, Agents, and MCP Servers", speakers: ["Jon Galloway"], track: "AI & Agents", level: "Intermediate" },
  { id: "1117212", day: "Tue", date: "2026-05-12", start: "09:45", end: "10:45", room: "Room 9", title: "The road to a faster ReSharper", speakers: ["Kevin Gosse"], track: "Dev", level: "Intermediate" },

  // 10:50-11:10 (lightning)
  { id: "1203284", day: "Tue", date: "2026-05-12", start: "10:50", end: "11:10", room: "Room 8", title: "Building Castles for Many Lords: Multitenancy in Practice", speakers: ["Jerry Van Echelpoel"], track: "Architecture & Leadership", level: "Introductory and overview", isLightning: true },

  // 11:15-12:15
  { id: "1127332", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 1", title: "Kindness in tech", speakers: ["Kathleen Dollard"], track: "Architecture & Leadership", level: "Introductory and overview" },
  { id: "1187902", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 10", title: "What the Scrolls Didn't Say: A Real-World Microsoft Agent Framework Quest", speakers: ["Frederiek Vandepitte", "Wouter Bauchart"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1125344", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 11", title: "From Localhost to Multi-Cloud: Building Production-Ready Apps with DocumentDB", speakers: ["Mark Brown"], track: "Data", level: "Intermediate" },
  { id: "1110638", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 13", title: "Shift Left on Non-Functionals: Continuous Validation with Azure", speakers: ["Tom van den Berg"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1172950", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 4", title: "Safe by Design — Guardrails and Evals for Production LLM Systems", speakers: ["Hampton Paulk"], track: "AI & Agents", level: "Intermediate" },
  { id: "1100746", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 5", title: "BYOAI - Build your own... Aspire Integration?!", speakers: ["Maddy Montaquila"], track: "Dev", level: "Intermediate" },
  { id: "1130300", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 6", title: "Git Scenarios: How Do I Fix That?", speakers: ["Rob Richardson"], track: "Dev", level: "Intermediate" },
  { id: "1132799", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 7", title: "Uniting divided MCP appdoms with OAuth and Cross App Access", speakers: ["Alisa Duncan"], track: "Dev", level: "Intermediate" },
  { id: "1110919", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 8", title: "Productivity Tips and Tricks in Visual Studio", speakers: ["Leslie Richardson"], track: "Dev", level: "Introductory and overview" },
  { id: "1132694", day: "Tue", date: "2026-05-12", start: "11:15", end: "12:15", room: "Room 9", title: "Lead your team like a knight!", speakers: ["Hannes Lowette"], track: "Architecture & Leadership", level: "Intermediate" },

  // 12:30-12:50 (lightning)
  { id: "1187219", day: "Tue", date: "2026-05-12", start: "12:30", end: "12:50", room: "Room 8", title: "The node_modules Iceberg: Mysteries Below the Waterline", speakers: ["Chris DeMars"], track: "Dev", level: "Intermediate", isLightning: true },

  // 13:15-14:15
  { id: "1133525", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 1", title: "Hard lessons learned from a decade of architecting software on the cloud", speakers: ["Marilag Dimatulac Svennevig"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1131279", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 10", title: "Airport Quest: Relationship-Based Access Control with OpenFGA", speakers: ["Sander Molenkamp"], track: "Dev", level: "Advanced" },
  { id: "1190012", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 11", title: "Secure Hosting of Legacy Applications on Azure", speakers: ["Bart Demeulenaere"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1127826", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 13", title: "Beyond pair programming: Autonomous development with SpecKit and Ralph", speakers: ["Hidde de Smet"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1090037", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 4", title: "Designing REST APIs for the age of AI agents", speakers: ["Boyan Mihaylov"], track: "Dev", level: "Advanced" },
  { id: "1134742", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 5", title: "OpenCode: Control your coding agent and your data", speakers: ["Geert van der Cruijsen"], track: "AI & Agents", level: "Intermediate" },
  { id: "1135488", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 6", title: "Building the Ultimate Safety Net with Integration Tests", speakers: ["Jimmy Bogard"], track: "Dev", level: "Intermediate" },
  { id: "1187310", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 7", title: "Agentic CI/CD: Azure DevOps vs GitHub Agentic Workflows", speakers: ["Thibaut De Cremer"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1108850", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 8", title: "Inside GPT – Large Language Models Demystified", speakers: ["Alan Smith"], track: "AI & Agents", level: "Advanced" },
  { id: "1132188", day: "Tue", date: "2026-05-12", start: "13:15", end: "14:15", room: "Room 9", title: "Clean Architecture for Blazor in the Real World", speakers: ["Johan Smarius"], track: "Dev", level: "Intermediate" },

  // 14:30-15:30
  { id: "1144575", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 1", title: "Building reliable applications / What we can learn from the Three Little Pigs", speakers: ["Sergey Bykov"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1089555", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 10", title: "ASP.NET Core, from DEV to PRD", speakers: ["Wesley Cabus"], track: "Dev", level: "Intermediate" },
  { id: "1096512", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 11", title: "Azure Spot instances as your secret weapon", speakers: ["Jiří Činčura"], track: "Cloud & DevOps", level: "Introductory and overview" },
  { id: "1114587", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 13", title: "We Rolled Out GitHub Copilot… How Do We Prove It Helps?", speakers: ["Liuba Gonta", "Yuliya Khadasevich"], track: "AI & Agents", level: "Intermediate" },
  { id: "1111340", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 4", title: "From Automation to Intelligence: Using Power Automate GPT Prompts for Smarter Document Processing", speakers: ["Christina Wheeler"], track: "Workplace & Productivity", level: "Intermediate" },
  { id: "1134429", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 5", title: "Spec-driven development live", speakers: ["Sakari Nahi"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1127971", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 6", title: "String and memory: a long love story in .NET", speakers: ["Christophe Nasarre"], track: "Dev", level: "Intermediate" },
  { id: "1089960", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 7", title: "Make Your SQL Server Queries Faster Than Your Neighbour's", speakers: ["Pinal Dave"], track: "Data", level: "Introductory and overview" },
  { id: "1094506", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 8", title: "Build an MCP Server in C#", speakers: ["Rockford Lhotka"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1116183", day: "Tue", date: "2026-05-12", start: "14:30", end: "15:30", room: "Room 9", title: "Beyond Pub/Sub - Advanced Messaging Patterns", speakers: ["Poornima Nayar"], track: "Architecture & Leadership", level: "Intermediate" },

  // 15:35-15:55 (lightning)
  { id: "1176988", day: "Tue", date: "2026-05-12", start: "15:35", end: "15:55", room: "Room 8", title: "Reusing DevOps Steps, Jobs, Stages, and Pipelines across your company projects", speakers: ["Jorren Schepers", "Wannes Maes"], track: "Cloud & DevOps", level: "Intermediate", isLightning: true },

  // 16:00-17:00
  { id: "1154699", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 1", title: "Agent-Ready Frontends: A Development Guide", speakers: ["Vuong Ha"], track: "Dev", level: "Intermediate" },
  { id: "1130751", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 10", title: "Securing Modern Workloads with Entra Agent ID", speakers: ["Sergey Chubarov"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1150599", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 11", title: "From Courtly hype to battlefield impact: Making AI work in the real world", speakers: ["Gila Marelus"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1111831", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 13", title: "Ship faster. Stress Less. Agentic DevOps with Github Copilot and SRE Agent", speakers: ["Nir Mashkowski"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1134464", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 4", title: "Professional AI-Assisted Development with Cursor: From Vibecoding to Production-Ready Code", speakers: ["Xavier Decuyper"], track: "AI & Agents", level: "Intermediate" },
  { id: "1132321", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 5", title: "MITRE ATT&CK for Developers", speakers: ["Chris Ayers"], track: "Dev", level: "Intermediate" },
  { id: "1133214", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 6", title: "Building well-documented versioned HTTP APIs in ASP.NET Core", speakers: ["Dennis Doomen"], track: "Dev", level: "Intermediate" },
  { id: "1110545", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 7", title: "Testing smarter: Bringing AI into your E2E testing workflows", speakers: ["Elio Struyf"], track: "Dev", level: "Intermediate" },
  { id: "1191767", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 8", title: "From Single Agents to Systems: Designing Multi-Agent Architecture", speakers: ["Sakari Nahi"], track: "AI & Agents", level: "Intermediate" },
  { id: "1135051", day: "Tue", date: "2026-05-12", start: "16:00", end: "17:00", room: "Room 9", title: "Azure Virtual Networks for developers", speakers: ["Rik Hepworth"], track: "Cloud & DevOps", level: "Intermediate" },

  // 17:15-18:15
  { id: "1089504", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 1", title: "How Microfrontends Let Your Teams Ship Fast Without Breaking Things", speakers: ["Dante De Ruwe"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1134624", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 10", title: "Build an agent into any app with the GitHub Copilot SDK", speakers: ["Bart Wullems"], track: "AI & Agents", level: "Intermediate" },
  { id: "1113541", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 11", title: "Hello, Agent World! A Lap Around AI Agents on AWS", speakers: ["Alexander Dragunov"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1124306", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 13", title: "The RAGged Edge: Keep your data and AI close", speakers: ["Christian Peeters"], track: "AI & Agents", level: "Intermediate" },
  { id: "1121210", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 4", title: "Stop flying blind. Monitor your applications with Azure Application Insights.", speakers: ["Sam Vanhoutte"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1108843", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 5", title: "AI Agents In-Depth – Function Calling, MCP and Tool Use Under the Hood", speakers: ["Alan Smith"], track: "AI & Agents", level: "Advanced" },
  { id: "1117538", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 6", title: "Turbocharge your applications with Microsoft AI Foundry", speakers: ["Vincent Biret"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1175082", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 7", title: "Get your outbox out of the dark ages!", speakers: ["Szymon Pobiega"], track: "Architecture & Leadership", level: "Advanced" },
  { id: "1135706", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 8", title: "C# 14 and Beyond", speakers: ["Bart De Smet"], track: "Dev", level: "Advanced" },
  { id: "1136175", day: "Tue", date: "2026-05-12", start: "17:15", end: "18:15", room: "Room 9", title: "Do It With Style: Rethinking CSS", speakers: ["Dylan Beattie"], track: "Dev", level: "Expert" },

  // ============== WEDNESDAY MAY 13 ==============
  // 08:30-09:30
  { id: "1110635", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 1", title: ".NET supply chain: Protecting against hidden threats", speakers: ["Tom van den Berg"], track: "Dev", level: "Intermediate" },
  { id: "1139671", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 10", title: "Getting the most out of the SharePoint Knowledge Agent", speakers: ["Todd Klindt"], track: "Workplace & Productivity", level: "Introductory and overview" },
  { id: "1152740", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 11", title: "Hack the Castle: Timeless Parallels in Security", speakers: ["Joachim Dekker"], track: "Architecture & Leadership", level: "Introductory and overview" },
  { id: "1187412", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 13", title: "From Autocomplete to Orchestrators", speakers: ["Angelo Dejaeghere"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1135451", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 4", title: "Hybrid Caching in .NET", speakers: ["Jody Donetti"], track: "Dev", level: "Intermediate" },
  { id: "1089963", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 5", title: "Database Worst Practices by Gen AI", speakers: ["Pinal Dave"], track: "Data", level: "Introductory and overview" },
  { id: "1134485", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 6", title: "Optimistic Security", speakers: ["Niall Merrigan"], track: "Architecture & Leadership", level: "Introductory and overview" },
  { id: "1094509", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 7", title: "Building Collaborative Agents with Microsoft Agent Framework", speakers: ["Rockford Lhotka"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1127338", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 8", title: "Staying sane when writing Roslyn incremental source generators", speakers: ["Kathleen Dollard"], track: "Dev", level: "Advanced" },
  { id: "1131282", day: "Wed", date: "2026-05-13", start: "08:30", end: "09:30", room: "Room 9", title: "Eco Mode: Building Green Solutions on Azure", speakers: ["Sander Molenkamp"], track: "Cloud & DevOps", level: "Intermediate" },

  // 09:45-10:45
  { id: "1148545", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 1", title: "From idea to prompt to production-ready code? How AI-powered platforms can help you building apps.", speakers: ["Elio Struyf"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1133266", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 10", title: "Ctrl+Alt+Resilient: Always-On Analytics Workloads on Azure", speakers: ["Kristof Rennen", "Wesley Backelant"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1188629", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 11", title: "Plug In, Power Up: Extending Coding Agents with Plugins", speakers: ["Yanko Dzhemerenov"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1134736", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 13", title: "Red vs. Blue: Defending AI agents in Production", speakers: ["Laura Verghote", "Sofie Delaet"], track: "AI & Agents", level: "Intermediate" },
  { id: "1111316", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 4", title: "Prompt Engineering for Copilot Studio: Getting the Best Results from Your Agents", speakers: ["Christina Wheeler"], track: "Workplace & Productivity", level: "Intermediate" },
  { id: "1100717", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 5", title: "Deploying with Aspire to any cloud", speakers: ["Maddy Montaquila"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1133341", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 6", title: "The Unbearable Weight of Architecture", speakers: ["David Whitney"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1150573", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 7", title: "React Client vs Server: Showdown at Render Creek", speakers: ["Roland Guijt"], track: "Dev", level: "Intermediate" },
  { id: "1139994", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 8", title: "Updating Legacy Apps to Modern .NET", speakers: ["Jon Galloway"], track: "Dev", level: "Intermediate" },
  { id: "1096509", day: "Wed", date: "2026-05-13", start: "09:45", end: "10:45", room: "Room 9", title: "Lessons learned from translating parameterized collections in EF Core", speakers: ["Jiří Činčura"], track: "Dev", level: "Intermediate" },

  // 10:50-11:10 (lightning)
  { id: "1184175", day: "Wed", date: "2026-05-13", start: "10:50", end: "11:10", room: "Room 8", title: "Self-Driving SDLC", speakers: ["Rahul Sinha"], track: "Architecture & Leadership", level: "Intermediate", isLightning: true },

  // 11:15-12:15
  { id: "1129290", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 1", title: "Turning microservice chaos into a beautiful concerto", speakers: ["Marc Duiker"], track: "Dev", level: "Advanced" },
  { id: "1134008", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 10", title: "Putting the AI in .NET MAUI", speakers: ["Shaun Lawrence"], track: "AI & Agents", level: "Intermediate" },
  { id: "1132724", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 11", title: "Durable Execution — a quiet revolution in building software and AI", speakers: ["Sergey Bykov"], track: "Dev", level: "Intermediate" },
  { id: "1131499", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 13", title: "Building Resilient Azure Cosmos DB Kingdoms", speakers: ["Theodorus Leonardus van Kraay"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1180361", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 4", title: "Writing .NET Tests with GitHub Copilot in Visual Studio and VS Code", speakers: ["Leslie Richardson"], track: "Dev", level: "Intermediate" },
  { id: "1120098", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 5", title: "The Therac-25: Software that Kills", speakers: ["Kyle Kotowick"], track: "Architecture & Leadership", level: "Introductory and overview" },
  { id: "1153084", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 6", title: "Building Agents with Agents", speakers: ["Nir Mashkowski"], track: "AI & Agents", level: "Intermediate" },
  { id: "1108843-w", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 7", title: "AI Agents In-Depth – Function Calling, MCP and Tool Use Under the Hood", speakers: ["Alan Smith"], track: "AI & Agents", level: "Advanced" },
  { id: "1135491", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 8", title: "OpenTelemetry in a Brownfield World", speakers: ["Jimmy Bogard"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1118546", day: "Wed", date: "2026-05-13", start: "11:15", end: "12:15", room: "Room 9", title: "Forging Curated Data in the Age of Castles and Guilds", speakers: ["Nico Jacobs"], track: "Data", level: "Intermediate" },

  // 12:30-12:50 (lightning)
  { id: "1179191", day: "Wed", date: "2026-05-13", start: "12:30", end: "12:50", room: "Room 8", title: "bUnit: how to love and not fear Unit testing Blazor Components", speakers: ["Jorn Hendrickx"], track: "Dev", level: "Introductory and overview", isLightning: true },

  // 13:15-14:15
  { id: "1154875", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 1", title: "The Well-Architected Architect - Building Secure, Reliable, Cost-efficient Solutions on Azure", speakers: ["Chris Ayers"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1172951", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 10", title: "Confident and Wrong — Detecting LLM Hallucinations in Production", speakers: ["Hampton Paulk"], track: "AI & Agents", level: "Intermediate" },
  { id: "1134640", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 11", title: "Boredom-Driven Development: The Dark Bargain at the Heart of Software", speakers: ["Arthur Doler"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1112095", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 13", title: "Securing ASP.NET Core Today: Lessons from the New OWASP Top 10", speakers: ["Christian Wenz"], track: "Dev", level: "Intermediate" },
  { id: "1134453", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 4", title: "The Modular Monolith: Structure Without the Microservice Madness", speakers: ["Peter Himschoot"], track: "Dev", level: "Intermediate" },
  { id: "1117216", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 5", title: "The hidden life of method calls", speakers: ["Kevin Gosse"], track: "Dev", level: "Intermediate" },
  { id: "1130103", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 6", title: "The Undersea Infrastructure", speakers: ["Richard Campbell"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1122832", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 7", title: "Modern Cybersecurity Failures: Skills and Misconfigurations That Define the Battlefield", speakers: ["Paula Januszkiewicz"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1089406", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 8", title: "Change is inevitable: versioning event-driven systems", speakers: ["Laila Bougria"], track: "Architecture & Leadership", level: "Advanced" },
  { id: "1122723", day: "Wed", date: "2026-05-13", start: "13:15", end: "14:15", room: "Room 9", title: "Building Git in 60 Minutes To See How It Works", speakers: ["Stijn Castelyns"], track: "Dev", level: "Intermediate" },

  // 14:30-15:30
  { id: "1117539", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 1", title: "Introduction to fine tuning and evaluations in Microsoft Foundry", speakers: ["Vincent Biret"], track: "AI & Agents", level: "Intermediate" },
  { id: "1096724", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 10", title: "Let the spec speak: Building intelligent tests with Gherkin and Playwright", speakers: ["Elio Struyf", "Luise Freese"], track: "Dev", level: "Intermediate" },
  { id: "1133589", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 11", title: "From Analytics to Action: Unlocking Cosmos DB's Operational Intelligence in Microsoft Fabric", speakers: ["Mark Brown"], track: "Data", level: "Intermediate" },
  { id: "1105627", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 13", title: "I Finally Understand Neural Networks: A Developer's Perspective", speakers: ["Lander Verhack"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1197875", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 4", title: "The end of coding as we know it: using and building agents that actually work", speakers: ["Matthias Heylen"], track: "AI & Agents", level: "Intermediate" },
  { id: "1152998", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 5", title: "Cloud native platform engineering on Azure", speakers: ["Geert van der Cruijsen"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1130298", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 6", title: "Full-Stack DevOps: Containerize and Deploy to Kubernetes", speakers: ["Rob Richardson"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1124216", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 7", title: "Implementing Azure Policies: Before the Portal", speakers: ["Barbara Forbes"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1119665", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 8", title: "Azure Service Bus - Behind the scenes", speakers: ["Clemens Vasters"], track: "Architecture & Leadership", level: "Intermediate" },
  { id: "1196414", day: "Wed", date: "2026-05-13", start: "14:30", end: "15:30", room: "Room 9", title: "From coder to conductor: let AI agents execute while you decide", speakers: ["Nicolas VYT"], track: "AI & Agents", level: "Advanced" },

  // 16:00-17:00
  { id: "1095491", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 1", title: "Surviving the Dual-Write Problem in Distributed Systems", speakers: ["Sohan Maheshwar"], track: "Architecture & Leadership", level: "Advanced" },
  { id: "1135688", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 10", title: "Stop Copy-Pasting Your Build Configuration", speakers: ["Matthias Koch"], track: "Dev", level: "Intermediate" },
  { id: "1133221", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 11", title: "Zero trust in the age of Ai Agents", speakers: ["Adnan Hendricks"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1131440", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 13", title: "Take Control: Agent Governance in Microsoft 365", speakers: ["Thomas Vochten"], track: "Workplace & Productivity", level: "Introductory and overview" },
  { id: "1089505", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 4", title: "The Fun Side of Advanced TypeScript: An Interactive Coding Session", speakers: ["Dante De Ruwe"], track: "Dev", level: "Advanced" },
  { id: "1134048", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 5", title: "Forging an impenetrable armor for your Angular app", speakers: ["Alisa Duncan"], track: "Dev", level: "Advanced" },
  { id: "1135054", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 6", title: "Much ado about Geo-Redundancy", speakers: ["Rik Hepworth"], track: "Cloud & DevOps", level: "Intermediate" },
  { id: "1143239", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 7", title: "Beyond the Text Box: Rethinking Your Product's AI Surface Area", speakers: ["Den Delimarsky"], track: "AI & Agents", level: "Introductory and overview" },
  { id: "1134303", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 8", title: "I Didn't Know the CLR JIT Could Do That!", speakers: ["Bart De Smet"], track: "Dev", level: "Expert" },
  { id: "1143100", day: "Wed", date: "2026-05-13", start: "16:00", end: "17:00", room: "Room 9", title: "Beyond DDD vs EA: Architecting Autonomous Landscapes That Actually Scale", speakers: ["Dwight Matthys"], track: "Architecture & Leadership", level: "Advanced" },

  // 17:15-18:15 closing keynote
  { id: "1192267", day: "Wed", date: "2026-05-13", start: "17:15", end: "18:15", room: "Room 8", title: "How 5000 years of history is shaping the AI era", speakers: ["Tom Van De Weghe"], track: "AI & Agents", level: "Introductory and overview", isKeynote: true },
  { id: "1212566", day: "Wed", date: "2026-05-13", start: "17:15", end: "18:15", room: "Room 5", title: "How 5000 years of history is shaping the AI era (Overflow 1)", speakers: ["Tom Van De Weghe"], track: "AI & Agents", level: "Introductory and overview", isKeynote: true },
  { id: "1212567", day: "Wed", date: "2026-05-13", start: "17:15", end: "18:15", room: "Room 9", title: "How 5000 years of history is shaping the AI era (Overflow 2)", speakers: ["Tom Van De Weghe"], track: "AI & Agents", level: "Introductory and overview", isKeynote: true },
];

const DAYS = [
  { key: "Tue", label: "Tuesday", date: "May 12", iso: "2026-05-12" },
  { key: "Wed", label: "Wednesday", date: "May 13", iso: "2026-05-13" },
];

const TRACK_COLORS = {
  "AI & Agents": "bg-amber-100 text-amber-900 border-amber-300",
  "Architecture & Leadership": "bg-rose-100 text-rose-900 border-rose-300",
  "Cloud & DevOps": "bg-sky-100 text-sky-900 border-sky-300",
  "Data": "bg-emerald-100 text-emerald-900 border-emerald-300",
  "Dev": "bg-violet-100 text-violet-900 border-violet-300",
  "Workplace & Productivity": "bg-orange-100 text-orange-900 border-orange-300",
};

const STORAGE_KEY = "techorama-2026-picks";
const FAV_STORAGE_KEY = "techorama-2026-favorites";

// ============================================================
// HELPERS
// ============================================================
function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function buildICS(picks, favorites = new Set()) {
  const fmt = (date, time) => {
    // Belgium is CET/CEST. May 12-13 is CEST (UTC+2). Convert local to UTC.
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    const utc = new Date(Date.UTC(y, mo - 1, d, h - 2, mi));
    return utc.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };
  const escape = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Techorama Schedule Manager//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  for (const s of picks) {
    const isFav = favorites.has(s.id);
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:techorama-2026-${s.id}@local`);
    lines.push(`DTSTAMP:${fmt("2026-05-07", "00:00")}`);
    lines.push(`DTSTART:${fmt(s.date, s.start)}`);
    lines.push(`DTEND:${fmt(s.date, s.end)}`);
    lines.push(`SUMMARY:${escape(`${isFav ? "♛ " : ""}${s.title}`)}`);
    lines.push(`LOCATION:${escape(`${s.room}, Kinepolis Antwerp`)}`);
    lines.push(`DESCRIPTION:${escape(`${isFav ? "★ FAVORITE PICK\\n" : ""}${s.speakers.join(", ")} — ${s.track} (${s.level})\\nhttps://techorama.be/schedule/sessions/${s.id}`)}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function buildPDFHtml(picks, favorites = new Set()) {
  const byDate = new Map();
  for (const s of picks) {
    if (!byDate.has(s.date)) byDate.set(s.date, []);
    byDate.get(s.date).push(s);
  }
  const favCount = picks.filter(s => favorites.has(s.id)).length;
  const dateLabel = (d) => d === "2026-05-12" ? "Tuesday, 12 May 2026" : "Wednesday, 13 May 2026";
  const sections = [...byDate.entries()].sort().map(([date, items]) => {
    items.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
    const rows = items.map(s => {
      const isFav = favorites.has(s.id);
      const rowBg = isFav ? "background:#fef3c7;" : "";
      const crown = isFav ? `<span style="color:#b45309;font-weight:bold;font-size:14px;margin-right:4px;" title="Favorite">♛</span>` : "";
      return `
      <tr style="${rowBg}">
        <td style="padding:8px 10px;border-bottom:1px solid #ddd;font-weight:bold;white-space:nowrap;vertical-align:top;">${s.start}–${s.end}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #ddd;vertical-align:top;">
          <div style="font-weight:bold;font-size:13px;">${crown}${escapeHtml(s.title)}</div>
          <div style="color:#555;font-style:italic;font-size:12px;margin-top:2px;">${escapeHtml(s.speakers.join(", "))}</div>
          <div style="color:#777;font-size:11px;margin-top:3px;">${escapeHtml(s.track)} · ${escapeHtml(s.level)}${isFav ? ` · <strong style="color:#b45309;">FAVORITE</strong>` : ""}</div>
        </td>
        <td style="padding:8px 10px;border-bottom:1px solid #ddd;font-weight:bold;white-space:nowrap;vertical-align:top;">${escapeHtml(s.room)}</td>
      </tr>
    `;
    }).join("");
    return `
      <h2 style="font-family:Georgia,serif;border-bottom:2px solid #1c1917;padding-bottom:6px;margin-top:24px;">${dateLabel(date)}</h2>
      <table style="width:100%;border-collapse:collapse;font-family:Georgia,serif;font-size:13px;">
        <thead>
          <tr style="background:#1c1917;color:#fafaf9;">
            <th style="padding:8px 10px;text-align:left;">Time</th>
            <th style="padding:8px 10px;text-align:left;">Session</th>
            <th style="padding:8px 10px;text-align:left;">Room</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }).join("");
  const legend = favCount > 0 ? `<p style="color:#b45309;margin-top:0;font-size:12px;"><strong>♛</strong> = favorite (${favCount} of ${picks.length} selected)</p>` : "";
  return `<!doctype html><html><head><meta charset="utf-8"><title>My Techorama 2026 Schedule</title>
    <style>@media print { @page { margin: 1.5cm; } } body { font-family: Georgia, serif; max-width: 800px; margin: 20px auto; padding: 20px; color: #1c1917; }</style>
    </head><body>
    <h1 style="font-family:Georgia,serif;margin-bottom:4px;">⚔ My Techorama 2026 Schedule</h1>
    <p style="color:#666;margin-top:0;font-style:italic;">Medieval Edition · Kinepolis Antwerp · ${picks.length} session${picks.length !== 1 ? "s" : ""}</p>
    ${legend}
    ${sections}
    <p style="color:#999;font-size:11px;margin-top:30px;text-align:center;">Generated from techorama.be schedule</p>
    <script>window.onload = () => setTimeout(() => window.print(), 300);<\/script>
    </body></html>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ============================================================
// MAIN COMPONENT
// ============================================================
function TechoramaSchedule() {
  const [picks, setPicks] = useState(new Set());
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState("Tue");
  const [view, setView] = useState("list"); // list | grid | mine
  const [search, setSearch] = useState("");
  const [trackFilter, setTrackFilter] = useState(new Set());
  const [levelFilter, setLevelFilter] = useState(new Set());
  const [roomFilter, setRoomFilter] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Load picks + favorites from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPicks(new Set(JSON.parse(raw)));
    } catch (e) {}
    try {
      const rawFav = localStorage.getItem(FAV_STORAGE_KEY);
      if (rawFav) setFavorites(new Set(JSON.parse(rawFav)));
    } catch (e) {}
    setLoading(false);
  }, []);

  // Save picks whenever they change
  const togglePick = (id) => {
    const next = new Set(picks);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setPicks(next);
    // If a session is unstarred, also remove its favorite status
    if (!next.has(id) && favorites.has(id)) {
      const nextFavs = new Set(favorites);
      nextFavs.delete(id);
      setFavorites(nextFavs);
      try { localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify([...nextFavs])); } catch (e) {}
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch (e) {
      console.error("Failed to save picks:", e);
    }
  };

  // Toggle favorite (crown). Only one favorite per time-slot per day; auto-replaces silently.
  const toggleFavorite = (id) => {
    const session = SCHEDULE.find(s => s.id === id);
    if (!session) return;
    const next = new Set(favorites);
    if (next.has(id)) {
      next.delete(id);
    } else {
      const slotKey = `${session.date}|${session.start}-${session.end}`;
      for (const favId of next) {
        const fav = SCHEDULE.find(s => s.id === favId);
        if (fav && `${fav.date}|${fav.start}-${fav.end}` === slotKey) {
          next.delete(favId);
        }
      }
      next.add(id);
    }
    setFavorites(next);
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify([...next]));
    } catch (e) {
      console.error("Failed to save favorites:", e);
    }
  };

  // Derived: tracks/levels/rooms for filters
  const allTracks = useMemo(() => [...new Set(SCHEDULE.map(s => s.track))].sort(), []);
  const allLevels = useMemo(() => [...new Set(SCHEDULE.map(s => s.level))].sort(), []);
  const allRooms = useMemo(() => [...new Set(SCHEDULE.map(s => s.room))].sort((a, b) => {
    const na = parseInt(a.replace(/\D/g, ""), 10);
    const nb = parseInt(b.replace(/\D/g, ""), 10);
    return na - nb;
  }), []);

  // Filtered sessions for active day
  const filteredSessions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SCHEDULE.filter(s => {
      if (view !== "mine" && s.day !== activeDay) return false;
      if (view === "mine" && !picks.has(s.id)) return false;
      if (trackFilter.size && !trackFilter.has(s.track)) return false;
      if (levelFilter.size && !levelFilter.has(s.level)) return false;
      if (roomFilter.size && !roomFilter.has(s.room)) return false;
      if (q) {
        const hay = (s.title + " " + s.speakers.join(" ") + " " + s.room + " " + s.track).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeDay, view, search, trackFilter, levelFilter, roomFilter, picks]);

  // Group by time slot for list view
  const groupedByTime = useMemo(() => {
    const map = new Map();
    for (const s of filteredSessions) {
      const key = `${s.start}-${s.end}|${s.date}`;
      if (!map.has(key)) map.set(key, { start: s.start, end: s.end, date: s.date, sessions: [] });
      map.get(key).sessions.push(s);
    }
    return [...map.values()].sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return timeToMinutes(a.start) - timeToMinutes(b.start);
    });
  }, [filteredSessions]);

  // Conflict detection for picks
  const conflicts = useMemo(() => {
    const pickedSessions = SCHEDULE.filter(s => picks.has(s.id));
    const conflictIds = new Set();
    for (let i = 0; i < pickedSessions.length; i++) {
      for (let j = i + 1; j < pickedSessions.length; j++) {
        const a = pickedSessions[i], b = pickedSessions[j];
        if (a.date !== b.date) continue;
        const aStart = timeToMinutes(a.start), aEnd = timeToMinutes(a.end);
        const bStart = timeToMinutes(b.start), bEnd = timeToMinutes(b.end);
        if (aStart < bEnd && bStart < aEnd) {
          conflictIds.add(a.id);
          conflictIds.add(b.id);
        }
      }
    }
    return conflictIds;
  }, [picks]);

  const toggleFilter = (set, setter, value) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const clearAllFilters = () => {
    setTrackFilter(new Set());
    setLevelFilter(new Set());
    setRoomFilter(new Set());
    setSearch("");
  };

  const triggerDownload = (filename, content, mime) => {
    try {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      const dataUrl = `data:${mime};charset=utf-8,${encodeURIComponent(content)}`;
      window.open(dataUrl, "_blank");
    }
  };

  const exportICS = () => {
    const pickedSessions = SCHEDULE.filter(s => picks.has(s.id));
    if (!pickedSessions.length) return;
    triggerDownload("techorama-2026-my-schedule.ics", buildICS(pickedSessions, favorites), "text/calendar;charset=utf-8");
  };

  const exportPDF = () => {
    const pickedSessions = SCHEDULE.filter(s => picks.has(s.id));
    if (!pickedSessions.length) {
      window.print();
      return;
    }
    const html = buildPDFHtml(pickedSessions, favorites);
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    } else {
      window.print();
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-700" style={{ fontFamily: "Georgia, serif" }}>Loading your schedule…</div>;
  }

  const activeFilterCount = trackFilter.size + levelFilter.size + roomFilter.size + (search ? 1 : 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-only { display: block !important; }
          .session-card { break-inside: avoid; page-break-inside: avoid; }
        }
        .print-only { display: none; }
        @page { margin: 1.5cm; }
      `}</style>

      {/* Header */}
      <header className="no-print bg-stone-900 text-stone-100 border-b-4 border-amber-600">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Cinzel', Georgia, serif", letterSpacing: "0.05em" }}>
                ⚔ TECHORAMA 2026
              </h1>
              <p className="text-stone-400 text-sm mt-1 italic">Medieval Edition · Kinepolis Antwerp · 12–13 May</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="bg-amber-700/30 border border-amber-600/50 rounded px-3 py-1.5">
                <Star className="inline w-4 h-4 mr-1 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{picks.size}</span> selected
                {favorites.size > 0 && (
                  <span className="ml-2 text-amber-300">
                    <Crown className="inline w-4 h-4 mr-0.5 fill-amber-400" />
                    {favorites.size} favorite{favorites.size !== 1 ? "s" : ""}
                  </span>
                )}
                {conflicts.size > 0 && (
                  <span className="ml-2 text-rose-300">
                    <AlertTriangle className="inline w-4 h-4 mr-0.5" />
                    {conflicts.size / 2} conflicts
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Print header */}
      <div className="print-only mb-6">
        <h1 className="text-2xl font-bold">My Techorama 2026 Schedule</h1>
        <p className="text-sm text-stone-600">Kinepolis Antwerp · 12–13 May 2026</p>
      </div>

      {/* Day tabs + view toggle + actions */}
      <div className="no-print sticky top-0 z-20 bg-stone-50/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2">
          <div className="flex bg-stone-200 rounded-lg p-1">
            {DAYS.map(d => (
              <button
                key={d.key}
                onClick={() => { setActiveDay(d.key); setView(view === "mine" ? "list" : view); }}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                  view !== "mine" && activeDay === d.key
                    ? "bg-stone-900 text-stone-50 shadow"
                    : "text-stone-700 hover:bg-stone-300"
                }`}
              >
                {d.label} <span className="opacity-60 text-xs ml-1">{d.date}</span>
              </button>
            ))}
            <button
              onClick={() => setView("mine")}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition flex items-center gap-1.5 ${
                view === "mine" ? "bg-amber-600 text-white shadow" : "text-stone-700 hover:bg-stone-300"
              }`}
            >
              <Star className={`w-4 h-4 ${view === "mine" ? "fill-white" : ""}`} /> My Schedule
            </button>
          </div>

          <div className="flex bg-stone-200 rounded-lg p-1 ml-auto">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition flex items-center gap-1.5 ${
                view === "list" ? "bg-stone-900 text-stone-50" : "text-stone-700 hover:bg-stone-300"
              }`}
            >
              <List className="w-4 h-4" /> List
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition flex items-center gap-1.5 ${
                view === "grid" ? "bg-stone-900 text-stone-50" : "text-stone-700 hover:bg-stone-300"
              }`}
            >
              <Calendar className="w-4 h-4" /> Grid
            </button>
          </div>

          {view === "mine" && picks.size > 0 && (
            <>
              <button
                onClick={exportICS}
                className="px-3 py-2 rounded-md text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800 flex items-center gap-1.5"
                title="Download as iCal file (Outlook/Google Calendar)"
              >
                <Download className="w-4 h-4" /> .ics
              </button>
              <button
                onClick={exportPDF}
                className="px-3 py-2 rounded-md text-sm font-semibold bg-stone-700 text-white hover:bg-stone-800 flex items-center gap-1.5"
                title="Print or save as PDF"
              >
                <FileText className="w-4 h-4" /> PDF
              </button>
            </>
          )}
        </div>

        {/* Search + filters */}
        <div className="max-w-6xl mx-auto px-4 pb-3 flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search title, speaker, room…"
              className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-md text-sm font-semibold border flex items-center gap-1.5 ${
              activeFilterCount > 0 ? "bg-amber-600 text-white border-amber-600" : "bg-white text-stone-700 border-stone-300 hover:bg-stone-100"
            }`}
          >
            <Filter className="w-4 h-4" /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          {activeFilterCount > 0 && (
            <button onClick={clearAllFilters} className="text-sm text-stone-600 hover:text-stone-900 underline">
              Clear all
            </button>
          )}
        </div>

        {showFilters && (
          <div className="max-w-6xl mx-auto px-4 pb-4 space-y-3 border-t border-stone-200 pt-3">
            <FilterRow label="Track" options={allTracks} selected={trackFilter} onToggle={(v) => toggleFilter(trackFilter, setTrackFilter, v)} />
            <FilterRow label="Level" options={allLevels} selected={levelFilter} onToggle={(v) => toggleFilter(levelFilter, setLevelFilter, v)} />
            <FilterRow label="Room" options={allRooms} selected={roomFilter} onToggle={(v) => toggleFilter(roomFilter, setRoomFilter, v)} />
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {view === "grid" ? (
          <GridView sessions={filteredSessions} picks={picks} favorites={favorites} conflicts={conflicts} togglePick={togglePick} toggleFavorite={toggleFavorite} onSelect={setSelectedSession} />
        ) : (
          <ListView groups={groupedByTime} picks={picks} favorites={favorites} conflicts={conflicts} togglePick={togglePick} toggleFavorite={toggleFavorite} onSelect={setSelectedSession} viewMode={view} />
        )}

        {filteredSessions.length === 0 && (
          <div className="text-center py-16 text-stone-500 italic">
            {view === "mine" ? "No sessions selected yet. Tap a star to add one." : "No sessions match these filters."}
          </div>
        )}
      </main>

      {/* Session detail modal */}
      {selectedSession && (
        <SessionModal session={selectedSession} onClose={() => setSelectedSession(null)} togglePick={togglePick} picks={picks} favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
    </div>
  );
}

// ============================================================
// SUBCOMPONENTS
// ============================================================
function FilterRow({ label, options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 w-16">{label}</span>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onToggle(opt)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition ${
            selected.has(opt)
              ? "bg-stone-900 text-stone-50 border-stone-900"
              : "bg-white text-stone-700 border-stone-300 hover:border-stone-500"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function ListView({ groups, picks, favorites, conflicts, togglePick, toggleFavorite, onSelect, viewMode }) {
  let lastDate = null;
  return (
    <div className="space-y-6">
      {groups.map(g => {
        const showDateHeader = viewMode === "mine" && g.date !== lastDate;
        lastDate = g.date;
        return (
          <div key={`${g.date}-${g.start}`}>
            {showDateHeader && (
              <h2 className="text-xl font-bold border-b-2 border-stone-900 pb-2 mb-4 mt-6 first:mt-0" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                {g.date === "2026-05-12" ? "Tuesday, 12 May" : "Wednesday, 13 May"}
              </h2>
            )}
            <div className="flex items-baseline gap-3 mb-3">
              <h3 className="text-lg font-bold text-stone-800" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                {g.start}–{g.end}
              </h3>
              <span className="text-xs text-stone-500 italic">{g.sessions.length} session{g.sessions.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {g.sessions.map(s => (
                <SessionCard key={s.id} session={s} picked={picks.has(s.id)} favorite={favorites.has(s.id)} conflict={conflicts.has(s.id)} togglePick={togglePick} toggleFavorite={toggleFavorite} onSelect={onSelect} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SessionCard({ session, picked, favorite, conflict, togglePick, toggleFavorite, onSelect }) {
  const trackColor = TRACK_COLORS[session.track] || "bg-stone-100 text-stone-900 border-stone-300";
  return (
    <div
      className={`session-card relative bg-white rounded-lg border-2 p-4 transition shadow-sm hover:shadow-md cursor-pointer ${
        favorite ? "border-amber-600 bg-amber-100/60 ring-2 ring-amber-500" :
        picked ? "border-amber-500 bg-amber-50/40" : "border-stone-200 hover:border-stone-400"
      } ${conflict && picked ? "ring-2 ring-rose-400 ring-offset-1" : ""}`}
      onClick={() => onSelect(session)}
    >
      {session.isKeynote && (
        <div className="absolute -top-2 -left-2 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
          KEYNOTE
        </div>
      )}
      {session.isLightning && (
        <div className="absolute -top-2 -left-2 bg-violet-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
          LIGHTNING
        </div>
      )}
      <div className="absolute top-3 right-3 flex items-center gap-1 no-print">
        {picked && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(session.id); }}
            className="p-1 rounded hover:bg-stone-100"
            title={favorite ? "Remove favorite" : "Mark as favorite for this time slot"}
          >
            <Crown className={`w-5 h-5 ${favorite ? "fill-amber-600 text-amber-700" : "text-stone-300"}`} />
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); togglePick(session.id); }}
          className="p-1 rounded hover:bg-stone-100"
          title={picked ? "Remove from my schedule" : "Add to my schedule"}
        >
          <Star className={`w-5 h-5 ${picked ? "fill-amber-500 text-amber-500" : "text-stone-300"}`} />
        </button>
      </div>
      {favorite && (
        <div className="print-only text-xs font-bold text-amber-700 mb-1">★ FAVORITE</div>
      )}
      {picked && conflict && (
        <div className="text-xs text-rose-700 font-semibold mb-2 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" /> Time conflict with another pick
        </div>
      )}
      <h4 className="font-bold text-stone-900 pr-16 leading-tight mb-2">{session.title}</h4>
      <p className="text-sm text-stone-700 italic mb-2">{session.speakers.join(", ")}</p>
      <div className="flex flex-wrap gap-1.5 items-center text-xs">
        <span className={`px-2 py-0.5 rounded border font-medium ${trackColor}`}>{session.track}</span>
        <span className="text-stone-500">·</span>
        <span className="text-stone-600">{session.room}</span>
        <span className="text-stone-500">·</span>
        <span className="text-stone-600">{session.level}</span>
      </div>
      <div className="print-only text-xs text-stone-600 mt-1">{session.start}–{session.end}</div>
    </div>
  );
}

function GridView({ sessions, picks, favorites, conflicts, togglePick, toggleFavorite, onSelect }) {
  // Build time slots & rooms from these sessions
  const slots = useMemo(() => {
    const set = new Set();
    sessions.forEach(s => set.add(`${s.start}-${s.end}`));
    return [...set].sort((a, b) => timeToMinutes(a.split("-")[0]) - timeToMinutes(b.split("-")[0]));
  }, [sessions]);

  const rooms = useMemo(() => {
    const set = new Set();
    sessions.forEach(s => set.add(s.room));
    return [...set].sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""), 10);
      const nb = parseInt(b.replace(/\D/g, ""), 10);
      return na - nb;
    });
  }, [sessions]);

  const cellMap = useMemo(() => {
    const m = new Map();
    sessions.forEach(s => {
      m.set(`${s.start}-${s.end}|${s.room}`, s);
    });
    return m;
  }, [sessions]);

  if (slots.length === 0) return null;

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="inline-block min-w-full">
        <div className="grid gap-1" style={{ gridTemplateColumns: `100px repeat(${rooms.length}, minmax(180px, 1fr))` }}>
          {/* Header row */}
          <div className="sticky left-0 bg-stone-50 z-10"></div>
          {rooms.map(r => (
            <div key={r} className="text-center font-bold text-sm py-2 bg-stone-900 text-stone-50 rounded-t" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
              {r}
            </div>
          ))}
          {/* Time rows */}
          {slots.map(slot => {
            const [start, end] = slot.split("-");
            return (
              <React.Fragment key={slot}>
                <div className="sticky left-0 bg-stone-50 z-10 text-sm font-bold text-stone-700 py-3 pr-2 text-right" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                  {start}<br/><span className="text-stone-400 font-normal text-xs">–{end}</span>
                </div>
                {rooms.map(room => {
                  const s = cellMap.get(`${start}-${end}|${room}`);
                  if (!s) return <div key={room} className="bg-stone-100/50 rounded min-h-[80px]"></div>;
                  const trackColor = TRACK_COLORS[s.track] || "bg-stone-100 text-stone-900 border-stone-300";
                  const picked = picks.has(s.id);
                  const favorite = favorites.has(s.id);
                  const conflict = conflicts.has(s.id);
                  return (
                    <button
                      key={room}
                      onClick={() => onSelect(s)}
                      className={`text-left rounded p-2 border-2 text-xs transition relative min-h-[80px] ${trackColor} ${
                        favorite ? "ring-2 ring-amber-600 ring-offset-2 shadow-md" :
                        picked ? "ring-2 ring-amber-500 ring-offset-1" : ""
                      } ${picked && conflict && !favorite ? "ring-rose-500" : ""} hover:shadow-md`}
                    >
                      <div className="font-bold leading-tight mb-1 line-clamp-2 pr-5">{s.title}</div>
                      <div className="opacity-80 italic line-clamp-1">{s.speakers.join(", ")}</div>
                      <div className="absolute top-1 right-1 flex gap-0.5 items-center">
                        {favorite && <Crown className="w-3.5 h-3.5 fill-amber-600 text-amber-700" />}
                        {picked && !favorite && <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />}
                      </div>
                    </button>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SessionModal({ session, onClose, togglePick, picks, favorites, toggleFavorite }) {
  const trackColor = TRACK_COLORS[session.track] || "bg-stone-100 text-stone-900 border-stone-300";
  const picked = picks.has(session.id);
  const favorite = favorites.has(session.id);
  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 flex items-center justify-center p-4 no-print" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-stone-200 p-4 flex items-start gap-3">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2 text-xs">
              <span className={`px-2 py-0.5 rounded border font-medium ${trackColor}`}>{session.track}</span>
              <span className="px-2 py-0.5 rounded border border-stone-300 bg-stone-50 text-stone-700">{session.level}</span>
              {session.isKeynote && <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-bold">KEYNOTE</span>}
              {session.isLightning && <span className="px-2 py-0.5 rounded bg-violet-600 text-white font-bold">LIGHTNING</span>}
              {favorite && <span className="px-2 py-0.5 rounded bg-amber-700 text-white font-bold flex items-center gap-1"><Crown className="w-3 h-3" /> FAVORITE</span>}
            </div>
            <h2 className="text-xl font-bold text-stone-900 leading-tight pr-4">{session.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Field label="Speaker(s)" value={session.speakers.join(", ")} />
            <Field label="Room" value={session.room} />
            <Field label="Day" value={session.date === "2026-05-12" ? "Tuesday, 12 May" : "Wednesday, 13 May"} />
            <Field label="Time" value={`${session.start} – ${session.end}`} />
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded p-3 text-sm text-stone-700 italic">
            Full session description and abstract: <a href={`https://techorama.be/schedule/sessions/${session.id}`} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline font-semibold inline-flex items-center gap-1">
              View on techorama.be <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => { togglePick(session.id); }}
              className={`flex-1 min-w-[180px] px-4 py-2 rounded font-semibold flex items-center justify-center gap-2 transition ${
                picked ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-stone-900 text-white hover:bg-stone-800"
              }`}
            >
              {picked ? <><Check className="w-4 h-4" /> Selected — tap to remove</> : <><Star className="w-4 h-4" /> Add to my schedule</>}
            </button>
            {picked && (
              <button
                onClick={() => { toggleFavorite(session.id); }}
                className={`flex-1 min-w-[180px] px-4 py-2 rounded font-semibold flex items-center justify-center gap-2 transition ${
                  favorite ? "bg-amber-700 text-white hover:bg-amber-800" : "bg-white text-amber-700 border-2 border-amber-700 hover:bg-amber-50"
                }`}
                title="Mark as your favorite for this time slot (replaces any other favorite in this slot)"
              >
                <Crown className="w-4 h-4" /> {favorite ? "Favorite — tap to remove" : "Mark as favorite"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-0.5">{label}</div>
      <div className="text-stone-900">{value}</div>
    </div>
  );
}


// Mount
ReactDOM.createRoot(document.getElementById("root")).render(<TechoramaSchedule />);

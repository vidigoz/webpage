# vidigoz

Landing personal + proyectos. Stack: HTML/CSS/JS puro + Netlify Functions.

## Estructura
```
vidigoz/
├── index.html          ← Landing principal
├── tempusverso/
│   └── index.html      ← Visor de historias
├── admin/
│   └── index.html      ← Panel de administración
├── netlify/
│   └── functions/
│       └── claude.js   ← Proxy API Anthropic
└── netlify.toml
```

## Deploy en Netlify
1. Sube este repo a GitHub
2. Conecta en netlify.com → "Add new site → Import from GitHub"
3. Environment variables → Add: `ANTHROPIC_API_KEY = sk-ant-...`
4. Deploy ✦

## localStorage keys (compartidas entre páginas)
- `vg_identity` — nombre, tagline, bio, avatar
- `vg_projects` — tarjetas de proyectos
- `vg_links`    — links de contacto
- `vg_stories`  — historias de Tempusverso

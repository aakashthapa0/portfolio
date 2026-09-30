# Aakash Thapa — Software Engineering Portfolio

Senior Full-Stack Software Engineer with 6+ years of experience architecting high-performance web systems, cloud infrastructure, and AI-powered observability applications.

🌐 **Live Website**: [https://younameit01.github.io/portfolio/](https://younameit01.github.io/portfolio/)

---

## 🌟 Featured Project: MacPulse

A high-performance macOS storage velocity and daemon observability fleet for developer machines and AI workstations.

- **Central Coordinator**: High-throughput asynchronous FastAPI coordinator with sliding-window write velocity anomaly detection and SQLite in Write-Ahead Logging (WAL) mode.
- **Edge Daemons**: Native macOS `launchd` background agents sampling APFS volume stats, write IOPS, and process attribution with <28MB resident memory footprint.
- **Real-Time Streaming**: HTTP/2 Server-Sent Events (SSE) pushing sub-50ms delta metrics to browser clients without polling overhead.
- **Ground-Truth AI Diagnostics**: Strict air-gapped Gemini API diagnostic analysis using only anonymized performance metadata.
- **Interactive 3D Hardware Sculpture**: Custom Three.js system topology visualization with dynamic pulse simulation and hardware-accelerated pointer tilt.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Three.js, Lucide Icons, Custom CSS Glassmorphism
- **Performance & Animations**: Hardware-accelerated 3D perspective transforms, stardust pointer glow, responsive fluid navigation
- **Deployment & CI/CD**: GitHub Actions, GitHub Pages

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/younameit01/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run Oxlint validation
npm run lint

# Build for production
npm run build
```

---

## 📄 License & Contact

- **Author**: [Aakash Thapa](https://www.linkedin.com/in/aakash-thapa-01/)
- **Email**: [aakashthapa.work@gmail.com](mailto:aakashthapa.work@gmail.com)
- **License**: MIT

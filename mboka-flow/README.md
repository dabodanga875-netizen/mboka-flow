# Mboka Flow — Website v2

**Kinshasa sans embouteillage, c'est possible.**

Mboka Flow is a static website prototype for a smart urban mobility and traffic-information platform focused on Kinshasa, Democratic Republic of the Congo.

## GitHub Pages

This repository is ready to publish as a static GitHub Pages site.

### Publish settings

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**.
5. Save.

The site entry point is `index.html`.

## Project structure

```text
mboka-flow/
├── index.html      # Main website page
├── styles.css      # Responsive design and layout
├── script.js       # Front-end interactions and demo behavior
├── .nojekyll       # Keeps GitHub Pages from applying Jekyll processing
├── .gitignore      # Common local files excluded from Git
└── README.md       # Project documentation
```

## Run locally

No build tool is required.

You can open `index.html` directly in a modern browser. For a more realistic local development environment, use a simple local server such as VS Code Live Server.

## Current prototype features

- Responsive Mboka Flow landing page
- Feature overview
- Interactive traffic demonstration map
- Traffic status pins
- Demo place search
- Demo location button
- Community incident-reporting demonstration
- Partnership/contact section
- Mobile navigation
- Responsive design

## Important: prototype status

The traffic map and traffic conditions in this version are **fictitious demonstration data**. The incident form also stores nothing on a server; it only demonstrates the user interface.

The production platform will require, among other components:

- a map provider such as OpenStreetMap-based services or another licensed provider;
- a backend/API;
- a database;
- authorised traffic/GPS/camera/sensor data sources;
- user reporting and moderation;
- privacy and security controls;
- official or institutional data partnerships where available.

## Contact

**Email:** dabodanga2019@gmail.com

## Roadmap

1. Publish the prototype with GitHub Pages.
2. Add Mboka Flow branding/assets.
3. Connect a real interactive map.
4. Build the traffic-data API and database.
5. Add authenticated incident reporting.
6. Add real-time traffic feeds where legally and technically available.
7. Develop the Android/iOS application.

## License

This repository currently contains a project prototype. Add an appropriate open-source or proprietary license before public reuse or commercial distribution.


## Real Kinshasa map

The map uses Leaflet with OpenStreetMap map tiles centered on Kinshasa. The colored traffic markers are still demonstration data. Real-time traffic requires a separate data source/API and backend. Search uses OpenStreetMap Nominatim and should be used within its public service policy limits.

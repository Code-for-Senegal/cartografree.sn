# CartograFreeSenegal

![CartograFreeSenegal Logo](/public/logo.png)

## About the Project

CartograFreeSenegal is a digital memorial documenting the victims of political protest repressions in Senegal between March 2021 and February 2024. The project aims to provide accurate information about the human toll of police violence and to tell the stories of the victims.

This initiative was born in the aftermath of the June 2023 popular uprisings, bringing together a team of journalists, cartographers, and data specialists. Through meticulous documentation and verification, CartograFreeSenegal works to dispel confusion around casualty figures and honor the memory of those who lost their lives.

## Features

- **Interactive Map**: Visualize the geographical distribution of victims across Senegal
- **Victim Profiles**: Detailed information about each victim, including their story and circumstances
- **Statistics**: Comprehensive data analysis by region, age, profession, and time period
- **Video Testimonies**: First-hand accounts from witnesses and family members
- **Social Media Integration**: Easy sharing of victim profiles and statistics

## Tech Stack

- **Frontend Framework**: [Nuxt.js 3](https://nuxt.com/) (Vue.js)
- **UI/Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) with Vue-Chart-3
- **Maps**: [Leaflet](https://leafletjs.com/) with Vue-Leaflet
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Headless CMS**: [Directus](https://directus.io/)
- **Deployment**: Static site generation with Nuxt

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/cartografreesn.git
cd cartografreesn
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```
DIRECTUS_URL=your_directus_api_url
DIRECTUS_TOKEN=your_directus_api_token
GOOGLE_ANALYTICS_ID=your_ga_id
USE_LOCAL_DATA=false
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

### Development with Local Data

For contributors who want to develop without connecting to the API, the project includes local JSON data files in the `assets/data` directory:

- `cartografree_victimes.json`: Contains victim data
- `cartografree_temoignages.json`: Contains testimony data

To use these local files instead of making API calls:

1. Set `USE_LOCAL_DATA=true` in your `.env` file
2. Restart the development server

This allows you to work on the project without needing API credentials, making it easier for open-source contributors to get started.

## Deployment

Build the application for production:
```bash
npm run build
# or
yarn build
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please contact the team through our social media channels.

## Social Media

- [Twitter/X](https://x.com/CartoFreeSn)
- [Facebook](https://www.facebook.com/CartoFreeSn)
- [Instagram](https://www.instagram.com/cartofreesn/)
- [TikTok](https://www.tiktok.com/@cartofreesn)

## Contact

For data requests or other inquiries, please email: [freesenegalcarto@gmail.com](mailto:freesenegalcarto@gmail.com)

## License

This project is dedicated to public information and transparency. All data is freely accessible to media and civil society organizations.

## Acknowledgments

- Amnesty International for data on deaths prior to June 2023
- All the families who shared their stories
- The journalists, cartographers, and data specialists who contributed to this project

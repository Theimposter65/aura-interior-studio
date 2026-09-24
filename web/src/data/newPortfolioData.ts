import { StatementItem, TransformationItem, PricingCategory } from '../types';

export interface StylingPortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryTitle: string;
  tagline: string;
  imageUrl: string;
  location: string;
}

export const statementItems: StatementItem[] = [
  {
    "id": "statement-bar-1",
    "title": "Bar Statements #1",
    "category": "bar",
    "categoryName": "Bar Statements",
    "tagline": "Made to turn the bars into a vibe",
    "imageUrl": "./assets/portfolio/statement_bar_1.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-bar-2",
    "title": "Bar Statements #2",
    "category": "bar",
    "categoryName": "Bar Statements",
    "tagline": "Made to turn the bars into a vibe",
    "imageUrl": "./assets/portfolio/statement_bar_2.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-bar-3",
    "title": "Bar Statements #3",
    "category": "bar",
    "categoryName": "Bar Statements",
    "tagline": "Made to turn the bars into a vibe",
    "imageUrl": "./assets/portfolio/statement_bar_3.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-bar-4",
    "title": "Bar Statements #4",
    "category": "bar",
    "categoryName": "Bar Statements",
    "tagline": "Made to turn the bars into a vibe",
    "imageUrl": "./assets/portfolio/statement_bar_4.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-bar-5",
    "title": "Bar Statements #5",
    "category": "bar",
    "categoryName": "Bar Statements",
    "tagline": "Made to turn the bars into a vibe",
    "imageUrl": "./assets/portfolio/statement_bar_5.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-bar-6",
    "title": "Bar Statements #6",
    "category": "bar",
    "categoryName": "Bar Statements",
    "tagline": "Made to turn the bars into a vibe",
    "imageUrl": "./assets/portfolio/statement_bar_6.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-disco-1",
    "title": "Disco Statements #1",
    "category": "disco",
    "categoryName": "Disco Statements",
    "tagline": "Made to catch the light & attention",
    "imageUrl": "./assets/portfolio/statement_disco_1.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-disco-2",
    "title": "Disco Statements #2",
    "category": "disco",
    "categoryName": "Disco Statements",
    "tagline": "Made to catch the light & attention",
    "imageUrl": "./assets/portfolio/statement_disco_2.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-disco-3",
    "title": "Disco Statements #3",
    "category": "disco",
    "categoryName": "Disco Statements",
    "tagline": "Made to catch the light & attention",
    "imageUrl": "./assets/portfolio/statement_disco_3.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-disco-4",
    "title": "Disco Statements #4",
    "category": "disco",
    "categoryName": "Disco Statements",
    "tagline": "Made to catch the light & attention",
    "imageUrl": "./assets/portfolio/statement_disco_4.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-disco-5",
    "title": "Disco Statements #5",
    "category": "disco",
    "categoryName": "Disco Statements",
    "tagline": "Made to catch the light & attention",
    "imageUrl": "./assets/portfolio/statement_disco_5.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-disco-6",
    "title": "Disco Statements #6",
    "category": "disco",
    "categoryName": "Disco Statements",
    "tagline": "Made to catch the light & attention",
    "imageUrl": "./assets/portfolio/statement_disco_6.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-light-1",
    "title": "Light Statements #1",
    "category": "light",
    "categoryName": "Light Statements",
    "tagline": "For spaces that deserve their own spotlight",
    "imageUrl": "./assets/portfolio/statement_light_1.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-light-2",
    "title": "Light Statements #2",
    "category": "light",
    "categoryName": "Light Statements",
    "tagline": "For spaces that deserve their own spotlight",
    "imageUrl": "./assets/portfolio/statement_light_2.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-light-3",
    "title": "Light Statements #3",
    "category": "light",
    "categoryName": "Light Statements",
    "tagline": "For spaces that deserve their own spotlight",
    "imageUrl": "./assets/portfolio/statement_light_3.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-light-4",
    "title": "Light Statements #4",
    "category": "light",
    "categoryName": "Light Statements",
    "tagline": "For spaces that deserve their own spotlight",
    "imageUrl": "./assets/portfolio/statement_light_4.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-light-5",
    "title": "Light Statements #5",
    "category": "light",
    "categoryName": "Light Statements",
    "tagline": "For spaces that deserve their own spotlight",
    "imageUrl": "./assets/portfolio/statement_light_5.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-light-6",
    "title": "Light Statements #6",
    "category": "light",
    "categoryName": "Light Statements",
    "tagline": "For spaces that deserve their own spotlight",
    "imageUrl": "./assets/portfolio/statement_light_6.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-light-7",
    "title": "Light Statements #7",
    "category": "light",
    "categoryName": "Light Statements",
    "tagline": "For spaces that deserve their own spotlight",
    "imageUrl": "./assets/portfolio/statement_light_7.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-mirror-1",
    "title": "Mirror Statements #1",
    "category": "mirror",
    "categoryName": "Mirror Statements",
    "tagline": "Your space's new selfie corner",
    "imageUrl": "./assets/portfolio/statement_mirror_1.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-mirror-2",
    "title": "Mirror Statements #2",
    "category": "mirror",
    "categoryName": "Mirror Statements",
    "tagline": "Your space's new selfie corner",
    "imageUrl": "./assets/portfolio/statement_mirror_2.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-mirror-3",
    "title": "Mirror Statements #3",
    "category": "mirror",
    "categoryName": "Mirror Statements",
    "tagline": "Your space's new selfie corner",
    "imageUrl": "./assets/portfolio/statement_mirror_3.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-mirror-4",
    "title": "Mirror Statements #4",
    "category": "mirror",
    "categoryName": "Mirror Statements",
    "tagline": "Your space's new selfie corner",
    "imageUrl": "./assets/portfolio/statement_mirror_4.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-mirror-5",
    "title": "Mirror Statements #5",
    "category": "mirror",
    "categoryName": "Mirror Statements",
    "tagline": "Your space's new selfie corner",
    "imageUrl": "./assets/portfolio/statement_mirror_5.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-mirror-6",
    "title": "Mirror Statements #6",
    "category": "mirror",
    "categoryName": "Mirror Statements",
    "tagline": "Your space's new selfie corner",
    "imageUrl": "./assets/portfolio/statement_mirror_6.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-wall-1",
    "title": "Wall Statements #1",
    "category": "wall",
    "categoryName": "Wall Statements",
    "tagline": "Walls into little more personality",
    "imageUrl": "./assets/portfolio/statement_wall_1.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-wall-2",
    "title": "Wall Statements #2",
    "category": "wall",
    "categoryName": "Wall Statements",
    "tagline": "Walls into little more personality",
    "imageUrl": "./assets/portfolio/statement_wall_2.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-wall-3",
    "title": "Wall Statements #3",
    "category": "wall",
    "categoryName": "Wall Statements",
    "tagline": "Walls into little more personality",
    "imageUrl": "./assets/portfolio/statement_wall_3.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-wall-4",
    "title": "Wall Statements #4",
    "category": "wall",
    "categoryName": "Wall Statements",
    "tagline": "Walls into little more personality",
    "imageUrl": "./assets/portfolio/statement_wall_4.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-wall-5",
    "title": "Wall Statements #5",
    "category": "wall",
    "categoryName": "Wall Statements",
    "tagline": "Walls into little more personality",
    "imageUrl": "./assets/portfolio/statement_wall_5.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  },
  {
    "id": "statement-wall-6",
    "title": "Wall Statements #6",
    "category": "wall",
    "categoryName": "Wall Statements",
    "tagline": "Walls into little more personality",
    "imageUrl": "./assets/portfolio/statement_wall_6.webp",
    "priceEstimate": "\u20b95,000 \u2013 \u20b920,000"
  }
];

export const transformationItems: TransformationItem[] = [
  {
    "id": "transform-01",
    "title": "Villa & Room Transformation #01",
    "projectNumber": 1,
    "beforeImageUrl": "./assets/portfolio/transform_01_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_01_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-02",
    "title": "Villa & Room Transformation #02",
    "projectNumber": 2,
    "beforeImageUrl": "./assets/portfolio/transform_02_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_02_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-03",
    "title": "Villa & Room Transformation #03",
    "projectNumber": 3,
    "beforeImageUrl": "./assets/portfolio/transform_03_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_03_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-04",
    "title": "Villa & Room Transformation #04",
    "projectNumber": 4,
    "beforeImageUrl": "./assets/portfolio/transform_04_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_04_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-05",
    "title": "Villa & Room Transformation #05",
    "projectNumber": 5,
    "beforeImageUrl": "./assets/portfolio/transform_05_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_05_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-06",
    "title": "Villa & Room Transformation #06",
    "projectNumber": 6,
    "beforeImageUrl": "./assets/portfolio/transform_06_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_06_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-07",
    "title": "Villa & Room Transformation #07",
    "projectNumber": 7,
    "beforeImageUrl": "./assets/portfolio/transform_07_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_07_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-08",
    "title": "Villa & Room Transformation #08",
    "projectNumber": 8,
    "beforeImageUrl": "./assets/portfolio/transform_08_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_08_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-09",
    "title": "Villa & Room Transformation #09",
    "projectNumber": 9,
    "beforeImageUrl": "./assets/portfolio/transform_09_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_09_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-10",
    "title": "Villa & Room Transformation #10",
    "projectNumber": 10,
    "beforeImageUrl": "./assets/portfolio/transform_10_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_10_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-11",
    "title": "Villa & Room Transformation #11",
    "projectNumber": 11,
    "beforeImageUrl": "./assets/portfolio/transform_11_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_11_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-12",
    "title": "Villa & Room Transformation #12",
    "projectNumber": 12,
    "beforeImageUrl": "./assets/portfolio/transform_12_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_12_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-13",
    "title": "Villa & Room Transformation #13",
    "projectNumber": 13,
    "beforeImageUrl": "./assets/portfolio/transform_13_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_13_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-14",
    "title": "Villa & Room Transformation #14",
    "projectNumber": 14,
    "beforeImageUrl": "./assets/portfolio/transform_14_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_14_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-15",
    "title": "Villa & Room Transformation #15",
    "projectNumber": 15,
    "beforeImageUrl": "./assets/portfolio/transform_15_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_15_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-16",
    "title": "Villa & Room Transformation #16",
    "projectNumber": 16,
    "beforeImageUrl": "./assets/portfolio/transform_16_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_16_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-17",
    "title": "Villa & Room Transformation #17",
    "projectNumber": 17,
    "beforeImageUrl": "./assets/portfolio/transform_17_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_17_after.webp",
    "roomType": "Living & Lounge Sanctuary",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  },
  {
    "id": "transform-18",
    "title": "Villa & Room Transformation #18",
    "projectNumber": 18,
    "beforeImageUrl": "./assets/portfolio/transform_18_before.webp",
    "afterImageUrl": "./assets/portfolio/transform_18_after.webp",
    "roomType": "Airbnb Villa Suite",
    "description": "Full spatial revitalization including palette harmonisation, feature wall execution, and custom curated artwork styling."
  }
];

export const stylingPortfolioItems: StylingPortfolioItem[] = [
  {
    "id": "styling-abstract-1",
    "title": "Abstract Works #1",
    "category": "abstract",
    "categoryTitle": "Abstract Works",
    "tagline": "Emotive Textures, Earth Pigments & Gold Accents",
    "imageUrl": "./assets/portfolio/styling_abstract_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-abstract-2",
    "title": "Abstract Works #2",
    "category": "abstract",
    "categoryTitle": "Abstract Works",
    "tagline": "Emotive Textures, Earth Pigments & Gold Accents",
    "imageUrl": "./assets/portfolio/styling_abstract_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-abstract-3",
    "title": "Abstract Works #3",
    "category": "abstract",
    "categoryTitle": "Abstract Works",
    "tagline": "Emotive Textures, Earth Pigments & Gold Accents",
    "imageUrl": "./assets/portfolio/styling_abstract_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-abstract-4",
    "title": "Abstract Works #4",
    "category": "abstract",
    "categoryTitle": "Abstract Works",
    "tagline": "Emotive Textures, Earth Pigments & Gold Accents",
    "imageUrl": "./assets/portfolio/styling_abstract_4.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-abstract-5",
    "title": "Abstract Works #5",
    "category": "abstract",
    "categoryTitle": "Abstract Works",
    "tagline": "Emotive Textures, Earth Pigments & Gold Accents",
    "imageUrl": "./assets/portfolio/styling_abstract_5.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-abstract-6",
    "title": "Abstract Works #6",
    "category": "abstract",
    "categoryTitle": "Abstract Works",
    "tagline": "Emotive Textures, Earth Pigments & Gold Accents",
    "imageUrl": "./assets/portfolio/styling_abstract_6.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-abstract-7",
    "title": "Abstract Works #7",
    "category": "abstract",
    "categoryTitle": "Abstract Works",
    "tagline": "Emotive Textures, Earth Pigments & Gold Accents",
    "imageUrl": "./assets/portfolio/styling_abstract_7.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-abstract-8",
    "title": "Abstract Works #8",
    "category": "abstract",
    "categoryTitle": "Abstract Works",
    "tagline": "Emotive Textures, Earth Pigments & Gold Accents",
    "imageUrl": "./assets/portfolio/styling_abstract_8.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-airbnbs-1",
    "title": "Interior Styling for Airbnbs #1",
    "category": "airbnbs",
    "categoryTitle": "Interior Styling for Airbnbs",
    "tagline": "Complete Space Makeovers for Experiential Holiday Rentals",
    "imageUrl": "./assets/portfolio/styling_airbnbs_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-airbnbs-2",
    "title": "Interior Styling for Airbnbs #2",
    "category": "airbnbs",
    "categoryTitle": "Interior Styling for Airbnbs",
    "tagline": "Complete Space Makeovers for Experiential Holiday Rentals",
    "imageUrl": "./assets/portfolio/styling_airbnbs_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-airbnbs-3",
    "title": "Interior Styling for Airbnbs #3",
    "category": "airbnbs",
    "categoryTitle": "Interior Styling for Airbnbs",
    "tagline": "Complete Space Makeovers for Experiential Holiday Rentals",
    "imageUrl": "./assets/portfolio/styling_airbnbs_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-airbnbs-4",
    "title": "Interior Styling for Airbnbs #4",
    "category": "airbnbs",
    "categoryTitle": "Interior Styling for Airbnbs",
    "tagline": "Complete Space Makeovers for Experiential Holiday Rentals",
    "imageUrl": "./assets/portfolio/styling_airbnbs_4.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bar_tables-1",
    "title": "Doodling on Bar Tables #1",
    "category": "bar_tables",
    "categoryTitle": "Doodling on Bar Tables",
    "tagline": "Bespoke Illustrated Surface Detailing on Tables & Furniture",
    "imageUrl": "./assets/portfolio/styling_bar_tables_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bar_tables-2",
    "title": "Doodling on Bar Tables #2",
    "category": "bar_tables",
    "categoryTitle": "Doodling on Bar Tables",
    "tagline": "Bespoke Illustrated Surface Detailing on Tables & Furniture",
    "imageUrl": "./assets/portfolio/styling_bar_tables_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bar_tables-3",
    "title": "Doodling on Bar Tables #3",
    "category": "bar_tables",
    "categoryTitle": "Doodling on Bar Tables",
    "tagline": "Bespoke Illustrated Surface Detailing on Tables & Furniture",
    "imageUrl": "./assets/portfolio/styling_bar_tables_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bars_collage-1",
    "title": "Painting Collage for Bars #1",
    "category": "bars_collage",
    "categoryTitle": "Painting Collage for Bars",
    "tagline": "Vibrant Multi-Panel Artwork for High-Energy Social Lounges",
    "imageUrl": "./assets/portfolio/styling_bars_collage_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bars_collage-2",
    "title": "Painting Collage for Bars #2",
    "category": "bars_collage",
    "categoryTitle": "Painting Collage for Bars",
    "tagline": "Vibrant Multi-Panel Artwork for High-Energy Social Lounges",
    "imageUrl": "./assets/portfolio/styling_bars_collage_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bars_collage-3",
    "title": "Painting Collage for Bars #3",
    "category": "bars_collage",
    "categoryTitle": "Painting Collage for Bars",
    "tagline": "Vibrant Multi-Panel Artwork for High-Energy Social Lounges",
    "imageUrl": "./assets/portfolio/styling_bars_collage_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bars_collage-4",
    "title": "Painting Collage for Bars #4",
    "category": "bars_collage",
    "categoryTitle": "Painting Collage for Bars",
    "tagline": "Vibrant Multi-Panel Artwork for High-Energy Social Lounges",
    "imageUrl": "./assets/portfolio/styling_bars_collage_4.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bars_collage-5",
    "title": "Painting Collage for Bars #5",
    "category": "bars_collage",
    "categoryTitle": "Painting Collage for Bars",
    "tagline": "Vibrant Multi-Panel Artwork for High-Energy Social Lounges",
    "imageUrl": "./assets/portfolio/styling_bars_collage_5.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bars_collage-6",
    "title": "Painting Collage for Bars #6",
    "category": "bars_collage",
    "categoryTitle": "Painting Collage for Bars",
    "tagline": "Vibrant Multi-Panel Artwork for High-Energy Social Lounges",
    "imageUrl": "./assets/portfolio/styling_bars_collage_6.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-bars_collage-7",
    "title": "Painting Collage for Bars #7",
    "category": "bars_collage",
    "categoryTitle": "Painting Collage for Bars",
    "tagline": "Vibrant Multi-Panel Artwork for High-Energy Social Lounges",
    "imageUrl": "./assets/portfolio/styling_bars_collage_7.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-cafes-1",
    "title": "Painting Collage for Cafes #1",
    "category": "cafes",
    "categoryTitle": "Painting Collage for Cafes",
    "tagline": "Artisanal Aesthetics Elevated Through Harmonious Palette Works",
    "imageUrl": "./assets/portfolio/styling_cafes_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-cafes-2",
    "title": "Painting Collage for Cafes #2",
    "category": "cafes",
    "categoryTitle": "Painting Collage for Cafes",
    "tagline": "Artisanal Aesthetics Elevated Through Harmonious Palette Works",
    "imageUrl": "./assets/portfolio/styling_cafes_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-cafes-3",
    "title": "Painting Collage for Cafes #3",
    "category": "cafes",
    "categoryTitle": "Painting Collage for Cafes",
    "tagline": "Artisanal Aesthetics Elevated Through Harmonious Palette Works",
    "imageUrl": "./assets/portfolio/styling_cafes_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-cafes-4",
    "title": "Painting Collage for Cafes #4",
    "category": "cafes",
    "categoryTitle": "Painting Collage for Cafes",
    "tagline": "Artisanal Aesthetics Elevated Through Harmonious Palette Works",
    "imageUrl": "./assets/portfolio/styling_cafes_4.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-cafes-5",
    "title": "Painting Collage for Cafes #5",
    "category": "cafes",
    "categoryTitle": "Painting Collage for Cafes",
    "tagline": "Artisanal Aesthetics Elevated Through Harmonious Palette Works",
    "imageUrl": "./assets/portfolio/styling_cafes_5.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-1",
    "title": "Customised Artworks #1",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-2",
    "title": "Customised Artworks #2",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-3",
    "title": "Customised Artworks #3",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-4",
    "title": "Customised Artworks #4",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_4.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-5",
    "title": "Customised Artworks #5",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_5.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-6",
    "title": "Customised Artworks #6",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_6.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-7",
    "title": "Customised Artworks #7",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_7.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-8",
    "title": "Customised Artworks #8",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_8.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-customised-9",
    "title": "Customised Artworks #9",
    "category": "customised",
    "categoryTitle": "Customised Artworks",
    "tagline": "Personalized Canvas & Commissioned Heritage Keepsakes",
    "imageUrl": "./assets/portfolio/styling_customised_9.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-doodling_walls-1",
    "title": "Doodling on Walls #1",
    "category": "doodling_walls",
    "categoryTitle": "Doodling on Walls",
    "tagline": "Custom Theme-Based Line Art for Cafeterias & Creative Corners",
    "imageUrl": "./assets/portfolio/styling_doodling_walls_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-doodling_walls-2",
    "title": "Doodling on Walls #2",
    "category": "doodling_walls",
    "categoryTitle": "Doodling on Walls",
    "tagline": "Custom Theme-Based Line Art for Cafeterias & Creative Corners",
    "imageUrl": "./assets/portfolio/styling_doodling_walls_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-doodling_walls-3",
    "title": "Doodling on Walls #3",
    "category": "doodling_walls",
    "categoryTitle": "Doodling on Walls",
    "tagline": "Custom Theme-Based Line Art for Cafeterias & Creative Corners",
    "imageUrl": "./assets/portfolio/styling_doodling_walls_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-doodling_walls-4",
    "title": "Doodling on Walls #4",
    "category": "doodling_walls",
    "categoryTitle": "Doodling on Walls",
    "tagline": "Custom Theme-Based Line Art for Cafeterias & Creative Corners",
    "imageUrl": "./assets/portfolio/styling_doodling_walls_4.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-doodling_walls-5",
    "title": "Doodling on Walls #5",
    "category": "doodling_walls",
    "categoryTitle": "Doodling on Walls",
    "tagline": "Custom Theme-Based Line Art for Cafeterias & Creative Corners",
    "imageUrl": "./assets/portfolio/styling_doodling_walls_5.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-exhibitions-1",
    "title": "Exhibitions & Collaborations #1",
    "category": "exhibitions",
    "categoryTitle": "Exhibitions & Collaborations",
    "tagline": "Curated Gallery Installations & Design Fairs",
    "imageUrl": "./assets/portfolio/styling_exhibitions_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-exhibitions-2",
    "title": "Exhibitions & Collaborations #2",
    "category": "exhibitions",
    "categoryTitle": "Exhibitions & Collaborations",
    "tagline": "Curated Gallery Installations & Design Fairs",
    "imageUrl": "./assets/portfolio/styling_exhibitions_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-exhibitions-3",
    "title": "Exhibitions & Collaborations #3",
    "category": "exhibitions",
    "categoryTitle": "Exhibitions & Collaborations",
    "tagline": "Curated Gallery Installations & Design Fairs",
    "imageUrl": "./assets/portfolio/styling_exhibitions_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-exhibitions-4",
    "title": "Exhibitions & Collaborations #4",
    "category": "exhibitions",
    "categoryTitle": "Exhibitions & Collaborations",
    "tagline": "Curated Gallery Installations & Design Fairs",
    "imageUrl": "./assets/portfolio/styling_exhibitions_4.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-exhibitions-5",
    "title": "Exhibitions & Collaborations #5",
    "category": "exhibitions",
    "categoryTitle": "Exhibitions & Collaborations",
    "tagline": "Curated Gallery Installations & Design Fairs",
    "imageUrl": "./assets/portfolio/styling_exhibitions_5.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_interiors-1",
    "title": "Paintings for Hotel Interiors #1",
    "category": "hotel_interiors",
    "categoryTitle": "Paintings for Hotel Interiors",
    "tagline": "Bespoke Suites & Lobby Artwork Collections",
    "imageUrl": "./assets/portfolio/styling_hotel_interiors_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_interiors-2",
    "title": "Paintings for Hotel Interiors #2",
    "category": "hotel_interiors",
    "categoryTitle": "Paintings for Hotel Interiors",
    "tagline": "Bespoke Suites & Lobby Artwork Collections",
    "imageUrl": "./assets/portfolio/styling_hotel_interiors_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_interiors-3",
    "title": "Paintings for Hotel Interiors #3",
    "category": "hotel_interiors",
    "categoryTitle": "Paintings for Hotel Interiors",
    "tagline": "Bespoke Suites & Lobby Artwork Collections",
    "imageUrl": "./assets/portfolio/styling_hotel_interiors_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_interiors-4",
    "title": "Paintings for Hotel Interiors #4",
    "category": "hotel_interiors",
    "categoryTitle": "Paintings for Hotel Interiors",
    "tagline": "Bespoke Suites & Lobby Artwork Collections",
    "imageUrl": "./assets/portfolio/styling_hotel_interiors_4.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_interiors-5",
    "title": "Paintings for Hotel Interiors #5",
    "category": "hotel_interiors",
    "categoryTitle": "Paintings for Hotel Interiors",
    "tagline": "Bespoke Suites & Lobby Artwork Collections",
    "imageUrl": "./assets/portfolio/styling_hotel_interiors_5.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_interiors-6",
    "title": "Paintings for Hotel Interiors #6",
    "category": "hotel_interiors",
    "categoryTitle": "Paintings for Hotel Interiors",
    "tagline": "Bespoke Suites & Lobby Artwork Collections",
    "imageUrl": "./assets/portfolio/styling_hotel_interiors_6.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_murals-1",
    "title": "Wall Murals for Hotel Rooms #1",
    "category": "hotel_murals",
    "categoryTitle": "Wall Murals for Hotel Rooms",
    "tagline": "Floor-to-Ceiling Botanical & Architectural Feature Walls",
    "imageUrl": "./assets/portfolio/styling_hotel_murals_1.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_murals-2",
    "title": "Wall Murals for Hotel Rooms #2",
    "category": "hotel_murals",
    "categoryTitle": "Wall Murals for Hotel Rooms",
    "tagline": "Floor-to-Ceiling Botanical & Architectural Feature Walls",
    "imageUrl": "./assets/portfolio/styling_hotel_murals_2.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_murals-3",
    "title": "Wall Murals for Hotel Rooms #3",
    "category": "hotel_murals",
    "categoryTitle": "Wall Murals for Hotel Rooms",
    "tagline": "Floor-to-Ceiling Botanical & Architectural Feature Walls",
    "imageUrl": "./assets/portfolio/styling_hotel_murals_3.webp",
    "location": "Goa & Gujarat Studios"
  },
  {
    "id": "styling-hotel_murals-4",
    "title": "Wall Murals for Hotel Rooms #4",
    "category": "hotel_murals",
    "categoryTitle": "Wall Murals for Hotel Rooms",
    "tagline": "Floor-to-Ceiling Botanical & Architectural Feature Walls",
    "imageUrl": "./assets/portfolio/styling_hotel_murals_4.webp",
    "location": "Goa & Gujarat Studios"
  }
];

export const pricingCategories: PricingCategory[] = [
  {
    id: 'doodling',
    title: 'Custom Doodling',
    tagline: 'Thematic wall & surface illustration',
    badge: 'Popular for Cafes',
    items: [
      { label: 'Minimal Styling', rate: '₹350 / sq ft', subtext: 'Clean architectural line art, accent corners, monochrome flow' },
      { label: 'Detailed Artwork', rate: '₹550 / sq ft', subtext: 'Intricate storytelling motifs, dense character grids, customized narratives' }
    ]
  },
  {
    id: 'murals',
    title: 'Wall Murals',
    tagline: 'Floor-to-ceiling spatial statements',
    badge: 'High Impact',
    items: [
      { label: 'Minimal Mural', rate: '₹550 / sq ft', subtext: 'Organic abstracts, gentle botanical silhouettes, soft earth tones' },
      { label: 'Detailed Architectural Mural', rate: '₹850 / sq ft', subtext: 'Rich textures, layered heritage vistas, metallic leaf finishes' }
    ]
  },
  {
    id: 'paintings',
    title: 'Original Paintings & Prints',
    tagline: 'Hand-painted canvas & museum editions',
    badge: 'Worldwide Shipping',
    items: [
      { label: '10 × 10 in', rate: 'Canvas: ₹4,500', subtext: 'Print Edition: ₹3,000' },
      { label: '20 × 15 in', rate: 'Canvas: ₹14,500', subtext: 'Print Edition: ₹7,000' },
      { label: '30 × 20 in', rate: 'Canvas: ₹29,500', subtext: 'Print Edition: ₹12,000' }
    ]
  },
  {
    id: 'interior-design',
    title: 'Interior Design & Styling',
    tagline: 'Holistic spatial transformation (10×10 ft standard room)',
    badge: 'Turnkey Styling',
    items: [
      { label: 'Spatial Concept & Design', rate: '₹12,000', subtext: 'Moodboards, palette curation, lighting & art placement schema' },
      { label: 'Turnkey Execution', rate: '₹17,000', subtext: 'On-site execution, art installation management & staging (excl. installation)' }
    ]
  },
  {
    id: 'statement-pieces',
    title: 'Statement Pieces',
    tagline: 'Bespoke art mirrors, disco objects & custom lighting',
    badge: 'Signature Atelier',
    items: [
      { label: 'Bespoke Statement Objects', rate: '₹5,000 – ₹20,000', subtext: 'Custom disco art, illuminated mirrors, neon-art fusion, cocktail bar accents' }
    ]
  }
];

export const PRICING_FOOTNOTE = 'All prices excluding material and frame charges.';

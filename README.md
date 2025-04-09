# 🎯 A Basic & Modern Funnelback Implementation

## 🚀 React + TypeScript + Vite + Funnelback

This repository showcases a modern and efficient way to build a **React** application for integrating with **Squiz Matrix** and **Funnelback**. It compiles clean, minimal **CSS and JavaScript** files designed for Matrix consumption.

By leveraging Matrix’s ability to generate XML and Funnelback’s flexibility with that format, this approach streamlines building powerful search UIs with minimal friction.

---

## 📦 XML Processing & Funnelback Configuration

Funnelback is optimized for indexing **XML**, which allows it to efficiently process thousands of structured records. We use **Asset Listings** in Matrix to construct valid XML for Funnelback to crawl.

### 🔧 XML Setup Steps

1. **Create an Asset Listing**  
   Structure your output with proper XML, including a declaration:  
   `<?xml version="1.0" encoding="UTF-8"?>`

2. **Generate an XML File**  
   Store the structured XML in a separate asset.

3. **Automate XML Updates**

   - Create a **trigger** using the **metadata time method** (based on the cron job).
   - Use `asset_contents_raw` to update the XML file contents from the Asset Listing.

4. **Fix URL Path Issues**

   - Disable **"Allow Unrestricted Access"** to prevent URLs using `/__data`.
   - This ensures proper caching behavior.

5. **Pass XML to Funnelback**
   - Use the URL of the XML file as the **Start URL** in Funnelback’s crawler settings.

### ⚙️ Funnelback Configuration

Funnelback setup only requires two core plugins:

- **XML & HTML Splitting** — Configure this to match your XML structure.
- **Autocomplete** — Enable after indexing completes.

Don’t forget to set up metadata mappings to match your XML schema.

🔗 **Example Configuration:**  
You can reference an example from this DXP tenant:  
[NTU Search Packages – Funnelback](https://dxp02-uk-admin.funnelback.squiz.cloud/d/client/ntu/search-packages/ntu~sp-image-search/)  
Check the **data source** section to align your own configuration.

---

## ⚛️ React App Overview

This frontend is built with:

- **React (TypeScript)**
- **Material UI (MUI)**
- **Vite** for lightning-fast development

### 🌟 Design Principles

- **Pure Functions** for helpers
- **Axios utilities** for all API requests
- **Components** drive all state and view logic
- **React Context** for global state

### ✅ Features

- 🔍 **Autocomplete search box**
- 📄 **Results display with pagination**
- ⭐ **Best Bets & metadata field mappings**
- 🧩 Extendable **faceted search support**

The `index.html` file shows how to structure the target `<div>` in Matrix to pass props directly into the React app for search requests.

---

## 🛠️ DevOps & Deployment

This repo follows the convention used in:  
🔗 [Squiz Boilerplates – Kernel](https://gitlab.squiz.net/services/boilerplates/kernel)

### 🚧 GitLab CI/CD Setup

For guidance on CI/CD pipelines and Git Bridge, refer to:  
🔗 [How to Set Up a Git Bridge](https://matrix.squiz.net/tutorials/2018/how-to-set-up-a-git-bridge#configuring-the-repository)

### 🔄 Modifications in This Repo

- ✅ **Linting removed** for simplicity
- ✅ Default **deploy branch**: `deploy/prod`
- ✅ Uses standard **GitLab CI/CD config**, or you can add a custom one

---

## 🧪 Getting Started

To begin local development:

````bash
# Install dependencies
npm install

# Start the dev server
npm run dev

## 📋 Final Setup Instructions

Once the project is running, follow these steps to tailor it to your data model and environment:

- ✍️ **Update the typing** in `DataState.tsx` to match the structure of your expected XML data.
- 🛠️ **Update the typings and layout** in `Results.tsx` and `Result.tsx` to match your client’s content model.
- 🧱 **Modify the HTML structure** in `Results.tsx` as needed for layout and design.
- 🎛️ **Adjust** `Facets.tsx` to render your facet UI.
- 🔢 **Set the** `facetTypes` **array** in `DataState.tsx` to define the order your facets appear in.
- 🎨 **Add any custom SCSS** if required for styling.
- 📦 **Build the final output:**


```bash
npm run build
````

- 📁 **Upload** the output files (typically found in `dist/`) to **Squiz Matrix**.
- 🧩 **Embed the assets** in a Matrix page — and voilà, your search app is live!

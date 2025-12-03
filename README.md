# Samanyastra Hackathon December 2025

## Setup Instructions

### How to Setup

1. **Clone this repository**
   ```bash
   git clone <repository-url>
   cd samanyastra_hackathon_2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

---

## Hackathon Guidelines

### Portfolio Component

For this hackathon, you need to work with the **Portfolio** component located in the `src/Portfolio/` directory. You can replace everything inside this component to create your own portfolio page.

### Important Rules

#### CSS & Styling
- ❌ **DO NOT** use external libraries like Bootstrap or Tailwind
- ✅ You can use your **own CSS**
- ✅ You can use **Material UI** only

#### Data Management
- 📋 All data in the portfolio page **must be dynamic**
- ❌ **NO hardcoding** of names or any other information
- ✅ All data must be taken from **`data.js`**
- ⚠️ **Do NOT change the structure** of the JSON in `data.js`
- ⚠️ If you add any extra fields, **mention them during submission**

---

## Testing

### Responsiveness Testing

1. **Basic Test**: Use your screen's responsiveness tools in the browser

2. **Preview Route**: Visit the preview route to check responsiveness on multiple devices
   ```
   http://localhost:5173/preview
   ```
   This route allows you to test your portfolio on various screen sizes.
3. **Edge cases**: Edge case testing can include do not showing section when data is not present in data.js and UI remains smooth. 

---

## Merit Criteria

Your submission will be evaluated based on:

1. **Responsiveness** - How well your portfolio adapts to different screen sizes
2. **Less Number of Components** - Efficiency in component architecture
3. **Sticking to the Rules** - Following all guidelines mentioned above
4. **Submission on Time** - Timely submission of your work

---

## Good Luck! 🚀

Make sure to test your portfolio thoroughly before submission and ensure all rules are followed.

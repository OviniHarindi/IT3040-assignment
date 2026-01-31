# IT3040 – Assignment 01
## Singlish to Sinhala Converter – Test Automation (Playwright)

### Assignment Overview
This assignment evaluates the ability to **test a real‑world system**, design an **automation testing strategy**, and **analyze weaknesses** in a structured manner.

**Option 1 – Sinhala Language Based Testing**
The system under test converts **Singlish (Romanized Sinhala)** input into **Sinhala Unicode** output. The focus of this assignment is:
*   Accuracy of **Singlish → Sinhala conversion**
*   Stability and usability of the **user interface** under different input conditions

**Out of Scope:**
*   Backend APIs
*   Performance testing
*   Security testing


### 🛠 Technologies Used
*   **Node.js**
*   **Playwright** (UI automation)
*   **JavaScript**
*   **Git & GitHub** (version control)

### Project Structure
text
IT23276550/
│
├── node_modules/         # Project dependencies
│
├── playwright-report/    # HTML test reports
│   ├── data/
│   └── index.html
│
├── test-results/         # Playwright execution artifacts
│
├── tests/
│   └── singlish-to-sinhala-assignment.spec.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md


### Test Coverage Summary

**✅ Positive Test Cases (24)**
These verify that **valid Singlish input** is correctly converted into **Sinhala output**.

| Category | Number of Test Cases |
| : | : |
| Small | 13 |
| Medium | 9 |
| Large | 2 |
| **Total** | **24** |

**Examples:**
*   "mama dhannee naee." → "මම දන්නේ නෑ."
*   "oyaalaa enavadha?" → "ඔයාලා එනවාද?"

**❌ Negative Test Cases (11)**
These validate system behavior for **invalid, incomplete, or unexpected inputs**.

| Category | Number of Test Cases |
| : | : |
| Small | 7 |
| Medium | 3 |
| **Total** | **10** |

**Examples:**
*   Empty input
*   Mixed English and Sinhala
*   Random characters / symbols
*   Unsupported Singlish patterns



### How to Run the Project

**1. Clone the Repository**
git clone https://github.com/OviniHarindi/IT3040-assignment.git
cd IT3040-assignment

**2. Install Dependencies**
npm install

**3. Install Playwright Browsers**
npx playwright install

**4. Run All Test Cases**
npx playwright test

**5. Run Tests with UI (Optional)**
npx playwright test --ui

**6. View HTML Test Report**
npx playwright show-report

### Automation Strategy
*   Tests are organized based on **input size and complexity**.
*   Each test validates:
    *   User input
    *   Converted Sinhala output
    *   UI stability
*   Assertions compare **expected Sinhala Unicode output** with actual output.

### Limitations Identified
*   Some complex Singlish spellings are not consistently converted.
*   No suggestion or error message for invalid inputs.
*   Conversion accuracy depends heavily on predefined mappings.

### Conclusion
This project successfully demonstrates **UI automation testing** for a Sinhala language–based system using **Playwright**. The test cases validate both **correct behavior** and **error handling**, providing a structured evaluation of system accuracy and usability.

**Author**
**Harindi M O**
IT23276550
IT3040
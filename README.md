# WIT-Hackathon---METech-2025
WIT Hackathon - METech 2025

Home → Information → Game (Level 1) → Case Study → Game (Level 2) → Case Study → ...

# Deepfake Education Game – Level Design & Flow

This project is an educational game designed to teach users about AI-generated deepfakes, how to detect them, and the impact they can have.

---

##  Levels Overview

###  Levels 1–3: Image Choice

**Game Logic**
- Show **3 images per level** (`f1(1).jpg`, `f1(2).jpg`, …).
- Player chooses **Real** or **Deepfake** for each image.
- Must get **2 out of 3 correct** to pass.
- After passing → **Case Study Page**

**Case Study After Level 1: How Deepfake Abuse Happens (Reworded)**

> Many deepfakes targeting young people are made with “nudify” apps — tools that remove clothing from photos to create fake explicit images.  
> 
> - Victims may have never shared explicit photos — selfies, school pictures, or social media posts are enough.  
> - These tools are cheap, easy to use, and widely available.  
> - The fakes are shared as jokes, bullying, or coercion.  
> - Even when known to be fake, the emotional harm is real — humiliation, shame, fear.

---

### Levels 4–6: Ball Roll Challenge

**Game Logic**
- Show **1 image at a time**.
- Player must roll a **2D ball**:
  - **Left** = Real
  - **Right** = Fake  
- Player has **3 seconds to choose**.
- Needs **2/3 correct per level** to pass.
- After passing → **Case Study Page**

**Case Study After Level 4: Who is Affected **

> **Targets:** Anyone can be targeted — students, teachers, friends. All it takes is one image and the wrong app. Victims may feel fear, shame, anger, or confusion.  
> **Bystanders:** People who see fake images online may not know how to act or may fear becoming the next target.  
> **Creators:** Some create deepfakes as jokes or experiments without realizing it may be illegal and harmful.

---

### Levels 7–9: Find the Fake

**Game Logic**
- Show **4 images side by side**.
- Player must **circle the fake one**.
- Needs **2/3 correct per level** to pass.
- After passing → **Short Tip Pop-Up**
  - Teach users about detection tools like:
    - Reverse image search
    - AI-generated watermark detection
    - Spotting facial inconsistencies

---

###  Level 10: More information



## Project structure: Deepfake Education App
```text
src/
 ├── pages/
 │   ├── Home.jsx              # 3 modules (Information, Case Study, Game)
 │   ├── Information.jsx       # Intro to AI & Deepfakes
 │   ├── CaseStudy.jsx         # Displays case study per level
 │   └── Game.jsx              # Handles level progression
 │
 ├── levels/
 │   ├── Level1-3.jsx          # Image choice levels
 │   ├── Level4-6.jsx          # Ball roll challenge
 │   ├── Level7-9.jsx          # Find the fake
 │   └── Level10.jsx           # more information
 │
 └── assets/
     ├── images/               # f1(1).jpg, f1(2).jpg, ...
     └── caseStudies.json      # Text for each case study page

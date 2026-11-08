# PROMPTS — How the prototype was built

MGMT 6108 Decision Architecture for Managers · Group G1

## Toolchain

- **Google Stitch:** designed the UI screens.
- **Google AI Studio (Build mode):** generated and edited the app. It is a React + Vite + TypeScript + Tailwind app, and each turn has a checkpoint we could restore.
- **GitHub:** stores the code.
- **Vercel (Hobby):** deploys the app automatically from GitHub at https://01111pp.vercel.app/

Each prompt below was sent in the AI Studio Build chat, in this order. Prompts are copied as sent.

---

## Turn 0 — Base app (Shopee SG home page)

The base app ("Shopee SG – Daily Discover & Mega Sale") was generated from our Google Stitch exports: a screenshot, the HTML export and the markdown export.

> _[Paste the original AI Studio prompt here if it was saved.]_

---

## Turn 1 — Cart voucher fix

**Why:** while auditing the generated code, we found that a voucher's minimum spend was shown but never enforced.

```
In the cart, if a voucher's minSpend is higher than the selected items' subtotal, grey it out, show "Spend $X more to use", and make it unselectable. Do not change anything else.
```

**Result:** only the cart drawer changed. Vouchers below their threshold now show how much more the user needs to spend.

---

## Turn 2 — Discussion tab, Contributor Tier, first A/B version

```
Make the following changes to this app. Keep all existing screens and features exactly as they are. Use mock data only, no backend.

1. Product detail page: add a "Discussion" tab with mock buyer posts that fit each product (both good and bad experiences). Each post has Agree / Disagree buttons with counts that change when clicked; posts with 10+ agrees show a "Helpful" badge. The seller can have one public reply under a post. Add a "Disputes" filter for posts where the buyer and seller disagree. At the top, pin the most helpful positive post and the most helpful critical post side by side.

2. In the Discussion tab, add a "Write a post" button that opens a form with guided questions: "Did it match the description?", "Quality / size?", "Would you buy again?", plus a text box. Submitted posts appear at the top of the list. For the demo, a newly submitted post automatically gains Agree votes over a few seconds until it reaches 10 and becomes Helpful.

3. Me screen: replace the fixed "Platinum Tier" box with a "Contributor Tier" card: Bronze / Silver / Gold based on the number of the user's posts that became Helpful (Silver = 2, Gold = 10). Show a progress bar and the rewards: profile decoration, a small voucher, and priority access to flash deals. The card updates when the user's post becomes Helpful.

4. A/B versions controlled by the URL: ?v=A or ?v=B. If there is no parameter, assign A or B randomly and remember it in localStorage. The two versions must be identical except for the Contributor Tier:
   - A: new users start at Bronze. Text: "Write 2 more helpful posts to earn Silver."
   - B: new users start at Silver with priority access already unlocked. Text: "Write 1 helpful post this month to keep your Silver status and priority access."
```

**Problem we noticed afterwards:** A and B asked for different amounts of effort (2 posts vs. 1 post) and different time windows (no deadline vs. this month). That confounds effort with framing. Turn 3 fixes it.

---

## Turn 3 — Fixing the A/B design

```
Please make these fixes. Do not change anything else.

1. Hide the "Ver A / Ver B" toggle from normal users. Show it only when the URL contains debug=1 (for example ?v=A&debug=1).

2. Both versions must require the same effort and the same time window. Only the starting tier and the wording differ:
   - A: user starts at Bronze. Text: "Write 2 helpful posts this month to earn Silver and unlock priority access." Progress: "0 / 2 this month".
   - B: user starts at Silver with rewards already unlocked. Text: "Write 2 helpful posts this month to keep your Silver status and priority access." Progress: "0 / 2 this month".

3. In version B the rewards header says "2 of 3 Unlocked" but all three rewards look unlocked. Make the header match what is shown.

4. When the user reaches 2 helpful posts this month: in A show "You earned Silver!" and unlock the rewards; in B show "You kept your Silver status for this month!".
```

---

## Turn 4 — Discussion moved to the main app, Community Court, points

**Why:** we wanted discussion organised by product category on the main app, not hidden inside each product page. We also wanted buyers to be able to escalate a private dispute with a seller to the community, and a tier that shows progress toward a goal.

```
Please make these changes. Keep all other screens and features as they are. Use mock data only.

1. Move Discussion to the main app:
   - Add a "Discussion" tab to the bottom navigation.
   - Remove the Discussion tab from the product detail page.
   - The Discussion screen has a search bar ("Search a category or product"), category chips (Electronics, Beauty, Fashion, Home, Groceries), and two sections: "Discussions" and "Community Court".
   - Each post shows the author's tier badge (Bronze / Silver / Gold). Keep Agree/Disagree, the Helpful badge at 10+ agrees, seller replies, the pinned most helpful positive and critical posts, and the "Write a post" form (add a category picker). Sort by Most helpful / Newest.

2. Seller chat and Community Court:
   - Add a buyer-seller chat (open it from the "Chat" button on the product page) with a mock conversation where the buyer complains about product quality and the seller disagrees.
   - In that chat add a button "Ask the Community". It creates a Court case in Community Court with: product, category, the buyer's claim, photos, and the chat excerpt with names, phone numbers and addresses masked.
   - Each case has a "Seller's statement" section. If the seller has not replied yet, show "Seller has been notified and has 48 hours to respond".
   - Voting options: "Buyer is right", "Seller is right", "Not enough information". The vote buttons unlock only after the user has expanded both the buyer's claim and the seller's statement. One vote per user. Voting closes in 3 days with a countdown, then shows the result bar.
   - Show a small note: "The community verdict is advisory. Refunds follow Shopee's official dispute process."

3. Contributor Tier progress (points this month):
   - Every user starts with 20 points ("Welcome bonus"). Silver needs 100 points this month.
   - Points: write a post +20, your post becomes Helpful +30, vote on a Court case +10. Show a "+20" style animation each time points are added.
   - The progress bar has markers at 25, 50 and 75.
   - Below 50 points show "You've earned X points so far"; from 50 points show "Only Y points to go".
   - Version A: starts at Bronze. Text: "Earn 100 points this month to reach Silver and unlock priority access."
   - Version B: starts at Silver with rewards unlocked. Text: "Earn 100 points this month to keep your Silver status and priority access."
   - Points rules are identical in A and B. Keep the ?v=A / ?v=B / debug=1 logic and the completion messages.
```

---

## Turn 5 — Head start at 80 points

**Why:** users should start close to the goal so they can see themselves getting nearer to it. The 80 points needed a visible source so they feel earned, and the A/B wording had to stay paired ("earn" vs. "keep").

```
Change only the Contributor Tier card. Keep everything else.
- In both versions, every user starts this month with 80 points. Under the progress bar, show a small breakdown: "Welcome bonus +30 · 1 post +20 · 3 Court votes +30".
- The progress bar starts at 80 of 100.
- Version A text: "Only 20 points to go to earn Silver and your $5 voucher."
- Version B text: "Only 20 points to go to keep your Silver status and your $5 voucher."
- Keep the points rules, the markers, the "+points" animation and the completion messages.
```

---

## Turn 6 — Consent and debrief screens

```
Add two screens. Keep everything else, including the ?v=A / ?v=B / debug=1 logic.
1. Consent screen: shown on first visit before the app. Title "Study Consent". Text: "This is a class prototype for MGMT 6108 at SMU. You will browse a shopping app and may write a post or vote. It takes about 5 minutes. Participation is voluntary and anonymous, and you can stop at any time. No real purchases are made." Buttons: "I agree" (enters the app) and "No thanks" (shows a thank-you message). Remember the choice in localStorage.
2. Debrief screen: add a "Finish study" button on the Me page, and also open it automatically after the Contributor Tier completion message. Text: "Thank you for taking part. This study compared two versions of the Contributor Tier card. Version A asked you to earn Silver status; Version B started you at Silver and asked you to keep it. We want to know which wording makes people more willing to write helpful posts. You saw Version [A/B]." Show the actual version letter.
```

---

## Deploying

After each round, the code was pushed from AI Studio to GitHub (`main` branch). Vercel then redeployed the production URL automatically. Access tokens were never written into files.

Test links:

- https://01111pp.vercel.app/?v=A
- https://01111pp.vercel.app/?v=B
- https://01111pp.vercel.app/?v=A&debug=1 (team only)

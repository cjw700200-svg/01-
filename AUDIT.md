# AUDIT — Shopee SG Community & Contributor Tier

MGMT 6108 Decision Architecture for Managers · Group G1 · Prof. Sungjong Roh

- Live prototype: https://01111pp.vercel.app/?v=A and https://01111pp.vercel.app/?v=B
- Repository: https://github.com/cjw700200-svg/01-

## What we audited

We audited two screens of the Shopee Singapore app:

- the **home page**, which is built around direct commerce (search bar, flash sales, product grid) and has no place for shoppers to share or compare experiences;
- the **Me (account) page**, which shows a loyalty tier as a static number with no salient goal or sense of progress.

We focus on two consumer decisions:

1. **Engagement:** does a user share a shopping experience, post a review, ask a question, or raise a dispute with a seller?
2. **Retention:** does a user keep contributing in order to reach or keep a contributor tier and its rewards?

Course references give the week, the slide number in that week's deck, and the study or reading the principle comes from.

## Findings table

| # | Where | What we found | Principle | Course reading | Redesign in the prototype | Prediction / how we check |
|---|---|---|---|---|---|---|
| F1 | Home page | Reviewing is a small "Leave a review" step after purchase. It is easy, but it feels like data entry and there is no community space. | Mind over matter; an externally imposed nudge that **activates** a desired behaviour | W1 slides 10–11 (Mind over Matter: how a strategy is perceived matters more than its physical elements); W1 slide 43 (Boost self-control vs. Activate a desired behaviour); W1 slide 47 (self- vs. externally imposed) | A **Discussion** tab in the bottom navigation, with a search bar and category chips (Electronics, Beauty, Fashion, Home, Groceries). Reviewing is presented as joining a conversation. | Higher user-generated content rate (posts per 1,000 active users) |
| F2 | Discussion posts | Feedback is shown as abstract ratings, so a contributor cannot see the impact of sharing. | Tangibility and perceived impact; identifiable victim effect | W2 slides 20–23 and 40–44 (Cryder et al., 2013: tangibility → perceived impact → satisfaction → generosity); W2 slides 37–39 (Pampers "1 Pack = 1 Vaccine"); W2 slide 47 (Kogut & Ritov, 2005) | Posts from specific, named users with tier badges (e.g. "Uncle Raymond" reviewing noodles), agree counts, and seller replies, so each contribution is visible and concrete | More posts and more replies per visitor to the Discussion tab |
| F3 | Me page — tier | The tier is a static number. The goal is not visible and progress is not felt. | Goal visibility; goal gradient; perceived progress; round numbers as goals | W2 slides 9–10 (pointing out progress already made increases commitment; goal visibility); W2 slide 15 (goal gradient); W2 slides 17–19 (perceived progress); W2 slides 20–23 (Sheila needs 2 vs. 32 candy bars); W2 slides 56–57 (Pope & Simonsohn, 2011) | A Contributor Tier card with a progress bar to a round **100 points**, markers at 25/50/75, and a "+points" animation. Users start at **80/100** with a breakdown of where the 80 came from, and see "Only 20 points to go". | Share of users who post within 48 hours of being within 10% of the next tier |
| F4 | Cart (found in the generated base app) | A voucher's minimum spend was shown but not enforced, and users were not told how far they were from using it. | Goal gradient and to-go information | W2 slides 15–19 | Vouchers below their minimum spend are greyed out and show "Spend $X more to use". | Fewer failed checkouts; more users topping up to the threshold |
| F5 | Reading reviews | Shoppers tend to read reviews that confirm what they already think: fans read praise and unhappy buyers read complaints. Ranking by agreement makes this worse. | Confirmation bias; motivated reasoning | W3 slide 29 (confirmation bias); W3 slide 31 (motivated reasoning); W3 slides 46–51 (Wason selection task: people rarely look for disconfirming evidence) | Pinned **Most Helpful Positive** and **Most Helpful Critical** posts side by side. The main vote reads "Helpful", not just "Agree". The guided form asks "Did it match the description?", "Quality / size?" and "Would you buy again?". | More users open both pinned posts; review quality (helpful votes vs. reports) |
| F6 | Buyer–seller disputes | Quality disputes stay in a private chat, and onlookers can't learn from them. | Mindful nudge; seeking disconfirming evidence | W1 slide 51 (mindful vs. mindless nudges); W3 slides 46–51 | **Ask the Community** turns a chat into a **Community Court** case, with personal details masked. The vote buttons unlock only after the user has opened **both** the buyer's claim and the seller's statement. The verdict is advisory; refunds follow Shopee's official process. | Share of voters who opened both statements; split of verdicts |
| F7 | Me page — tier wording | Rewards are only framed as something to earn. | Reference dependence; loss aversion; endowment effect | W4 slide 27 (reference dependence); W4 slides 45–48 (loss aversion; Kahneman, Knetsch & Thaler, 1990 mugs); W4 slides 49–52 (Fryer et al., 2012: loss-framed teacher incentives); W4 slides 67–72 (endowment effect) | **A/B test.** Version A starts at Bronze: "Only 20 points to go to earn Silver and your $5 voucher." Version B starts at Silver: "Only 20 points to go to keep your Silver status and your $5 voucher." Points, rules and time window are identical; only the starting tier and the wording differ. | Version B produces a higher rate of posts that are voted Helpful |
| F8 | Reward rules | Tier rules sit on a separate page and use dense wording. | Processing fluency (cognition vs. meta-cognition); fluent numbers | W7 slides 6–7 and 12 (processing fluency); W7 slides 13–18 (fonts, spacing, contrast, plain words, simple syntax); W7 slides 39–47 (Petrowsky et al., 2023: round, easy-to-process offers) | "80/100 points" shown directly on the card, short plain sentences, and the same layout for every post (product, review, buttons) | Fewer taps on rule explanations; faster time to first post |
| F9 | Colour of review labels and badges | Colour changes judgements even when the content is the same. | Colour as a cue, and its boundary conditions | W8 slides 47–56 (Schuldt, 2013: a green calorie label makes the same candy bar seem healthier); W8 slides 60–66 (Bazley et al., 2021: red price paths lower expected returns, but not for colour-blind investors, and less so in China) | Green tag for positive and pink tag for critical posts, **always with a text label**, and equal size and position for both. Silver and Gold badges mark tiers. | Check that positive posts do not get more opens just because of colour |
| F10 | Vote counts and badges | "29 people agree" works as social proof, but agreement is not the same as helpfulness, and showing low participation could make not posting seem normal. | Descriptive vs. injunctive norms; reference-group similarity; the "magnetic middle" | W9 slide 48 (descriptive vs. injunctive norms); W9 slides 27–39 (Goldstein, Cialdini & Griskevicius, 2008: hotel towel reuse, strongest when the norm matches the guest's own room); W9 slides 42–47 (Petrified Forest: "many visitors remove wood" backfires); W9 slide 52 (Schultz et al., 2007, assigned reading) | A "Helpful" badge at 10+ agrees signals what the community approves of (injunctive). We do not show low participation numbers. **Planned:** a verified-buyer label so the reference group matches the shopper. | Helpful-to-reported ratio stays stable as posting rises (guardrail) |

## How the A/B test is set up

Following W1 slide 99 (control, randomize, replicate):

- **Version A (gain frame)** — `?v=A`: the user starts at Bronze and earns Silver.
- **Version B (loss frame)** — `?v=B`: the user starts at Silver and must keep it.
- **Identical in both versions:** 80 starting points, a 100-point goal, the same point rules (write a post +20, post becomes Helpful +30, Court vote +10), and the same time window.
- **Assignment:** with no URL parameter, a visitor is randomly assigned to A or B and the assignment is stored. `debug=1` shows a version switch for the team only.
- **Primary metric:** the share of participants who write a post that is voted Helpful.
- **Guardrail metric:** the ratio of Helpful votes to reported posts.
- **Nudge, not push** (W1 slides 18 and 31–35): no option is removed (users can browse without posting) and prices do not change. The $5 voucher is an economic incentive, so we keep it the same in both versions; only the framing differs.

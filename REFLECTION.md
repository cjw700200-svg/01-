# REFLECTION — Limits of our design and what we would improve

MGMT 6108 Decision Architecture for Managers · Group G1

## 1. What our test can and cannot tell us

- **Clicks, not minds.** A/B testing can show that the wording causes a difference in behaviour, but we only see clicks, votes and posts. We infer the mechanism (goal gradient, perceived impact, fear of losing a status) but cannot observe it directly.
- **One test, many users.** The goal gradient depends on where a user starts. Someone at 5% progress who is told "95% to go" may give up rather than try harder. One test cannot show that the progress bar works for every segment.
- **Novelty.** An early rise in Discussion activity may come simply from the tab being new and may fade after a month. A longer test is needed.
- **Confirmation bias is hard to measure.** More votes or more posts do not show that shoppers now weigh both sides more fairly.

## 2. Limits by principle

**Confirmation bias (W3).**
- Showing one positive and one critical post side by side does not guarantee that users weigh both fairly. It can even create a false sense that coverage is balanced while hiding the wider pattern of reviews.
- Helpful votes may still reflect agreement rather than review quality.

**Loss framing (W4).**
- "Keep your Silver" only works for users who value the status and feel they already own it.
- Collecting points for a *new* voucher is a gain, not a loss. "Keep your voucher" is only honest if the system really takes the voucher away.

**Processing fluency (W7).**
- A clearly written review can feel convincing even when it is wrong; easy to read is not the same as accurate.
- Small text, several badges and competing elements can make the page harder to read on a phone. Users should always be able to open the full review and its evidence.

**Colour (W8).**
- Findings from nutrition labels and work tasks may not transfer to a review forum.
- Colours mean different things in different cultures.
- Colour coding can make one category look more credible. Positive and critical posts need equal prominence, and colour must always come with text and icons for colour-blind users.

**Social norms (W9).**
- Visible agree counts can encourage conformity, so reasonable concerns with few votes may be overlooked. Community votes should inform a dispute, not decide it.
- Active contributors may not represent ordinary shoppers.
- Showing an *average* contribution level could pull very active users down towards the middle.

**Rewards.**
- Some users may post mainly to keep a status or earn vouchers. Recognition should depend on the quality of a contribution, not on how often someone posts.
- The forum needs clear badge criteria, moderation, and room for less popular views.

## 3. Limits of the prototype itself

- **Mock data only.** Posts, sellers, Court cases and votes are simulated. For the demo, a new post automatically gains agree votes until it becomes Helpful, which real users would not see.
- **The voucher is money.** By the course definition, a nudge does not significantly change economic incentives (W1 slide 18). We keep the $5 voucher identical in A and B so that only the framing differs, but any rise in posting mixes social recognition with a financial reward.
- **The 80 starting points are given, not earned.** We show a breakdown (welcome bonus, one post, three Court votes) so the head start feels earned, but real users would arrive with very different point totals.
- **No verified-purchase label yet.** Feedback from verified buyers of the same product is a more relevant reference group (W9). This is the next feature to add.
- **The Community Court is advisory.** Refunds must still follow Shopee's official dispute process, and seller fairness needs safeguards such as a 48-hour response window and masking of personal details.

## 4. What we learned from building it with AI tools

- **Our first A/B design was confounded.** Version A asked for two more posts with no deadline, while Version B asked for one post this month. That changed effort as well as framing. We rewrote it so both versions require the same effort in the same time window, and only the starting tier and the wording differ.
- **The test switch was visible to participants.** The "Ver A / Ver B" toggle first appeared on screen for everyone. We hid it behind `debug=1`.
- **Generated code needs checking.** The AI-generated base app displayed a voucher's minimum spend but never enforced it. We found and fixed this before building on top of it.
- **Small wording details matter.** The reward header said "2 of 3 Unlocked" while all three rewards looked unlocked. Mismatches like this would confuse participants and weaken the test.
- **Keep secrets out of chats.** Pushing from AI Studio to GitHub replaces the repository history, and access tokens pasted into a chat can leak. We now use short-lived tokens limited to this one repository and delete them after use.

## 5. Next test

The next step is **segmentation and boundary conditions**. We predict that showing points earned so far ("to-date") motivates users early in a tier, while showing points still needed ("to-go") motivates users close to the goal. We plan three variations:

- **A:** to-date progress bar for all users;
- **B:** to-go progress bar for all users;
- **C:** to-date for early-stage users, switching automatically to to-go once they pass 50%.

This moves the design from a one-size-fits-all nudge towards decision architecture that adapts to where each user is.

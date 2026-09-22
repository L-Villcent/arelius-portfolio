window.CareContent={
  "version": "Group6 formal business simulation",
  "offer": {
    "title": "A clearer way for your family to follow up.",
    "segment": "Adult children coordinating care for a parent who lives independently and can use a simple response interface.",
    "problem": "A reminder is easy to send. Knowing whether someone responded, who should follow up and what happened next is harder when family members share the responsibility.",
    "invitation": "We are testing Sliver Care, a family coordination product. Could we show you a 10-minute demonstration using course scenario data and hear whether it would help your family? Our proposed Plus family subscription is RMB 39/month or RMB 390/year. The current edition is a free offline evaluation: reminders, family assignments and reports can be demonstrated locally, with no live notifications, real payment or remote family accounts. After the demo, would you be willing to try one care scenario and tell us whether the proposed offer fits your needs?",
    "organisation": "We are exploring whether family-care coordination would be useful to the families your organisation supports. Could we arrange a 15-minute demonstration using course scenario records and hear your feedback? Our initial offer is a family subscription at RMB 39/month or RMB 390/year for Plus. This is a free offline evaluation, not a professional-care or emergency-monitoring service. We are asking for feedback or introductions to consenting family caregivers, not claiming an institutional contract or partnership.",
    "nextStep": "Try one reminder → response → family follow-up → exported report. Then record usefulness, confusing steps, willingness to evaluate the proposed price and the reason for accepting or declining.",
    "quoteNote": "No fee is charged for this offline evaluation. Subscription prices are proposed commercial terms for a future connected service, not a current billing commitment. Duration, support, final service terms and launch readiness require agreement before any real sale."
  },
  "simulations": [
    {
      "id": "SIM-01",
      "target": "Family A · working adult daughter",
      "channel": "Private conversation",
      "offer": "10-minute offline demo; Plus ¥39/month or ¥390/year proposal",
      "outcome": "positive",
      "reply": "I help my father after work. The shared follow-up record sounds useful. I would try the demo, but I need to see how simple his screen is.",
      "learning": "Test the older adult’s response flow before adding more features.",
      "followup": "Offer a care scenario demonstration focused on one confirmation and one missed response.",
      "when": "2026-09-16T09:00",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-02",
      "target": "Family B · adult son living nearby",
      "channel": "Message",
      "offer": "Plus family plan and a report demonstration",
      "outcome": "negative",
      "reply": "We already call every morning. I cannot see enough extra value to justify another monthly subscription.",
      "learning": "A reminder alone is not a strong paid value proposition.",
      "followup": "Ask which coordination problems occur when another family member takes over.",
      "when": "2026-09-16T10:30",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-03",
      "target": "Family C · two siblings sharing responsibility",
      "channel": "Demo conversation",
      "offer": "Plus ¥39/month, family assignments and report export",
      "outcome": "positive",
      "reply": "The responsibility field is useful because we sometimes both assume the other person followed up. We would like to test that part.",
      "learning": "Clear responsibility may matter more than AI generation.",
      "followup": "Demonstrate assigning a caregiver and recording an outcome.",
      "when": "2026-09-16T14:00",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-04",
      "target": "Family D · price-sensitive caregiver",
      "channel": "Message",
      "offer": "Plus ¥390/year quoted with annual total clearly stated",
      "outcome": "negative",
      "reply": "I do not want to pay for a year before knowing whether my mother will use it. I would prefer to evaluate it first.",
      "learning": "Annual prepayment can be a barrier before habit and value are established.",
      "followup": "Offer the free offline evaluation; discuss the proposed monthly alternative without inventing a discount.",
      "when": "2026-09-16T16:00",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-05",
      "target": "Family E · rotating family carers",
      "channel": "Interview",
      "offer": "Pro 5x ¥79/month; rota, backup responsibility and handover",
      "outcome": "positive",
      "reply": "The handover feature matches our problem. I would need all family members to see updates on their own phones before paying.",
      "learning": "Cross-device delivery is a launch dependency, even when the local workflow is useful.",
      "followup": "Explain that current cross-device delivery is not implemented; capture this requirement.",
      "when": "2026-09-17T09:30",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-06",
      "target": "Family F · adult child abroad",
      "channel": "Email",
      "offer": "10-minute demonstration and proposed Plus subscription",
      "outcome": "no_response",
      "reply": "No reply recorded by the review point. Follow-up remains open.",
      "learning": "Silence does not reveal willingness to pay or product rejection.",
      "followup": "Plan one respectful follow-up; do not label silence as positive demand.",
      "when": "2026-09-17T11:00",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-07",
      "target": "Organisation A · neighbourhood senior-support group",
      "channel": "Organisation introduction",
      "offer": "15-minute family-product demo and feedback request; no institutional contract",
      "outcome": "positive",
      "reply": "We can discuss the idea, but we would need a clear explanation that the demo does not monitor emergencies or replace our staff.",
      "learning": "Communicate service boundaries before asking for introductions.",
      "followup": "Prepare a short scope statement and demonstrate a manual family follow-up.",
      "when": "2026-09-17T14:00",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-08",
      "target": "Organisation B · family-care volunteer network",
      "channel": "Meeting",
      "offer": "Feedback on family subscription and possible consenting pilot recruitment",
      "outcome": "negative",
      "reply": "Our volunteers cannot take on more follow-up responsibilities. We would not promote a tool that appears to assign those duties to us.",
      "learning": "The responsible follow-up actor must remain an identified family member.",
      "followup": "Clarify that the proposal does not appoint volunteers as caregivers or emergency responders.",
      "when": "2026-09-18T09:00",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-09",
      "target": "Organisation C · community activity centre",
      "channel": "Email",
      "offer": "A free offline demonstration of the proposed Plus family plan",
      "outcome": "no_response",
      "reply": "No reply recorded by the review point. Follow-up remains open.",
      "learning": "A channel hypothesis has not been validated by drafting a message.",
      "followup": "Try a relevant introduction only after permission; log the actual result separately.",
      "when": "2026-09-18T11:00",
      "provenance": "formal-course-simulation"
    },
    {
      "id": "SIM-10",
      "target": "Organisation D · caregiver education group",
      "channel": "Feedback session",
      "offer": "Pro 20x ¥99/month or ¥990/year, same Pro care features and more AI allowance",
      "outcome": "negative",
      "reply": "We understand the Pro care features, but we would not pay extra just for more generated text. Show us whether families use that allowance.",
      "learning": "The 20x option needs measured use and cost evidence; do not make AI the core sales claim.",
      "followup": "Keep 5x available and measure voluntary use in an authorised future pilot.",
      "when": "2026-09-18T15:00",
      "provenance": "formal-course-simulation"
    }
  ],
  "slides": [
    {
      "title": "Sliver Care business simulation",
      "label": "01 / WHERE WE ARE",
      "start": "0:00",
      "end": "0:45",
      "seconds": 45,
      "points": [
        "Group6 presents an operating local family-care MVP.",
        "The proposed buyer is the adult child coordinating a parent’s care.",
        "Ten formal course outreach records document the offer and customer response."
      ],
      "notes": "Sources: report C02, C04, C06, C23 and evidence S04–S06. A designated presenter is allowed in class.",
      "script": "We are Group6. Sliver Care helps a family coordinate what happens after a reminder. The adult child organising a parent’s care is our proposed buyer. This is a formal course business simulation. Our customer outreach records use the course scenario, while our product tests record actual local operations. We reached a working care workflow and downloadable report. Our real decision after the course is Stop, while retaining the possibility of future exploration."
    },
    {
      "title": "Outreach and product evidence",
      "label": "02 / EVIDENCE AND COMMITMENT",
      "start": "0:45",
      "end": "1:40",
      "seconds": 55,
      "points": [
        "10 course outreach records cover six families and four organisations.",
        "4 expressed interest, 4 declined and 2 remain pending.",
        "Interest concerns an evaluation or discussion; no completed sale is recorded.",
        "12 automated product experiments passed on 20 September 2026."
      ],
      "notes": "Sources: report C14–C16 and C20–C22, S02, S04 and S11. Customer profiles, dates and responses follow the course simulation premise. Product experiments record actual local operations.",
      "script": "Our outreach register covers ten customer profiles: six family caregivers and four organisations. Four expressed interest, four declined and two remained pending. Interest concerned a demonstration or discussion, with no subscription sale recorded. The responses direct us to shared responsibility, a short evaluation and clear limits on who follows up. Refusals raise annual prepayment, existing routines, volunteer workload and the value of extra AI allowance. These are the course outreach records. Separately, twelve product experiments passed. They confirmed report access, checkout states, backup responsibility and data retention. We retained the source records and procedures in the appendix."
    },
    {
      "title": "Retained prototype and current MVP",
      "label": "02 / EVIDENCE AND COMMITMENT",
      "start": "1:40",
      "end": "2:20",
      "seconds": 40,
      "points": [
        "Earlier retained example: a guided two-phone response.",
        "Current detail: the responsible caregiver, open follow-up and a saved-record action.",
        "Complete screenshot retained as S14; no independent usability study."
      ],
      "notes": "Sources S03 and S14. Left: retained early prototype. Right: enlarged open-item crop of a fresh capture of the actual local workspace on 20 September 2026; complete source supplied. Local scenario records, no outside-user test.",
      "script": "This is the earliest retained picture available for the report, beside the current workspace. The earlier example illustrated the older adult and family response flow. The current workspace operates saved care items and responsibility, and produces a report containing the entered outcome. This comparison shows the available artifacts, not every early version. No outside participant is shown, so it is not a usability result."
    },
    {
      "title": "Live care report demonstration",
      "label": "03 / THE PRODUCT",
      "start": "2:20",
      "end": "4:40",
      "seconds": 140,
      "points": [
        "Start on Free and record one care outcome.",
        "Show Reports is gated; simulate Plus failure, then success.",
        "Open Reports and download a file containing the note just entered."
      ],
      "notes": "Before the talk: back up if needed and reset the course care household through Demo tools, which retains outreach. Rehearse the clicks. Use the app during this segment. If the operation fails, say so and show the labelled recorded example without claiming live success. Return by 4:40.",
      "script": "I will now demonstrate the care workflow. I start a reminder for Margaret, request help and record the outcome: Course demo, Alex contacted Margaret and agreed the next step. That outcome is saved on Free. Reports requires Plus. This checkout attempt fails, so the plan remains Free. I now complete the simulated order successfully. The actual charge is zero. Reports becomes available and includes the note I just entered. I download the report and locate that note in the file. Report generation uses the saved records and consumes no AI allowance."
    },
    {
      "title": "Family needs and proposed prices",
      "label": "03 / THE PRODUCT",
      "start": "4:40",
      "end": "5:20",
      "seconds": 40,
      "points": [
        "Plus ¥39/390: daily responsibility and report export.",
        "Pro 5x ¥79/790: rota, backups and handovers.",
        "Pro 20x ¥99/990: same Pro care, 100 to 400 generations.",
        "Current evaluation ¥0. Connected services and live AI remain proposed."
      ],
      "notes": "Source: report C08, C09, C11, C28 and C29; S05 and S15. Per family. Annual upfront totals equal ten monthly fees; AI cycles stay monthly. Variable cost RMB18.19 is an unvalidated scenario assumption. New generations only; failed/cancelled requests consume zero. No connected service is being sold.",
      "script": "Our proposed family prices reflect different needs. Plus is 39 yuan monthly for everyday responsibility and reports. Pro 5x is 79 for rota, backups and handovers. Pro 20x is 99: twenty yuan more raises the monthly generation allowance from one hundred to four hundred, with the same care features. Annual totals are 390, 790 and 990. The current local evaluation is free. Sync, remote notifications and live AI remain proposed. Our cost inputs and willingness to pay are still unvalidated."
    },
    {
      "title": "Stop after the course",
      "label": "04 / NEXT STEPS",
      "start": "5:20",
      "end": "6:30",
      "seconds": 70,
      "points": [
        "Group6 will not advance the venture after the course for now.",
        "Days 1–30: archive the product, evidence and report.",
        "Days 31–60: keep the project inactive and retain the open questions.",
        "Days 61–90: stay stopped unless the team explicitly reopens it with customer evidence and a credible delivery and cost plan."
      ],
      "notes": "Source: S02 owner-instructions.json and report sections 1 and 8. This proposed 90-day closure plan starts after the course ends; no calendar end date was supplied. Finish by 6:30 with 30 seconds before the hard seven-minute stop.",
      "script": "Our decision is Stop after the course, with the option to explore the idea later. We have a functioning local product, but cannot support a commercial launch with the evidence we have. In the first thirty days after the course, the proposed plan is to archive the report, evidence and product. In days thirty-one to sixty, we keep the project inactive and retain the unanswered questions. In days sixty-one to ninety, the default is still to stop. Reopening would require an explicit team decision, dated customer evidence, a reliable delivery plan and measured costs. The course outreach findings inform our offer. Reopening would also need customer evidence beyond the simulation. Thank you. We are ready for questions."
    }
  ],
  "presentation": {
    "team": "Group6",
    "decision": "Stop",
    "plannedSeconds": 390,
    "hardLimitSeconds": 420,
    "sections": [
      {
        "name": "Where we are",
        "start": "0:00",
        "end": "0:45"
      },
      {
        "name": "Evidence and commitment",
        "start": "0:45",
        "end": "2:20"
      },
      {
        "name": "The product",
        "start": "2:20",
        "end": "5:20"
      },
      {
        "name": "Next steps",
        "start": "5:20",
        "end": "6:30"
      }
    ]
  },
  "simulationContext": {
    "basis": "Formal course business simulation",
    "permission": "Teacher permission reported by the project owner",
    "provenance": "Customer identities, communication timestamps and responses are exercise inputs. They are not independently observed external contacts.",
    "timeline": "16–18 September 2026, exercise time UTC+08:00",
    "outcomes": {
      "interested": 4,
      "declined": 4,
      "pending": 2
    }
  }
};

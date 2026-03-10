export const prodJourneyExampleData = `
header:
  role: Marketer
  persona: (Example) Emma, 32 years old, marketing specialist with 5 years of experience, familiar with company business and market, but not yet proficient with Salesforce.
  scenario: (Example) Digitalizing the MQL handover process based on the existing customized CRM
  goals: (Example) Simplify MQL identification and labeling process - Improve MQL conversion rate - Enable better collaboration between sales and marketing teams
stages:
  - stage: MQL Identification
    tasks:
    - task: Identify MQL
      touchpoint: View new MQLs in Salesforce dashboard and evaluate eligibility based on predefined criteria.
      emotion: 2
    - task: Label MQL
      touchpoint: Mark qualified MQLs as "pending follow-up" status, and unqualified MQLs as "invalid".
      emotion: 2

  - stage: Sales Returned MQL Analysis
    tasks:
    - task: Receive Sales Returned MQL
      touchpoint: Receive notification from Salesforce containing detailed information about sales returned MQLs.
      emotion: 2
    - task: Analyze MQL
      touchpoint: Review MQL information and history in Salesforce, analyze if sales returned MQLs can be re-marked as pending follow-up.
      emotion: 2

  - stage: Follow-up Collaboration
    tasks:
    - task: Understand Sales Follow-up Status
      touchpoint: Check sales follow-up status for MQLs in Salesforce, including results and next steps.
      emotion: 2
    - task: Collaborate with Sales
      touchpoint: If MQLs need more marketing efforts, collaborate with sales to develop next marketing plans; if sales needs more information to advance MQLs, provide timely support.
      emotion: 3
  - stage: Feedback and Optimization
    tasks:
    - task: Contact Sales and Customers
      touchpoint: Contact sales and customers to understand MQL follow-up status and results, and listen to feedback from sales and customers.
      emotion: 2
    - task: Optimize MQL Handover Process
      touchpoint: Based on feedback, promptly optimize MQL handover processes and standards to improve MQL conversion rates and marketing efficiency.
      emotion: 2
`;

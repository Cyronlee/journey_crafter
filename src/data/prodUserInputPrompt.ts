// Note: These keywords will be replaced in the final user input below
const rule = ["{businessDomain}", "{role}", "{goal}", "{keyProcess}", "{painPoints}"];

export const prodUserInputPrompt: string = `
Context: {goal}. The user's key process is mainly {keyProcess}.
{role} currently has the following pain points: {painPoints}, etc.
Based on the Context I provided, as a {businessDomain} domain expert and senior product manager, design a TO-BE user journey for {role}, solving the pain points and domain challenges of {role}, helping {role} better achieve their goals. Please return the best TO-BE user journey, and ensure that the output TO-BE user journey only involves this user.
The TO-BE user journey needs to include the role's Persona, Scenarios, Goals, as well as stages, tasks, touchpoints, and emotions. Persona needs to include: name, industry, and role. When there are multiple Personas, Scenarios, or Goals, please remove the "-" character and return them as a single line string. Stages should be displayed in chronological order according to different business development stages. Tasks need to list in detail the business activities and their touchpoints at this stage for this role. Touchpoints mainly refer to the tools designed for business activities.
Emotion needs to return a number from 1 to 3. In a stage, when user behavior and touchpoints are very complex, requiring a lot of input and jumping between touchpoints, the emotion is 1; in a stage, when user behavior and touchpoints are moderately complex, requiring some input or jumping between touchpoints, the emotion is 2; in a stage, when the user only needs to click and use one touchpoint, the emotion is 3.
Please return it to me in the following code format, with field names in English. Other information should be returned in English.
\`\`\`
begin
header:
  role: string
  persona: string
  scenario: string
  goals: string
stages:
  - stage: string
    tasks:
      - task: string
        touchpoint: string
        emotion: number 1-3
  - stage: string
    tasks:
      - task: string
        touchpoint: string
        emotion: number 1-3
      - task: string
        touchpoint: string
        emotion: number 1-3
end
\`\`\`
`;

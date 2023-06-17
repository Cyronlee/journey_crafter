export const prompt = `
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
        emotion: number 1-5
  - stage: string
    tasks:
      - task: string
        touchpoint: string
        emotion: number 1-5
      - task: string
        touchpoint: string
        emotion: number 1-5
`;

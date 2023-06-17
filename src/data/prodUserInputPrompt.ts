export const prodUserInputPrompt: string = `
请分别分析{业务领域}等领域内业内排名前3的领域难点，并分析各领域好评前五的解决方案的主要功能和设计亮点。然后作为{业务领域}等领域{角色}，结合上述领域难点和好评前五的解决方案的分析结果，结合客户的业务目标: {目标}，关键流程: {关键流程}，痛点：{痛点}，最少设计5个{关键角色}的TO-BE用户旅程，解决客户的痛点及领域难点，帮助客户更好的达到目标。
请返回其中最好的一个TO-BE用户旅程（请确保输出中只涉及一个角色）。
TO-BE用户旅程需要包含改关键角色的Persona，并且按照时间顺序分不同阶段展示。需要详细列出该阶段下不同角色的业务活动及其触点[触点主要是业务活动设计的工具]。每个角色及其业务活动、触点需要分开展示。
emotion 包含like，easiness，dislike，需要返回从1到3的一个数字，1代表dislike，2代表easiness，3代表dislike。
emotions: What are the likes and dislikes of the audience at each individual task they perform. Is important if the can describe their feeling with simple adjectives.After completing each task we can reassure user’s feelings and needs by asking them what were their likes and dislikes of a given goal. Ask them to be sincere and specific with their words.
Another key questions would be to ask users the easiness level they felt in each step of the process. If the tasks take too much effort means we need to reduce the stress of each action.
请用中文返回，代码模版参考：
\`\`\`
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
\`\`\`
`;

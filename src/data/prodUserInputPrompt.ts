// TODO 注意！通过这几个关键词来填充下方的最终用户输入
const rule = ["{业务领域}", "{角色}", "{目标}", "{关键流程}", "{痛点}"];

export const prodUserInputPrompt: string = `
Context：{目标}。用户的关键流程主要为{关键流程}。
{角色}目前存在以下痛点：{痛点}等
根据我给你提供的Context，请作为一个领域{业务领域}等专家和资深的产品经理，设计用户{角色}的TO-BE用户旅程，解决用户{角色}的痛点及领域难点，帮助用户{角色}更好的达到目标。请返回最好的一个TO-BE用户旅程，并确保输出的TO-BE用户旅程中只涉及该用户。
TO-BE用户旅程需要包含角色的Persona、Scenarios、Goals，以及stages，tasks，touchpoint和emotion。Persona需要包括：姓名，所在行业，担任的角色。Persona、Scenarios、Goal存在多个时，请去除信息中“-”字符，返回一行字符串。stages按照时间顺序分业务不同发展阶段展示，tasks需要详细列出该阶段下该角色的业务活动及其触点。触点主要是业务活动设计的工具。
emotion 需要返回从1到3的一个数字。在一个stage中，当用户的行为和触点非常复杂，需要大量输入和跳转触点的时候，emotion为1；在一个stage中，用户的行为和触点一般复杂，需要输入或者跳转触点的时候，emotion为2；在一个stage中，当用户只需点击和一个触点的时候，emotion为3。
请按照下面的代码格式返回给我，模版中的字段名用英文返回。其他信息需要中文返回。
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

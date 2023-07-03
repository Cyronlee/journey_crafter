// TODO 注意！通过这几个关键词来填充下方的最终用户输入
const rule = [
  "{Role}",
  "{System}",
  "{System_Brief}",
  "{Scenario}",
  "{Pain_Point}",
  "{Opportunities}",
];

export const prodUserInputPrompt: string = `
上下文：
我们希望可以针对{Role}角色优化当前在{System}中优化其流程。{System_Brief}。需要优化的流程是：{Scenario}。
{Role}存在以下痛点：{Pain_Point}。
我们认为这个流程中可以进行以下优化：{Opportunities}。

请作为{Role}，{System}相关领域的资深软件产品经理，结合前面提供的上下文，为关键角色{Role}设计用户旅程，解决客户的痛点帮助客户达成更好的目标。

设计用户旅程的步骤如下：
1. 找出最关键的角色，设计Persona，包括该角色的姓名、行业、职位。
2. 分别用一句话总结该角色的用户旅程的Scenarios和 Goals。
3. 用户旅程的Stages。用户旅程包含多个Stage，多个Stage之间有因果顺序。
4. 用户旅程的每个Stage中包括 tasks，touchpoint和emotion。task是该关键角色在该Stage中要完成的业务活动。touchpoint是完成task时用户和服务的所有接触点（如工具）。emotion 是1到3的一个整数。在一个stage中，当用户的行为和触点非常复杂，需要大量输入和跳转触点的时候，emotion为1；在一个stage中，用户的行为和触点一般复杂，需要输入或者跳转触点的时候，emotion为2；在一个stage中，当用户只需点击和一个触点的时候，emotion为3。

用户旅程的例子如下：
===
上下文：
我们的客户是一个全球有10000人的软件咨询企业，客户希望我们可以针对Marketer角色优化当前在CRM系统中的MQL handover流程。CRM是一个基于salesforce以及客户业务定制的网页系统，包含了lead管理，contact管理，活动管理，campaign管理以及商机管理功能。用户的关键流程主要为目前CRM中已经存在MQL handover流程，关键流程主要为：Marketer手动识别MQL并标记MQL，方便销售经理每天浏览MQL并分配MQL，并让销售接收MQL并做跟进，Marketer接收销售退回的MQL进行分析。在这个流程中，Marketer希望能够及时准确地将MQL传递给销售，帮助销售加快MQL转化为商机。Marketer目前存在以下痛点：MQL中Spam比例过高，花费比较多的时间从系统中剔除Spam数据；Marketer不知道应该给销售传递什么信息来帮助销售做后续的跟进；3.Marketer不知道销售接收到MQL之后是否采取行动以及什么行动。根据我给你提供的Context，请作为一个领域MQL、CRM、Salesforce， etc.等专家和资深的产品经理，设计用户Marketer的TO-BE用户旅程，解决用户Marketer的痛点及领域难点，帮助用户Marketer更好的达到目标。
问题：
请返回最好的一个TO-BE用户旅程，并确保输出的TO-BE用户旅程中只涉及该用户。
答案：
\`\`\`
header:
  role: "Marketer"
  persona: "李华，IT行业，担任市场营销专员"
  scenario: "在CRM系统中，快速、准确地发掘高质量的MQL，并及时传递给销售，帮助销售快速转化为商机"
  goals: "优化MQL handover流程，降低Spam比例，提高MQL转化率"
stages:
  - stage: "MQL发掘"
    tasks:
      - task: "根据已有数据和市场背景，通过合适的手段对潜在客户进行触达和挖掘，筛选出高质量的MQL"
        touchpoint: "电话、邮件、社交媒体等"
        emotion: 3
  - stage: "MQL验证"
    tasks:
      - task: "使用系统中的评估工具，对MQL进行初步验证"
        touchpoint: "CRM系统"
        emotion: 2
      - task: "手动剔除Spam数据"
        touchpoint: "CRM系统"
        emotion: 1
  - stage: "MQL传递"
    tasks:
      - task: "通过CRM系统将MQL传递给销售，并附带详细的信息，帮助销售快速理解客户需求和关注点"
        touchpoint: "CRM系统"
        emotion: 3
  - stage: "MQL跟踪"
    tasks:
      - task: "跟踪销售是否接收到MQL"
        touchpoint: "CRM系统"
\`\`\`
===

要求：请你分析最好的一个用户旅程，并严格按照下面的yaml格式返回给我，内容需要为英文。

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

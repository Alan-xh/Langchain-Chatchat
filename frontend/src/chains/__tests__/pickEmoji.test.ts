import { describe, expect, it } from 'vitest';

import { ChatStreamPayload } from '@/types/openai/chat';

import { chainPickEmoji } from '../pickEmoji';

// 描述测试块
describe('chainPickEmoji', () => {
  // 测试用例：验证函数返回的结构
  it('should return a payload with the correct structure and embedded user content', () => {
    // 用户输入的内容
    const userContent = '你是一名星际探索者';

    // 预期的返回值结构
    const expectedPayload: Partial<ChatStreamPayload> = {
      messages: [
        {
          content:
            '你是一名擅长进行概念抽象的设计师与 Emoji 专家，你需要根据角色能力的描述抽象出一个表达物理实体的概念 Emoji 作为角色头像, 格式要求如下：\n输入: {文本作为JSON引用字符串}\n输出: {一个Emoji}',
          role: 'system',
        },
        {
          content: `输入: {你是一名文案大师，帮我为一些设计 / 艺术作品起名，名字需要有文学内涵，注重精炼和赋子意境，表达作品的情景氛国，使名称既简洁又富有诗意。}`,
          role: 'user',
        },
        { content: '✒️', role: 'assistant' },
        {
          content: `输入: {你是一名代码巫师，请将下面的代码转成 ts，不要修改实现。如果原本 js 中没有定义的全局变量，需要补充 declare 的类型声明。}`,
          role: 'user',
        },
        { content: '🧙‍♂️', role: 'assistant' },
        {
          content: `输入: {你是一名创业计划撰写专家，可以提供包括创意名称、简短的标语、目标用户画像、用户痛点、主要价值主张、销售/营销渠道、收入流、成本结构等计划生成。}`,
          role: 'user',
        },
        { content: '🚀', role: 'assistant' },
        { content: `输入: {${userContent}}`, role: 'user' },
      ],
    };

    // 执行函数并获取结果
    const result = chainPickEmoji(userContent);

    // 断言结果是否符合预期
    expect(result).toEqual(expectedPayload);
  });
});

import Line, { Lines, LineContent } from './Line';

export interface CreatorLineContent{
  FactoryMethod(count: number, contentArr: HTMLElement[]): LineContent[];
}

export default class CreatorLine implements CreatorLineContent{
  FactoryMethod(count: number, contentArr: HTMLElement[]): LineContent[] {
    const lineArr: LineContent[] = [];
    let contentLineArr: HTMLElement[] = []

    for (let i = 0; i < count; i++) {
      contentLineArr = contentArr.splice(0, count);
      const line = new Line(contentLineArr.slice());
      lineArr.push(line);
    }
    return lineArr.slice();
  }
}
import { Test } from '../test/test';
export class TestSubcategory {
  id: number;
  name: string;
  test: Test = new Test();

  static toArray(jsons: any[]): TestSubcategory[] {
      const testSubcategories: TestSubcategory[] = [];
      if (jsons != null) {
          for (const json of jsons) {
              testSubcategories.push(new TestSubcategory(json));
          }
      }
      return testSubcategories;
   }

  constructor(json?: any) {
    if (json != null) {
      this.id = json.id;
      this.name = json.name;
      this.test = new Test(json.test);
    }
  }
}

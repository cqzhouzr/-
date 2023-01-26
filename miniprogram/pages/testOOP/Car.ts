export class Car {
  // 字段
  owner: string;

  // 构造函数
  constructor(engine: string) {
      this.owner = engine;
  }

  // 方法
  disp(): void {
      console.log("发动机为：" + this.owner);
  }
}
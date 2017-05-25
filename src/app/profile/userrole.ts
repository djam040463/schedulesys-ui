export class UserRole {
  id: number;
  name: string;

  constructor(json?: any) {
    if (json != null) {
        this.id = json.id;
        this.name = json.name;
    }
  }
}

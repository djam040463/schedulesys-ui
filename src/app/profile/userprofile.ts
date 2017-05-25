import { UserRole } from './userrole';
export class UserProfile {
  id: number;
  emailAddress: string;
  firstName: string;
  lastName: string;
  username: string;
  userRole: UserRole;
  activated: boolean;

  static toArray(jsons: any[]): UserProfile[] {
        const users: UserProfile[] = [];
        if (jsons != null) {
            for (const json of jsons) {
                users.push(new UserProfile(json));
            }
        }
        return users;
  }

  constructor(json?: any) {
    if (json != null)  {
      this.id = json.id;
      this.emailAddress = json.emailAddress;
      this.firstName = json.firstName;
      this.lastName = json.lastName;
      this.username = json.username;
      this.userRole = json.userRole;
      this.activated = json.activated;
    } else {
      this.userRole = new UserRole(null);
    }
  }

}

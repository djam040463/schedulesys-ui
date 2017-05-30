import { CareCompanyType } from './care-company-type';
export class CareCompany {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  fax: string;
  careCompanyType: CareCompanyType;

  static toArray(jsons: any[]): CareCompany[] {
        const users: CareCompany[] = [];
        if (jsons != null) {
            for (const json of jsons) {
                users.push(new CareCompany(json));
            }
        }
        return users;
  }

  constructor(json?: any) {
    if (json != null) {
      this.id = json.id;
      this.name = json.name;
      this.address = json.address;
      this.phoneNumber = json.phoneNumber;
      this.fax = json.fax;
      this.careCompanyType = json.careCompanyType;
    } else {
      this.careCompanyType = new CareCompanyType(null);
    }
  }
}

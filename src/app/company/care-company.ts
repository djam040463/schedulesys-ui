import { CareCompanyType } from './care-company-type';
export class CareCompany {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  fax: string;
  careCompanyType: CareCompanyType = new CareCompanyType();

  static toArray(jsons: any[]): CareCompany[] {
        const careCompanies: CareCompany[] = [];
        if (jsons != null) {
            for (const json of jsons) {
                careCompanies.push(new CareCompany(json));
            }
        }
        return careCompanies;
  }

  constructor(json?: any) {
    if (json != null) {
      this.id = json.id;
      this.name = json.name;
      this.address = json.address;
      this.phoneNumber = json.phoneNumber;
      this.fax = json.fax;
      this.careCompanyType = json.careCompanyType;
    }
  }
}

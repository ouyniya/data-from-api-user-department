import { type User } from "../types/userTypes";
import { type DepartmentData } from "../types/departmentTypes";

export function groupByDepartment(users: User[]) {
  const result: Record<string, DepartmentData> = {};

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const dept = user.company.department.trim();
    const gender = user.gender.trim();
    const age = user.age;
    const hairColor = user.hair.color.trim();
    const fullName = user.firstName.trim() + user.lastName.trim();
    const postalCode = user.address.postalCode.trim();

    // Case I: New department
    // Case II: old department

    if (!result[dept]) {
      result[dept] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
        _minAge: age, // internal only
        _maxAge: age, // internal only
      } as DepartmentData & { _minAge: number; _maxAge: number };
    }

    const summaryData = result[dept] as DepartmentData & {
      _minAge?: number;
      _maxAge?: number;
    };

    // gender
    if (gender === "male") {
      summaryData.male++;
    } else {
      summaryData.female++;
    }

    // Age range
    if (summaryData._minAge === undefined || age < summaryData._minAge) {
      summaryData._minAge = age;
    }

    if (summaryData._maxAge === undefined || age > summaryData._maxAge) {
      summaryData._maxAge = age;
    }

    // Hair color count
    summaryData.hair[hairColor] = (summaryData.hair[hairColor] || 0) + 1;

    // Address map
    summaryData.addressUser[fullName] = postalCode;
  }

  // convert age range string and cleanup
  for (const dept in result) {
    const summary = result[dept] as DepartmentData & {
      _minAge?: number;
      _maxAge?: number;
    };
    summary.ageRange = `${summary._minAge}-${summary._maxAge}`;
    delete summary._minAge;
    delete summary._maxAge;
  }

  return result;
}

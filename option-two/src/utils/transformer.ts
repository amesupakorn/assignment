import { User } from "../types/user";

interface Transformed {
  [department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
  };
}

export function transformUsers(users: User[]): Transformed {
  const result: Transformed = {};

  for (const user of users) {
    const dept = user.company.department;

    if (!result[dept]) {
      result[dept] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    const group = result[dept];

    // Gender count
    if (user.gender === "male") group.male++;
    else group.female++;

    // Age range 
    group.ageRange += `${user.age},`;

    // Hair color 
    group.hair[user.hair.color] = (group.hair[user.hair.color] || 0) + 1;

    // Postal Code
    const fullName = `${user.firstName}${user.lastName}`;
    group.addressUser[fullName] = user.address.postalCode;
  }

  for (const dept in result) {
    const ages = result[dept].ageRange
      .split(",")
      .filter(Boolean)
      .map(Number);
    const min = Math.min(...ages);
    const max = Math.max(...ages);
    result[dept].ageRange = `${min}-${max}`;
  }

  return result;
}
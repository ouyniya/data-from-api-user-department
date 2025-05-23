import { describe, it, expect } from "vitest";
import { groupByDepartment } from "../utils/userGroupByDepartment";
import { type User } from "../types/userTypes";

// Case
// มีหลายแผนก
// เพศซ้ำในแผนกเดียวกัน
// คนที่มีสีผมเหมือนกัน
// ข้อมูลแปลก เช่น postalCode ซ้ำ
// แผนกที่มีแค่คนเดียว

describe("groupByDepartment", () => {
  it("should handle multiple departments with complex user data", () => {
    const mockUsers: User[] = [
      {
        firstName: "Alice",
        lastName: "Smith",
        gender: "female",
        age: 28,
        hair: { color: "Brown" },
        address: { postalCode: "12345" },
        company: { department: "Engineering" },
      },
      {
        firstName: "Bob",
        lastName: "Jones",
        gender: "male",
        age: 35,
        hair: { color: "Black" },
        address: { postalCode: "54321" },
        company: { department: "Engineering" },
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        gender: "male",
        age: 41,
        hair: { color: "Brown" },
        address: { postalCode: "99999" },
        company: { department: "Sales" },
      },
      {
        firstName: "Diana",
        lastName: "Prince",
        gender: "female",
        age: 32,
        hair: { color: "Blond" },
        address: { postalCode: "88888" },
        company: { department: "Sales" },
      },
      {
        firstName: "Edward",
        lastName: "Stone",
        gender: "male",
        age: 29,
        hair: { color: "Brown" },
        address: { postalCode: "77777" },
        company: { department: "Support" },
      },
    ];

    const result = groupByDepartment(mockUsers);

    // Engineering
    expect(result["Engineering"].male).toBe(1);
    expect(result["Engineering"].female).toBe(1);
    expect(result["Engineering"].ageRange).toBe("28-35");
    expect(result["Engineering"].hair).toEqual({ Brown: 1, Black: 1 });
    expect(result["Engineering"].addressUser).toEqual({
      AliceSmith: "12345",
      BobJones: "54321",
    });

    // Sales
    expect(result["Sales"].male).toBe(1);
    expect(result["Sales"].female).toBe(1);
    expect(result["Sales"].ageRange).toBe("32-41");
    expect(result["Sales"].hair).toEqual({ Brown: 1, Blond: 1 });
    expect(result["Sales"].addressUser).toEqual({
      CharlieBrown: "99999",
      DianaPrince: "88888",
    });

    // Support
    expect(result["Support"].male).toBe(1);
    expect(result["Support"].female).toBe(0);
    expect(result["Support"].ageRange).toBe("29-29");
    expect(result["Support"].hair).toEqual({ Brown: 1 });
    expect(result["Support"].addressUser).toEqual({
      EdwardStone: "77777",
    });
  });
});

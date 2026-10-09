
export interface UserUpdateRequest {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string;
}
export interface Group {
  id: number;
  name: string;
  institution: number;
}

export interface RegistrationCode {
  id: number;
  code: string;
  group: number;
  group_name: string;
}

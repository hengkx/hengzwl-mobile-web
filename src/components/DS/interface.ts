export interface Exam {
  id: number;
  subject: string;
  fee: number;
  isPass: number;
  isPay: number;
  payTime?: string;
  time: string;
}

export interface Pay {
  id: number;
  amount: number;
  time: string;
}

export interface Student {
  id: number;
  name: string;
  idCard: string;
  address: string;
  phone: string;
  className: string;
  schoolName: string;
  isVeteran: number;
  tuition: number;
  other: number;
  totalCost: number;
  paid: number;
  remark: string;
  time: string;
}

export interface StudentDetail extends Student {
  exams: Exam[];
  pays: Pay[];
}

export interface Class {
  id: string;
  name: string;
}

export interface School {
  id: string;
  district: string;
}

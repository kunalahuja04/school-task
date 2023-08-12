export interface IStudent {
  id: string;
  name: string;
  imageUrl: string;
  year: string;
  class: string;
  grades: IGrades;
}

export interface IGrades {
  totalMarks: number;
  subjects: Array<ISubject>
}

interface ISubject {
  subjectName: string;
  marks: number;
}

export interface IAdminUser {
  id?: number;
  userName: string;
  password: string;
}
// 각 컴포넌트의 import 경로는 실제 프로젝트 구조에 맞게 수정해야 합니다.
export interface IColumnConfig {
  key?: string; // id 또는 accessorKey
  label: string;
  type: 'text' | 'link' | 'boolean' | 'date' | 'checkbox' | 'actions';
  linkBaseUrl?: string;
  linkKeys?: string[];
  linkAddUrl?: string;
  menu?: string[];
  size? : number
  align? : string
}
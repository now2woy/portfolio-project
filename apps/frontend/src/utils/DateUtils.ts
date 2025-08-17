/**
 * 날짜 문자열을 원하는 포맷으로 변환
 * @param str 날짜 문자열 (예: ISO 문자열)
 * @param format "YYYY/MM/DD HH:mm:SS" 또는 "YYYY/MM/DD"
 * @returns 포맷된 날짜 문자열, str이 없으면 ""
 */
export function formatDate(str?: string | null, format: string = "YYYY/MM/DD HH:mm:SS"): string {
  if (!str) return "-";

  const date = new Date(str);
  if (isNaN(date.getTime())) return ""; // 유효하지 않은 날짜 처리

  const pad = (num: number) => String(num).padStart(2, "0");

  const YYYY = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const SS = pad(date.getSeconds());

  switch (format) {
    case "YYYY/MM/DD HH:mm:SS":
      return `${YYYY}/${MM}/${DD} ${HH}:${mm}:${SS}`;
      
    case "YYYY/MM/DD":
      return `${YYYY}/${MM}/${DD}`;

    default:
      return `${YYYY}/${MM}/${DD}`;
  }
}
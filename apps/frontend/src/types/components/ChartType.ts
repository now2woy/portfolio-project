import { ChartConfig } from "@/components/ui/chart";

/**
 * 영역 차트 Props 정의
 */
export interface IAreaChartProps {
    title : string;
    description : string;
    chartData : unknown[];
    chartConfig : ChartConfig;
    xDataKey : string;
    yDataKey? : string;
    chartSeries : IChartSeriesProps[];
    footerDescription? : string;
}

/**
 * 파이 차트 Props 정의
 */
export interface IPieChartProps<T> {
    title: string;
    description: string;
    chartData: T[];
    dataKey: keyof T;
    nameKey: keyof T;
    label?: string; 
    subLabel?: string; 
    footerDescription? : string
}

/**
 * 개별 데이터 계열의 정보 Props 정의
 */
export interface IChartSeriesProps {
    key: string;
    fillColor: string;
    strokeColor: string;
}
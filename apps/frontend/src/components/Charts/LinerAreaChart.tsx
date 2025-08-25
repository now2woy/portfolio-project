"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { IAreaChartProps } from '@/types/components/ChartType';

/**
 * 영역 선 차트
 * @param param
 * @returns 
 */
export function AreaChartCostom( { title, description, chartData, chartConfig, xDataKey, chartSeries, footerDescription,  } : IAreaChartProps ) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{ title }</CardTitle>
                <CardDescription>{ description }</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={ chartConfig }>
                    <AreaChart accessibilityLayer data={ chartData } margin={ { left: 24, right: 24 } } >
                        <CartesianGrid vertical={ false } />
                        <XAxis dataKey={ xDataKey } tickLine={ false } axisLine={ false } tickMargin={ 8 } tickFormatter={ ( value ) => value.slice( 5, 10 ) } />
                        <ChartTooltip cursor={ false } content={ <ChartTooltipContent indicator="dot" hideLabel /> } />
                        { chartSeries.map( ( series, index ) => (
                            <Area
                                key={ index }
                                dataKey={ series.key }
                                type="linear"
                                fill={ series.fillColor }
                                fillOpacity={ 0.4 }
                                stroke={ series.strokeColor }
                            />
                        ) ) }
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            { footerDescription &&
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="text-muted-foreground leading-none">{ footerDescription }</div>
                </CardFooter>
            }
        </Card>
    );
}
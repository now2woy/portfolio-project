'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { IAreaChartProps } from '@/types/components/ChartType'

/**
 * 바 차트
 * @param param
 * @returns
 */
export function BarChartCustom({ title, description, chartData, chartConfig, xDataKey, chartSeries, footerDescription }: IAreaChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={xDataKey}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={value => value.slice(5, 10)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {chartSeries.map((series, index) => (
                            <Bar
                                key={index}
                                dataKey={series.key}
                                fill={series.fillColor}
                                radius={8}
                            />
                        ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {footerDescription && (
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="text-muted-foreground leading-none">{footerDescription}</div>
                </CardFooter>
            )}
        </Card>
    )
}

/**
 * 횡 바 차트
 * @param param
 * @returns
 */
export function BarChartHorizontalCustom({ title, description, chartData, chartConfig, xDataKey, yDataKey, chartSeries, footerDescription }: IAreaChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{ left: -20 }}>
                        <XAxis
                            type="number"
                            dataKey={xDataKey}
                            hide
                        />
                        <YAxis
                            dataKey={yDataKey}
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={value => value.slice(5, 10)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {chartSeries.map((series, index) => (
                            <Bar
                                key={index}
                                dataKey={series.key}
                                fill={series.fillColor}
                                radius={5}
                            />
                        ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {footerDescription && (
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="text-muted-foreground leading-none">{footerDescription}</div>
                </CardFooter>
            )}
        </Card>
    )
}

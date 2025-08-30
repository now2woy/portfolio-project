'use client'

import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart'
import { IPieChartProps } from '@/types/components/ChartType'

/**
 * 도넛 형태의 차트
 * @param param0
 * @returns
 */
export function PieChartCustom<T>({
    title,
    description,
    chartData,
    dataKey,
    nameKey,
    label,
    footerDescription
}: IPieChartProps<T>) {
    const totalValue = React.useMemo(() => {
        return chartData.reduce(
            (acc, curr) => acc + (curr[dataKey] as number),
            0
        )
    }, [chartData, dataKey])

    // 동적으로 색상 팔레트 생성
    const colors = getDynamicColorPalette(chartData.length)

    // fill 값과 chartConfig를 동적으로 생성npm ru
    const processedChartData = chartData.map((item, index) => ({
        ...item,
        fill: colors[index]
    }))

    const chartConfig = processedChartData.reduce((acc, curr) => {
        const key = String(curr[nameKey])
        acc[key] = {
            label: curr[nameKey] as string,
            color: curr['fill' as keyof T] as string
        }
        return acc
    }, {} as ChartConfig) // `as ChartConfig`를 추가하여 초기값의 타입을 명시

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={processedChartData}
                            dataKey={dataKey as string}
                            nameKey={nameKey as string}
                            innerRadius={60}
                            strokeWidth={5}>
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold">
                                                    {totalValue.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground">
                                                    {label}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            {footerDescription && (
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="text-muted-foreground leading-none">
                        {footerDescription}
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

/**
 * 색상 코드 배열을 생성하는 함수
 * @param count
 * @returns
 */
const getDynamicColorPalette = (count: number): string[] => {
    const baseValue = 500
    let startOffset = 0

    if (count > 1) {
        // 500을 기준으로 양쪽으로 퍼지는 로직
        startOffset = Math.floor(count / 2)

        if (count % 2 === 0) {
            // 짝수일 경우 중앙에서 -100 더 시작
            startOffset--
        }
    }

    const startColorCode = baseValue - startOffset * 100
    const colors = []

    for (let i = 0; i < count; i++) {
        const colorCode = startColorCode + i * 100
        colors.push(`var(--colors-blue-${colorCode})`)
    }

    return colors
}

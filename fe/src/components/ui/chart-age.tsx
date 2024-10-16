"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { AgeData, ChartData } from "@/types/ageData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { fetchAgeDataAPI } from "@/stores/slices/customerSlice";

export const description = "A bar chart with an active bar";

const chartConfig = {
    visitors: {
        label: "Costumers",
    },
    "0-20": {
        label: "0-20",
        color: "hsl(var(--chart-1))",
    },
    "21-40": {
        label: "21-40",
        color: "hsl(var(--chart-2))",
    },
    "41-60": {
        label: "41-60",
        color: "hsl(var(--chart-3))",
    },
    "61+": {
        label: "61+",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

export function ChartAge() {
    const dispatch = useDispatch<AppDispatch>();
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [totalVisitors, setTotalVisitors] = useState<number>(0);
    const { ageData, ageLoading } = useSelector((state: RootState) => state.customerSlice);

    useEffect(() => {
        const fetchAgeData = async () => {
            try {
                await dispatch(fetchAgeDataAPI())
            } catch (error) {
                console.error("Error fetching age data:", error);
            }
        };
        fetchAgeData();
    }, []);

    useEffect(() => {
        if (ageData) {
            const formattedData: ChartData[] = ageData.map((item) => ({
                ageRange: item.range,
                visitors: item.count,
                fill: item.range === "0-20" ? "hsl(var(--chart-1))" :
                    item.range === "21-40" ? "hsl(var(--chart-2))" :
                        item.range === "41-60" ? "hsl(var(--chart-3))" :
                            "hsl(var(--chart-4))",
            }));
            setChartData(formattedData);
            const total = ageData.reduce((acc, item) => acc + item.count, 0);
            setTotalVisitors(total);
        }
    }, [ageData])

    return (
        <Card className={`h-96 w-72 flex flex-col ${ageLoading ? "justify-center" : "justify-between"}`}>
            {ageLoading ? (
                <span className="flex justify-center items-center">Loading...</span>
            ) : (
                <>
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Chart of Age - Customers HIGO</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart data={chartData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="ageRange"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        chartConfig[value as keyof typeof chartConfig]?.label
                                    }
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="visitors"
                                    strokeWidth={2}
                                    radius={8}
                                    fillOpacity={0.8}
                                    activeIndex={2}
                                    activeBar={({ ...props }) => (
                                        <Rectangle
                                            {...props}
                                            fillOpacity={0.8}
                                            stroke={props.payload.fill}
                                            strokeDasharray={4}
                                            strokeDashoffset={4}
                                        />
                                    )}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            Total costumers: {totalVisitors} <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing data for {chartData.length} age ranges.
                        </div>
                    </CardFooter>
                </>
            )}
        </Card>
    );
}

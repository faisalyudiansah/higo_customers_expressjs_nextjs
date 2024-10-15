"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
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
import { ChartData, GenderData } from "@/types/genderData";

export const description = "A pie chart with a label";

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    female: {
        label: "Female",
        color: "hsl(var(--chart-1))",
    },
    male: {
        label: "Male",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function ChartGender() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [totalVisitors, setTotalVisitors] = useState<number>(0);
    useEffect(() => {
        const fetchGenderData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/gender`);
                const data: GenderData[] = await response.json();
                const formattedData: ChartData[] = data.map((item) => ({
                    browser: item.gender,
                    visitors: item.count,
                    fill: item.gender === "Female" ? "var(--color-female)" : "var(--color-male)", 
                }));
                setChartData(formattedData);
                const total = data.reduce((acc, item) => acc + item.count, 0);
                setTotalVisitors(total);
            } catch (error) {
                console.error("Error fetching gender data:", error);
            }
        };

        fetchGenderData();
    }, []);

    return (
        <Card className="flex flex-col h-96">
            <CardHeader className="items-center pb-0">
                <CardTitle>Chart of Gender - Customers HIGO</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Total visitors: {totalVisitors} <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing data for {chartData.length} gender categories.
                </div>
            </CardFooter>
        </Card>
    );
}

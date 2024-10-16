"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardContent,
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
import { AppDispatch, RootState } from "@/stores";
import { fetchGenderDataAPI } from "@/stores/slices/customerSlice";

export const description = "A pie chart with a label";

const chartConfig = {
    visitors: {
        label: "Costumers",
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
    const dispatch = useDispatch<AppDispatch>();
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [totalVisitors, setTotalVisitors] = useState<number>(0);
    const { genderData, genderLoading } = useSelector((state: RootState) => state.customerSlice);

    useEffect(() => {
        const fetchGenderData = async () => {
            try {
                await dispatch(fetchGenderDataAPI())
            } catch (error) {
                console.error("Error fetching gender data:", error);
            }
        };
        fetchGenderData();
    }, []);

    useEffect(() => {
        if (genderData) {
            const formattedData: ChartData[] = genderData.map((item) => ({
                browser: item.gender,
                visitors: item.count,
                fill: item.gender === "Female" ? "var(--color-female)" : "var(--color-male)",
            }));
            setChartData(formattedData);
            const total = genderData.reduce((acc, item) => acc + item.count, 0);
            setTotalVisitors(total);
        }
    }, [genderData])

    return (
        <Card className="flex flex-col justify-center h-96 w-72">
            {genderLoading ? (
                <span className="flex justify-center items-center">Loading...</span>
            ) : (
                <>
                    <CardHeader className="flex justify-center flex-col items-center pb-2">
                        <CardTitle className="text-center">Chart of Gender - Customers HIGO</CardTitle>
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
                            Total costumers: {totalVisitors} <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing data for {chartData.length} gender categories.
                        </div>
                    </CardFooter>
                </>
            )}
        </Card>
    );
}

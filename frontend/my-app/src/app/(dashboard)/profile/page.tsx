

"use client"

import { Card ,CardContent,CardHeader} from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const data = [
  {
    match: "Match 1",
    goals: 2,
    assists: 1,
    minutes: 90,
  },
  {
    match: "Match 2",
    goals: 1,
    assists: 2,
    minutes: 75,
  },
  {
    match: "Match 3",
    goals: 3,
    assists: 0,
    minutes: 90,
  },
  {
    match: "Match 4",
    goals: 0,
    assists: 1,
    minutes: 65,
  },
  {
    match: "Match 5",
    goals: 2,
    assists: 2,
    minutes: 90,
  },
]


const chartConfig = {
  goals: {
    label: "Goals",
    color: "var(--chart-1)",
  },
  assists: {
    label: "Assists",
    color: "var(--chart-2)",
  },
  minutes: {
    label: "Minutes",
    color: "var(--chart-3)",
  },
}

export default function TeamStatistics() {
  return (
    <Card className="bg-gray-100 min-h-0 min-w-0 overflow-hidden p-2 lg:flex-7 md:flex-5
     border shadow-2xl shadow-gray-500  hover:translate-1  flex flex-col gap-4 ">

        <CardHeader>
            <h2 className="font-mono text-xl md:text-2xl">Team Statistics</h2>
        </CardHeader>

         <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="match"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="goals"
              fill="var(--color-goals)"
              radius={4}
            />

            <Bar
              dataKey="assists"
              fill="var(--color-assists)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

    </Card>
  );
}



// "use client"

// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
// } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// const data = [
//   {
//     statistic: "Attack",
//     value: 85,
//   },
//   {
//     statistic: "Defense",
//     value: 72,
//   },
//   {
//     statistic: "Possession",
//     value: 78,
//   },
//   {
//     statistic: "Passing",
//     value: 88,
//   },
//   {
//     statistic: "Shooting",
//     value: 81,
//   },
//   {
//     statistic: "Physical",
//     value: 74,
//   },
// ]

// const chartConfig = {
//   value: {
//     label: "Team",
//     color: "var(--chart-1)",
//   },
// }

// export function TeamStatistics() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Team Statistics</CardTitle>
//         <CardDescription>
//           Team performance
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[350px]"
//         >
//           <RadarChart data={data}>
//             <PolarGrid />

//             <PolarAngleAxis
//               dataKey="statistic"
//               tick={{
//                 fill: "currentColor",
//                 fontSize: 12,
//               }}
//             />

//             <PolarRadiusAxis
//               angle={90}
//               domain={[0, 100]}
//               tick={false}
//               axisLine={false}
//             />

//             <ChartTooltip
//               content={<ChartTooltipContent />}
//             />

//             <Radar
//               dataKey="value"
//               fill="var(--color-value)"
//               fillOpacity={0.5}
//               stroke="var(--color-value)"
//               strokeWidth={2}
//             />
//           </RadarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }

'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ArrowRight, ChartNoAxesCombined } from 'lucide-react';
import Link from 'next/link';

const data = [
  {
    name: 'Wins',
    value: 12,
    fill: '#22c55e',
  },
  {
    name: 'Draws',
    value: 5,
    fill: '#eab308',
  },
  {
    name: 'Losses',
    value: 3,
    fill: '#ef4444',
  },
];

const totalMatches = data.reduce((total, item) => total + item.value, 0);

const chartConfig = {
  wins: {
    label: 'Wins',
    color: '#22c55e',
  },
  draws: {
    label: 'Draws',
    color: '#eab308',
  },
  losses: {
    label: 'Losses',
    color: '#ef4444',
  },
};

const datas = [
  {
    match: 'Match 1',
    goals: 2,
    assists: 1,
    minutes: 90,
  },
  {
    match: 'Match 2',
    goals: 1,
    assists: 2,
    minutes: 75,
  },
  {
    match: 'Match 3',
    goals: 3,
    assists: 0,
    minutes: 90,
  },
  {
    match: 'Match 4',
    goals: 0,
    assists: 1,
    minutes: 65,
  },
  {
    match: 'Match 5',
    goals: 2,
    assists: 2,
    minutes: 90,
  },
];

const chartConfigs = {
  goals: {
    label: 'Goals',
    color: 'var(--chart-1)',
  },
  assists: {
    label: 'Assists',
    color: 'var(--chart-2)',
  },
  minutes: {
    label: 'Minutes',
    color: 'var(--chart-3)',
  },
};

export default function TeamStatistics() {
  return (
    <Card
      className="bg-card dark:bg-card min-h-0 min-w-0 overflow-hidden p-2 lg:flex-5 md:flex-6 flex-10 border border-border flex flex-col gap-4 " >
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <ChartNoAxesCombined className="w-5 h-5 text-emerald-700" />
          <strong>
            <h2 className="text-sm text-foreground font-mono">
              Estatísticas da Equipe
            </h2>
          </strong>
        </div>
        <div>
          <Link
            href="#"
            className="flex gap-2 text-sm text-primary/60 hover:text-primary/90"
          >
            <h3 className="text-sm ">Ver Todos</h3>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <main className="lg:flex lg:justify-between lg:items-center">
        <CardContent className="w-full min-w-0 flex-1 flex flex-col md:flex-row  md:items-center gap-4">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-55 w-full min-w-0 lg:mx-0"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={3}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>

              {/* Número no centro */}
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-3xl font-mono"
              >
                {totalMatches}
              </text>

              <text
                x="50%"
                y="57%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground font-mono text-sm"
              >
                Matches
              </text>
            </PieChart>
          </ChartContainer>

          <div className="mt-2 flex md:flex-col justify-center  gap-5">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-sm dark:text-foreground font-mono">Victórias</span>
              </div>

              <p className="text-xl mono">12</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="text-sm  font-mono text-foreground dark:text-foreground">Empates</span>
              </div>

              <p className="text-xl font-mono text-foreground dark:text-foreground">5</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-sm dark:text-foreground font-mono">Derrotas</span>
              </div>

              <p className="text-xl font-mono text-foreground dark:text-foreground">3</p>
            </div>
          </div>
        </CardContent>

        <CardContent className=" min-w-0 flex-1 lg:block">
          <ChartContainer
            config={chartConfigs}
            className="h-60 w-full min-w-0 p-3"
          >
            <BarChart data={datas}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="match"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Bar dataKey="goals" fill="var(--color-goals)" radius={4} />

              <Bar dataKey="assists" fill="var(--color-assists)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </main>
    </Card>
  );
}

import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function TopPlayersCard() {
  return (
    <Card className="bg-gray-100 border shadow-2xl shadow-gray-500 min-h-0 min-w-0 overflow-hidden p-2 hover:translate-1  flex flex-col gap-4 ">
      <CardHeader>
        <h2 className="font-mono text-xl md:text-2xl">Top Players</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <h3 className="font-mono text-xs text-gray-900">Position</h3>

        <div className="font-mono flex flex-col gap-3 text-gray-900 ml-6">
          <div className="flex flex-col items-start gap-3">
            {[
              { position: ' 1', name: 'Jose Domingos' },
              { position: '2', name: 'joão claudio' },
              { position: '3', name: 'pedro rodrigo' },
            ].map((item) => {
              return (
                <div key={item.position} className="flex items-center gap-3">
                  <h4 className="text-emerald-900">{item.position}</h4>
                  <h3>{item.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

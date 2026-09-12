'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Check, Moon, Sun, Monitor, ArrowLeft } from 'lucide-react';

export default function Theme() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <div className="bg-background dark:bg-background min-h-screen pt-21 md:pt-0">


      <div className='p-2 space-y-4'>
        <button
          onClick={() => router.back()}
          className="flex gap-2 items-center text-foreground font-mono dark:text-foreground dark:hover:text-primary hover:text-emerald-700"
        >
          <ArrowLeft />
          <span>voltar</span>
        </button>

        <div className="mt-2 p-2 flex flex-col gap-3">
          <h3 className='font-mono'>Opções de tema:</h3>
          <button
            onClick={() => setTheme('light')}
            className="flex w-full  items-center justify-between rounded-xl p-4 hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <Sun className="h-5 w-5" />
              <span>Light</span>
            </div>

            <Check
              className={`h-5 w-5 text-primary ${theme === 'light' ? 'visible' : 'invisible'}`}
            />
          </button>

          <button
            onClick={() => setTheme('dark')}
            className="flex w-full items-center justify-between rounded-xl p-4 hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5" />
              <span>Dark</span>
            </div>

            <Check
              className={`h-5 w-5 text-primary ${theme === 'dark' ? 'visible' : 'invisible'}`}
            />
          </button>

          <button
            onClick={() => setTheme('system')}
            className="flex w-full items-center justify-between rounded-xl p-4 hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5" />
              <span>System</span>
            </div>

            <Check
              className={`h-5 w-5 text-primary ${theme === 'system' ? 'visible' : 'invisible'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

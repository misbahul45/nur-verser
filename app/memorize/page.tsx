import { getUser } from '@/actions';
import { getAllMemorization } from '@/actions/memorization.action';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { getGreeting } from '@/lib/utils';
import Link from 'next/link';
import { BookOpen, Plus } from 'lucide-react';
import React from 'react';

async function getData(){
  const [user, data]=await Promise.all([
    await getUser(),
    await getAllMemorization()
  ])

  return{
    user,
    data:data.data
  }
}

const Page = async () => {
  const greeting = getGreeting();
  const { user, data }=await getData();
  
  return (
    <div className="w-full pt-10 pb-4 relative">
      <Card className='relative'>
        <CardHeader>
          <Button size="icon" variant={'outline'} className="cursor-pointer absolute top-3 right-4" asChild>
            <Link href="/memorize/create">
              <Plus size={16} />
            </Link>
          </Button>
          <CardTitle>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-semibold color-primary'>
              {greeting}, {user?.name}
            </h1>
            <p className="text-center text-medium text-gray-500/80 mt-2">Ayo jelajahi keindahan Al-Qur'an dan pelajari maknanya dengan penuh semangat!</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.length === 0 || !data ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="rounded-full bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 shadow-xl">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Belum Ada Hafalan
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Mulai perjalanan hafalan Al-Qur'an Anda hari ini. Setiap ayat yang dihafal adalah investasi untuk akhirat.
                </p>
              </div>

              <Button size="lg" className="mt-4 cursor-pointer" asChild>
                <Link href="/memorize/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Mulai Hafalan Pertama
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
// use Symfony\Component\Console\Helper\Table;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $headers = ['Seeder', 'Status'];

        $seeders = [
            'Seeder_1',
            'Seeder_2',
            'Seeder_3',
            'Seeder_4',
            'Seeder_5',
            'Seeder_6',
            'Seeder_7',
            'Seeder_8',
        ];

        foreach ($seeders as $index => $name) {
            $seeders[$index] = [$name, 'Waiting'];
        }

        $data = [];
        
        // $table->render();
        
        
        
        $output = $this->output->getOutput();
        $section = $output->section();
        
        $table = new CustomTable($section);

        $table->setHeaders($headers);

        $table->setRows($seeders);

        $table->render();


        foreach ($seeders as $index => $seeder) {
            $rand_number = rand(1, 100);
            $seeder[1] = 'Running';

            $table->updateRow($index, $seeder);

            sleep(rand(1, 5));


            if ($rand_number < 20) {
                $seeder[1] = 'Failed';
            }else{
                $seeder[1] = 'Done';
            }


            $table->updateRow($index, $seeder);

        }
        
        dd('a');
        return 0;
    }
}

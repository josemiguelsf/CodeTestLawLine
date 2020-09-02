<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Mail;
//use Illuminate\Mail\Mailable;
use App\Mail\Bienvenidared;
//	use App\Jobs\emailAsignacion;
	
class emailBienvenidaRed implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
	protected $data;
    public function __construct($data)
    {
       
		$this->data = $data;
	
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
    // echo $pp;	 
	  $data = $this->data;
	  $email = $data['email'];
	 // var_dump($data);
		//die();
	   MAIL::to($email)->cc('josemiguelsf@gmail.com')->send(new Bienvenidared($data));
    }
}
